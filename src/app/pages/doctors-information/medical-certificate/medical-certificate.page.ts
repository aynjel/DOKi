import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
//import SignaturePad from 'signature_pad';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { AfterViewInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-medical-certificate',
  templateUrl: './medical-certificate.page.html',
  styleUrls: ['./medical-certificate.page.scss'],
})
export class MedicalCertificatePage implements OnInit {
  private ngUnsubscribe = new Subject();
  isDesktop: boolean;
  data;
  pdfSrc;
  isPDFLoading: boolean;
  isbutton = false;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signatureImg: string;
  signaturePadOptions: Object = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
  };
  constructor(
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private functionsService: FunctionsService,
    private renderer: Renderer2,
    private modalController: ModalController
  ) {
    this.checkAppearance();
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
  screenWidth;
  ngOnInit() {
    let scWidth = screen.width;
    if (scWidth <= 767) {
      this.screenWidth = scWidth - scWidth * 0.05;
      console.log(this.screenWidth);
      this.signaturePadOptions = {
        minWidth: 5,
        canvasWidth: this.screenWidth,
        canvasHeight: 300,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        penColor: 'rgb(0, 0, 0)',
      };
    } else {
      this.screenWidth = scWidth - scWidth * 0.525;
      console.log(this.screenWidth);
      this.signaturePadOptions = {
        minWidth: 5,
        canvasWidth: this.screenWidth,
        canvasHeight: 300,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        penColor: 'rgb(0, 0, 0)',
      };
    }
    this.getpdf();
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  onClick() {
    console.log('onClick');

    document.getElementById('trigger-button-certificate').click();
    // this.signaturePad is now available
    //this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    // this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  ngAfterViewInit() {
    // this.signaturePad is now available
    //this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    //this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
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
  getpdf() {
    this.isPDFLoading = false;
    this.data = [];
    this.pdfSrc = '';
    this.isbutton = false;
    let testJsonPDF = {
      doctorCode: 'MD000605',
      mode: 'T',
      fromDate: '03/01/2022',
      toDate: '03/15/2022',
      site: 'C',
    };
    let medabstract = this.doctorService
      .getMedicalCertificate()
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
  savePad() {
    this.modalController.dismiss({
      dismissed: true,
    });
    this.isbutton = true;
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
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
          this.getpdf();
          // this.signaturePad.clear();
        }
      );
  }

  checkAppearance() {
    this.functionsService.logToConsole('checkAppearance');
    var values = JSON.parse(
      '[' + atob(localStorage.getItem('user_settings')) + ']'
    );
    let dr_username = atob(localStorage.getItem('username'));
    values.forEach((element) => {
      this.functionsService.logToConsole(element.darkmode);
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
