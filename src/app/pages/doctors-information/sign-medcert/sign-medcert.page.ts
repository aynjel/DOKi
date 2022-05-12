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
import { FunctionsService } from 'src/app/shared/functions/functions.service';
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
    public functionService: FunctionsService
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
  }
  back() {
    this.navCtrl.back();
  }
  ionViewWillEnter() {}
  ngOnInit() {
    this.checkAppearance();
    console.log('ngOnInit');
    this.getpdf();
    this.idModal = false;
    let scWidth = screen.width;
    let scHeight = screen.height;

    if (scWidth <= 666) {
      console.log('sm');
      this.screenWidth = scWidth - scWidth * 0.06;
      this.screenHeight = scHeight - scHeight * 0.35;
    } else if (scWidth <= 912) {
      console.log('md');
      this.screenWidth = scWidth - scWidth * 0.2;
      this.screenHeight = scHeight - scHeight * 0.2;
    } else {
      console.log('l');
      this.screenWidth = scWidth - scWidth * 0.4;
      this.screenHeight = scHeight - scHeight * 0.4;
    }
    if (scHeight >= 1180) {
      this.screenHeight = scHeight - scHeight * 0.4;
    }
    this.signaturePadOptions = {
      minWidth: 5,
      canvasWidth: this.screenWidth,
      canvasHeight: this.screenHeight,
      //backgroundColor: 'rgba(0, 0, 0, 1)',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      penColor: 'rgb(0, 0, 0)',
    };
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
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
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
    this.modalController.dismiss({
      dismissed: true,
    });
    this.isbutton = true;
    const base64Data = this.signaturePad.toDataURL('image/png');
    let compressedImage;
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
      testAprrove.medcert_comment = 'medcert_comment';
      testAprrove.medcert_approve_by = 'medcert_approve_by';
      testAprrove.medcert_signature = myArray[1];
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
          console.log(data);
        },
        (error) => {
          console.log('error');
          console.log(error);
        },
        () => {
          console.log('success');
          // this.signaturePad.clear();
          this.approvePendingAPproval(dischargeNo);
          this.ngOnInit();
        }
      );
    this.signaturePad.clear();
    this.isPDFLoading = false;
  }
  approvePendingAPproval(discharge_no) {
    this.dischargeNo.discharge_no = discharge_no;
    console.log(this.dischargeNo);
    this.doctorService
      .approvePendingApproval(this.dischargeNo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );
  }
  getpdf() {
    this.isPDFLoading = false;
    this.pdfSrc = '';
    let patientId = this.activatedRoute.snapshot.params.admissionNo;
    let testJsonPDF = {
      account_no: patientId,
      mode: 'T',
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
          console.log('error');
          console.log(error);
        },
        () => {
          this.isPDFLoading = true;
          console.log(this.pdfSrc);
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
}
