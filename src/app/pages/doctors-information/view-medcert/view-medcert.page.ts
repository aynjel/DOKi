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
@Component({
  selector: 'app-view-medcert',
  templateUrl: './view-medcert.page.html',
  styleUrls: ['./view-medcert.page.scss'],
})
export class ViewMedcertPage implements OnInit {
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
  constructor(
    private navCtrl: NavController,
    public doctorService: DoctorService,
    public screensizeService: ScreenSizeService,
    private renderer: Renderer2,
    public actionSheetController: ActionSheetController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalController: ModalController
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
    this.getpdf();
  }
  ngOnInit() {
    this.idModal = false;
    let scWidth = screen.width;
    let scHeight = screen.height;

    if (scWidth <= 666) {
      this.screenWidth = scWidth - scWidth * 0.06;
      this.screenHeight = scHeight - scHeight * 0.25;
      console.log(this.screenWidth);
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
      console.log(this.screenWidth);
      this.signaturePadOptions = {
        minWidth: 5,
        canvasWidth: this.screenWidth,
        canvasHeight: this.screenHeight,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)',
      };
    }
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
  savePad() {
    this.modalController.dismiss({
      dismissed: true,
    });
    this.isbutton = true;

    const base64Data = this.signaturePad.toDataURL('image/png', 0.5);

    this.signatureImg = base64Data;
    /* 
    const myArray = base64Data.split(',');
    let testAprrove = {
      mode: 'string',
      account_no: 'string',
      medcert_comment: 'string',
      medcert_approve_by: 'string',
      medcert_signature: 'string',
    };
    testAprrove.mode = 'P';
    testAprrove.account_no = 'IPM000125711';
    testAprrove.medcert_comment = 'medcert_comment';
    testAprrove.medcert_approve_by = 'medcert_approve_by';
    testAprrove.medcert_signature = myArray[1];
    this.signaturePad.clear();
    this.isPDFLoading = false;
    */
  }
  getpdf() {
    this.isPDFLoading = false;
    this.pdfSrc = '';
    let patientId = this.activatedRoute.snapshot.params.opdcode;
    let medabstract = this.doctorService
      .getMedicalCertificate(patientId)
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
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
