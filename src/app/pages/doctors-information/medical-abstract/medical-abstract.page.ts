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

@Component({
  selector: 'app-medical-abstract',
  templateUrl: './medical-abstract.page.html',
  styleUrls: ['./medical-abstract.page.scss'],
})
export class MedicalAbstractPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isDesktop: boolean;
  constructor(
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private functionsService: FunctionsService,
    private renderer: Renderer2
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

  ngOnInit() {
    this.getpdf();
    this.isbutton = false;
  }
  data;
  pdfSrc;
  isPDFLoading: boolean = false;
  getpdf() {
    this.isPDFLoading = false;
    this.data = [];
    this.pdfSrc = '';
    this.isbutton = false;
    let testJsonPDF = {
      doctorCode: 'MD000175',
      mode: 'P',
      fromDate: '03/01/2022',
      toDate: '03/15/2022',
      site: 'C',
    };
    this.doctorService
      .getMedicalAbstract('IPM000125711')
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
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      //this.signaturePad.clear();
      event.target.complete();
    }, 1000);
  }
  /***************SIGNATURE**********************/
  adultApproval = {
    account_no: 'IPM000125711',
    abstract_approve_by: 'testdoki01',
    abstract_approve_by_name: 'DOKI01 GREAT',
    doki_signature: 'string',
    signature_consent_flg: 'yes',
  };
  isbutton = false;
  /*
  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl: ElementRef;

  signatureImg: string;

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    //this.resizeCanvas();
  }

  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }


  savePad() {
    this.isbutton = true;
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    const myArray = base64Data.split(',');
    this.adultApproval.doki_signature = myArray[1];
    console.log(this.adultApproval);

    this.doctorService
      .testAdultApproval(this.adultApproval)
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
          this.signaturePad.clear();
        }
      );
  }
    */
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signatureImg: string;
  signaturePadOptions: Object = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
  };
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
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
   this.isbutton = true;
   const base64Data = this.signaturePad.toDataURL();
   this.signatureImg = base64Data;
   const myArray = base64Data.split(',');
   this.adultApproval.doki_signature = myArray[1];
   console.log(this.adultApproval);

   this.doctorService
     .testAdultApproval(this.adultApproval)
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
         this.signaturePad.clear();
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
