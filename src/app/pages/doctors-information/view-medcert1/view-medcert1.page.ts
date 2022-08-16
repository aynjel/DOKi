import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignaturePad } from 'angular2-signaturepad';
import { Constants } from 'src/app/shared/constants';
import { SignatureApproval } from 'src/app/models/doctor';
@Component({
  selector: 'app-view-medcert1',
  templateUrl: './view-medcert1.page.html',
  styleUrls: ['./view-medcert1.page.scss'],
})
export class ViewMedcert1Page implements OnInit {
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
  signaturePadOptions: Object = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
  };
  isbutton = false;
  idModal: boolean = false;
  selectedPatient;
  constructor(
    private navCtrl: NavController,
    public doctorService: DoctorService,
    public screensizeService: ScreenSizeService,
    private renderer: Renderer2,
    public actionSheetController: ActionSheetController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    public constants: Constants
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
          }
        }
        if (this.isPortrait != undefined && isPortrait) {
          if (this.idModal) {
            this.closeModal();
            this.ngOnInit();
          }
          this.ngOnInit();
        }
        this.isPortrait = isPortrait;
      });
  }
  back() {
    this.navCtrl.back();
  }
  ionViewWillEnter() {
    this.checkAppearance();
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
  ngOnInit() {
    //console.log('ngOnInit');
    this.getpdf();
    this.idModal = false;
    let scWidth = screen.width;
    let scHeight = screen.height;

    if (scWidth <= 666) {
      this.screenWidth = scWidth - scWidth * 0.06;
      this.screenHeight = scHeight - scHeight * 0.25;
      //console.log(this.screenWidth);
      this.signaturePadOptions = {
        minWidth: 5,
        canvasWidth: this.screenWidth,
        canvasHeight: this.screenWidth,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)',
      };
    } else {
      this.screenWidth = scWidth - scWidth * 0.05;
      this.screenHeight = scHeight - scHeight * 0.3;
      //console.log(this.screenWidth);
      this.signaturePadOptions = {
        minWidth: 5,
        canvasWidth: this.screenWidth,
        canvasHeight: this.screenHeight,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)',
      };
    }
  }
  cancelApproval() {
    this.presentActionSheet();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: "Are you sure to revoke the patient's final diagnosis?",
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Yes, Revoke',
          icon: 'thumbs-up-outline',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            this.clearSignature();
          },
        },

        {
          text: 'Back',
          icon: 'arrow-back-outline',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    //console.log('onDidDismiss resolved with role and data', role, data);
  }
  onClick() {
    this.idModal = true;
    document.getElementById('trigger-button-certificate').click();
  }
  closeModal() {
    this.idModal = false;
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    //console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    //console.log('begin drawing');
  }

  clearPad() {
    this.signaturePad.clear();
  }
  savePad() {
    this.modalController.dismiss({
      dismissed: true,
    });
    this.isbutton = true;

    const base64Data = this.signaturePad.toDataURL('image/png', 0.5);

    this.signatureImg = base64Data;
    let patientId = this.activatedRoute.snapshot.params.admissionNo;
    let dischargeNo = this.activatedRoute.snapshot.params.dischargeNo;
    this.dischargeNo.discharge_no = dischargeNo;
    const myArray = base64Data.split(',');
    let testAprrove = {
      mode: 'string',
      account_no: 'string',
      medcert_comment: 'string',
      medcert_approve_by: 'string',
      medcert_signature: 'string',
    };
    testAprrove.mode = 'T';
    testAprrove.account_no = patientId;
    testAprrove.medcert_comment = 'medcert_comment';
    testAprrove.medcert_approve_by = 'medcert_approve_by';
    testAprrove.medcert_signature = myArray[1];
    this.isPDFLoading = false;
    this.doctorService
      .approveMedicalCertificate(testAprrove)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          //console.log(data);
        },
        (error) => {
          //console.log('error');
          //console.log(error);
        },
        () => {
          //console.log('success');
          this.signaturePad.clear();
          this.cancelApprovedApproval(dischargeNo);
          this.ngOnInit();
        }
      );
    this.signaturePad.clear();
    this.isPDFLoading = false;
  }
  cancelApprovedApproval(discharge_no) {
    this.dischargeNo.discharge_no = discharge_no;
    this.doctorService
      .cancelApprovedFinalDiagnosis(this.dischargeNo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          //console.log(res);
          this.ionViewWillEnter();
        },
        (error) => {},
        () => {
          this.back();
        }
      );
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
  //loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  clearSignature() {
    let patientId = this.activatedRoute.snapshot.params.admissionNo;
    let testAprrove: SignatureApproval = new SignatureApproval();
    testAprrove.mode = this.constants.TestServer;
    testAprrove.account_no = patientId;
    testAprrove.medcert_comment = 'medcert_comment';
    testAprrove.medcert_approve_by = 'medcert_approve_by';
    testAprrove.medcert_signature = this.constants.blankBase64img;
    this.saveSignature(testAprrove);
  }
  saveSignature(testAprrove) {
    let dischargeNo = this.activatedRoute.snapshot.params.dischargeNo;
    this.doctorService
      .approveMedicalCertificate(testAprrove)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {},
        (error) => {
          console.log(error);
        },
        () => {
          this.cancelApprovedApproval(dischargeNo);
        }
      );
  }
  getpdf() {
    this.isPDFLoading = false;
    this.pdfSrc = '';
    let patientId = this.activatedRoute.snapshot.params.admissionNo;
    let testJsonPDF = {
      account_no: patientId,
      mode: 'P',
      print_header_footer_flg: true,
    };
    let medabstract = this.doctorService
      .getMedicalCertificatePOST(testJsonPDF)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          let blob = new Blob([data], { type: 'application/pdf' });
          let downloadURL = window.URL.createObjectURL(data);
          this.pdfSrc = downloadURL;
        },
        (error) => {
          this.isPDFLoading = true;
          //console.log('error');
          //console.log(error);
        },
        () => {
          this.isPDFLoading = true;
          //console.log(this.pdfSrc);
        }
      );
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
