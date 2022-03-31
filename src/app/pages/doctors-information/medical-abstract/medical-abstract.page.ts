import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import SignaturePad from 'signature_pad';

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
    private doctorService: DoctorService
  ) {
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
  getpdf() {
    this.data = [];
    this.pdfSrc = '';
    let testJsonPDF = {
      doctorCode: 'MD000175',
      mode: 'P',
      fromDate: '03/01/2022',
      toDate: '03/15/2022',
      site: 'C',
    };
    this.doctorService.getMedicalAbstract('IPM000125711').subscribe(
      (data: any) => {
        let blob = new Blob([data], { type: 'application/pdf' });
        let downloadURL = window.URL.createObjectURL(data);
        this.pdfSrc = downloadURL;
      },
      (error) => {
        console.log('error');
        console.log(error);
      },
      () => {
        console.log(this.pdfSrc);
      }
    );
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      this.signaturePad.clear();
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
  isbutton = false;
  savePad() {
    this.isbutton = !this.isbutton;
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    const myArray = base64Data.split(',');
    this.adultApproval.doki_signature = myArray[1];
    console.log(this.adultApproval);

    this.doctorService.testAdultApproval(this.adultApproval).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => {
        console.log('error');
        console.log(error);
      },
      () => {
        this.getpdf();
      }
    );
  }
}
