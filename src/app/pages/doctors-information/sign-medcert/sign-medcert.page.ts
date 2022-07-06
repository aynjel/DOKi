import {
  Component,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  AnimationController,
  IonModal,
  ModalController,
  NavController,
} from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignaturePad } from 'angular2-signaturepad';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginResponseModelv3, SignatureApproval } from 'src/app/models/doctor';
@Component({
  selector: 'app-sign-medcert',
  templateUrl: './sign-medcert.page.html',
  styleUrls: ['./sign-medcert.page.scss'],
})
export class SignMedcertPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isNotification: boolean;
  isPortrait: boolean;
  selected = 'Final Diagnosis';
  pendingApproval;
  dischargeNo = {
    discharge_no: '',
  };
  isDesktop: boolean;
  pdfSrc;
  isPDFLoading: boolean;
  screenWidth;
  screenHeight;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signatureImg: string;
  signatureImg1;
  signaturePadOptions: Object = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
  };
  isbutton = false;
  idModal: boolean = false;

  constructor(
    private navCtrl: NavController,
    public doctorService: DoctorService,
    public screensizeService: ScreenSizeService,
    private renderer: Renderer2,
    public actionSheetController: ActionSheetController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    public functionService: FunctionsService,
    private dbService: NgxIndexedDBService,
    private authService: AuthService,
    public functionsService: FunctionsService,
    private animationCtrl: AnimationController
  ) {
    this.isNotification = true;
    this.screensizeService
      .isPortraitView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isPortrait) => {
        if (this.isPortrait && !isPortrait) {
          if (this.idModal) {
            this.closeModal();
            this.ngOnInit();
          } else {
            this.ngOnInit();
          }
        }
        if (this.isPortrait != undefined && isPortrait) {
          if (this.idModal) {
            this.closeModal();
            this.ngOnInit();
          } else {
            this.ngOnInit();
          }
        }
        this.isPortrait = isPortrait;
      });
    this.screensizeService
      .isDesktopView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });
  }
  back() {
    ////////console.log(this.idModal);

    this.closeModal();
  }
  ionViewWillEnter() {
    this.logindata = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    this.functionsService.logToConsole(this.logindata);
    this.dr_code = this.logindata.doctorCode;
    this.getSignaturefromIndexedDB(this.dr_code);
  }
  isApproved;
  logindata;
  dr_code;
  signatureBase64;
  signatureBase64Full;
  signatureID;
  isSignature: boolean = false;
  getSignaturefromIndexedDB(data) {
    this.dbService
      .getByIndex('people', 'drCode', data)
      .subscribe((signature: any) => {
        if (signature == undefined) {
          this.isSignature = false;
        } else {
          //////console.log(signature);
          this.signatureID = signature.id;
          this.signatureBase64 = signature.base64image;
          this.signatureBase64Full = signature.base64imageFull;
          this.isSignature = true;
        }
      });
  }
  saveSignaturetoIndexdb(drCode, base64image, base64imageFull) {
    this.dbService
      .add('people', {
        drCode: drCode,
        base64image: base64image,
        base64imageFull: base64imageFull,
      })
      .subscribe((key) => {
        this.getSignaturefromIndexedDB(this.dr_code);
      });
  }
  updateSignatureonIndexedDB(drCode, base64image, base64imageFull) {
    this.dbService
      .update('people', {
        id: this.signatureID,
        drCode: drCode,
        base64image: base64image,
        base64imageFull: base64imageFull,
      })
      .subscribe((storeData) => {
        this.getSignaturefromIndexedDB(this.dr_code);
      });
  }
  ngOnInit() {
    this.checkAppearance();
    //////////console.log('ngOnInit');
    this.getpdf();
    this.idModal = false;
    let scWidth = screen.width;
    let scHeight = screen.height;

    if (scWidth <= 666) {
      this.screenWidth = scWidth - scWidth * 0.06;
      this.screenHeight = scHeight - scHeight * 0.35;
      console.log('Screen less than 666');
      console.log('Width 1: ', scWidth);
      console.log('Width 2: ', scWidth * 0.06);
      console.log('=', this.screenWidth);
      console.log('Height 1: ', scHeight);
      console.log('Height 2: ', scHeight * 0.35);
      console.log('=', this.screenHeight);
    } else if (scWidth <= 912) {
      this.screenWidth = scWidth - scWidth * 0.05;
      this.screenHeight = scHeight - scHeight * 0.15;
      console.log('Screen less than 912');
      console.log('Width 1: ', scWidth);
      console.log('Width 2: ', scWidth * 0.05);
      console.log('=', this.screenWidth);
      console.log('Height 1: ', scHeight);
      console.log('Height 2: ', scHeight * 0.15);
      console.log('=', this.screenHeight);
    } else {
      this.screenWidth = scWidth - scWidth * 0.4;
      this.screenHeight = scHeight - scHeight * 0.4;

      console.log('ELSE = BIG');
      console.log('Width 1: ', scWidth);
      console.log('Width 2: ', scWidth * 0.4);
      console.log('=', this.screenWidth);
      console.log('Height 1: ', scHeight);
      console.log('Height 2: ', scHeight * 0.4);
      console.log('=', this.screenHeight);
    }
    if (scHeight >= 1180) {
      this.screenHeight = scHeight - scHeight * 0.6;
      console.log('Greater than 1180');
      console.log('Width 1: ', scWidth);
      console.log('=', this.screenWidth);
      console.log('Height 1: ', scHeight);
      console.log('Height 2: ', scHeight * 0.6);
      console.log('=', this.screenHeight);
    }
    console.log('LOGGGGGGGGGGGGG');
    this.signaturePadOptions = {
      minWidth: 5,
      canvasWidth: this.screenWidth,
      canvasHeight: this.screenHeight,
      //backgroundColor: 'rgba(0, 0, 0, 1)',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      penColor: 'rgb(0, 0, 0)',
    };
    console.log(this.signaturePadOptions);
  }

  //id=""
  activateIsSignatureModal() {
    this.getSignaturefromIndexedDB(this.dr_code);
    if (!this.idModal) {
      const modalState = {
        modal: true,
        desc: 'fake state for our modal',
      };
      history.pushState(modalState, null);
    }
  }
  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    if (this.idModal) {
      this.manualBack();
    }
  }

  signatureConsent: boolean = false;
  setidModalTrue() {
    localStorage.setItem('isModal', '1');
    this.idModal = true;
  }
  isConsent: boolean = true;
  openConsent() {
    //////////console.log(history);

    this.activateIsSignatureModal();
    this.setidModalTrue();

    if (this.isConsent) {
      document.getElementById('trigger-button-consent-signmedcert').click();
    } else {
      document.getElementById('trigger-button-show-signature').click();
    }
  }
  useOldSignature() {
    this.closeModal();
    let patientId = this.activatedRoute.snapshot.params.admissionNo;
    let testAprrove: SignatureApproval = new SignatureApproval();
    testAprrove.mode = 'T';
    testAprrove.account_no = patientId;
    testAprrove.medcert_comment = '';
    testAprrove.medcert_approve_by = this.dr_code;
    testAprrove.medcert_signature = this.signatureBase64;
    this.saveSignature(testAprrove);
  }
  saveConsent() {
    if (this.signatureConsent) {
      this.modalController.dismiss();
      if (this.isSignature) {
        document.getElementById('trigger-button-show-signature').click();
      } else {
        this.openSignaturePad();
      }
    }
  }
  resignSignature() {
    this.modalController.dismiss();
    this.openSignaturePad();
  }
  openSignaturePad() {
    if (!this.idModal) {
      this.activateIsSignatureModal();
      this.setidModalTrue();
    }

    document.getElementById('trigger-button-certificate-signmedcert').click();
  }
  manualBack() {
    this.idModal = false;
    localStorage.setItem('isModal', '0');
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  closeModal() {
    localStorage.setItem('isModal', '0');
    if (this.idModal) {
      this.modalController.dismiss();
    }
    this.idModal = false;
    this.navCtrl.back();
  }
  isModalOpen: boolean = false;
  createFakeState() {
    this.isModalOpen = true;
    const modalState = {
      modal: true,
      desc: 'fake state for our modal',
    };
    history.pushState(modalState, null);
  }
  removeFakeState() {
    this.isModalOpen = false;
    this.navCtrl.back();
  }
  closeConsentModal() {
    this.modalController.dismiss();
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    ////////////console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    ////////////console.log('begin drawing');
  }

  clearPad() {
    this.signaturePad.clear();
  }
  compressImage(src, newX, newY) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      };
      img.onerror = (error) => rej(error);
    });
  }
  savePad() {
    this.closeModal();
    this.isbutton = true;
    const base64Data = this.signaturePad.toDataURL('image/png');
    let compressedImage;
    this.signatureBase64Full = base64Data;
    //console.log(this.signatureBase64Full.length);

    this.compressImage(
      base64Data,
      this.screenWidth * 0.3,
      this.screenHeight * 0.3
    ).then((compressed) => {
      compressedImage = compressed;
      let patientId = this.activatedRoute.snapshot.params.admissionNo;
      const myArray = compressedImage.split(',');
      let testAprrove = {
        mode: 'string',
        account_no: 'string',
        medcert_comment: 'string',
        medcert_approve_by: 'string',
        medcert_signature: 'string',
      };
      testAprrove.mode = 'T';
      testAprrove.account_no = patientId;
      testAprrove.medcert_comment = '';
      testAprrove.medcert_approve_by = this.dr_code;
      testAprrove.medcert_signature = myArray[1];
      this.signaturePad.clear();
      this.saveSignature(testAprrove);
    });
  }
  saveSignature(testAprrove) {
    let dischargeNo = this.activatedRoute.snapshot.params.dischargeNo;
    this.isPDFLoading = false;
    this.doctorService
      .approveMedicalCertificate(testAprrove)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          // //////////console.log(data);
        },
        (error) => {},
        () => {
          if (this.isSignature) {
            this.updateSignatureonIndexedDB(
              this.dr_code,
              testAprrove.medcert_signature,
              this.signatureBase64Full
            );
          } else {
            this.saveSignaturetoIndexdb(
              this.dr_code,
              testAprrove.medcert_signature,
              this.signatureBase64Full
            );
          }

          this.approvePendingAPproval(dischargeNo);
        }
      );

    this.isPDFLoading = false;
  }
  isUploaded: boolean = false;
  approvePendingAPproval(discharge_no) {
    this.dischargeNo.discharge_no = discharge_no;
    this.doctorService
      .approvePendingApproval(this.dischargeNo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////console.log('approvePendingAPproval', res);
          //////////console.log(res);
        },
        (error) => {
          ////console.log(error);
          //////////console.log(error);
        },
        () => {
          this.isUploaded = true;
          this.functionService.presentToast(
            'Approving and Uploading of Signature Completed.'
          );
          this.ngOnInit();
        }
      );
  }
  getpdf() {
    this.isPDFLoading = false;
    this.pdfSrc = '';
    let patientId = this.activatedRoute.snapshot.params.admissionNo;
    let testJsonPDF = {
      account_no: patientId,
      mode: 'T',
      print_header_footer_flg: true,
    };
    let medabstract = this.doctorService
      .getMedicalCertificatePOST(testJsonPDF)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          //console.log(data);

          let blob = new Blob([data], { type: 'application/pdf' });
          let downloadURL = window.URL.createObjectURL(data);
          this.pdfSrc = downloadURL;
        },
        (error) => {
          //console.log(error);

          this.isPDFLoading = true;
        },
        () => {
          this.isPDFLoading = true;
        }
      );
  }
  checkAppearance() {
    var values = JSON.parse(
      '[' + atob(localStorage.getItem('user_settings')) + ']'
    );
    let dr_username = atob(localStorage.getItem('username'));
    values.forEach((element) => {
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      } else {
        this.renderer.setAttribute(document.body, 'color-theme', 'light');
      }
    });
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  autoGrowTextZone(e) {
    if (e.target.scrollHeight + 25 <= 350) {
      e.target.style.height = '0px';
      e.target.style.height = e.target.scrollHeight + 25 + 'px';
    }
  }
  forRevisionText = '';
  @ViewChild(IonModal) modal: IonModal;
  dismissForRevisionModal() {
    this.modalController.dismiss(null, 'cancel');
  }
  saveForRevisionModal() {
    let forRevisionText = this.forRevisionText;
    let dischargeNo = this.activatedRoute.snapshot.params.dischargeNo;
    this.forRevisionText = '';
    this.cancelApprovedApproval(dischargeNo, forRevisionText);
    this.modalController.dismiss(null, 'cancel');
  }
  cancelApprovedApproval(discharge_no: any, revision_dx_remarks: any) {
    let dischargeNo = {
      discharge_no: discharge_no,
      revision_dx_remarks: revision_dx_remarks,
    };
    //console.log(dischargeNo);

    this.doctorService
      .cancelApprovedFinalDiagnosis(dischargeNo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////console.log(res);
        },
        (error) => {},
        () => {
          this.functionService.presentToast('Successfully Sent for Revision');
          this.ionViewWillEnter();
        }
      );
  }
  reviseRevokeApproval() {
    document.getElementById('trigger-modal-forRevision-signmedcert').click();
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}
