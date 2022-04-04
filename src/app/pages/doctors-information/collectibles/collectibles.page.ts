import { Component, OnInit, Renderer2 } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
@Component({
  selector: 'app-collectibles',
  templateUrl: './collectibles.page.html',
  styleUrls: ['./collectibles.page.scss'],
})
export class CollectiblesPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isDesktop: boolean;
  mode;
  constructor(
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private functionsService: FunctionsService,
    private renderer: Renderer2
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
    this.checkAppearance();
  }

  ngOnInit() {}
  data;
  pdfSrc;
  drCode = 'MD000047';
  site = 'M';
  isPDFAvailable: boolean = false;
  isPreviewLoading: boolean = false;
  isPDFLoading: boolean = false;
  selectDoctor(event) {
    console.log(event.detail.value);
    this.drCode = event.detail.value;
    this.callPreview();
  }
  selectSite(event) {
    console.log(event.detail.value);
    this.site = event.detail.value;
    this.callPreview();
  }
  selectedMode() {
    this.setDateFromToRegularPF();
    this.callPreview();
  }
  DOKiPFRegularPreview;
  link;
  getRegularPFpdf() {
    this.isPDFLoading = true;
    this.data = [];
    let testJsonPDF = {
      drCode: this.drCode,
      fromDate: this.dateTodayFrom,
      toDate: this.dateTodayTo,
      site: this.site,
      mode: 'P',
    };
    this.pdfSrc = '';
    this.doctorService
      .getDOKiPFRegularSOA(testJsonPDF)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          let blob = new Blob([data], { type: 'application/pdf' });
          let downloadURL = window.URL.createObjectURL(data);
          this.pdfSrc = downloadURL;
          this.link = '';
          this.link = document.createElement('a');
          this.link.href = downloadURL;
          this.link.download = 'PFRegular.pdf';
        },
        (error) => {
          this.isPDFLoading = false;
          console.log('error');
          console.log(error);
        },
        () => {
          this.isPDFLoading = false;
        }
      );
  }

  getRegularPFpdfPreview() {
    this.emptyState = false;
    console.log('getRegularPFpdfPreview');

    this.isPreviewLoading = true;
    this.isPDFAvailable = false;
    let mode = 'P';
    this.DOKiPFRegularPreview = [];
    this.DOKiPFPHICPreview = [];
    this.doctorService
      .getDOKiPFRegularSOAPreview(
        this.drCode,
        mode,
        this.dateTodayFrom,
        this.dateTodayTo,
        this.site
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          this.DOKiPFRegularPreview = data;
          console.log(data);
        },
        (error) => {
          this.isPreviewLoading = false;
          console.log('error');
          console.log(error);
        },
        () => {
          this.isPreviewLoading = false;
          this.isPDFAvailable = true;

          if (this.DOKiPFRegularPreview == null) {
            this.emptyState = true;
          }
        }
      );
  }

  getPHICPFpdf() {
    this.isPDFLoading = true;
    this.data = [];
    let testJsonPDF = {
      drCode: this.drCode,
      fromDate: this.dateTodayFrom,
      toDate: this.dateTodayTo,
      site: this.site,
      mode: 'P',
    };
    console.log(JSON.stringify(testJsonPDF));

    this.pdfSrc = '';
    this.doctorService
      .getDOKiPFPhicCaseRatesSOA(testJsonPDF)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          let blob = new Blob([data], { type: 'application/pdf' });
          let downloadURL = window.URL.createObjectURL(data);
          this.pdfSrc = downloadURL;
          this.link = '';
          this.link = document.createElement('a');
          this.link.href = downloadURL;
          this.link.download = 'PHICPFpdf.pdf';
        },
        (error) => {
          this.isPDFLoading = false;
          console.log('error');
          console.log(error);
        },
        () => {
          this.isPDFLoading = false;
          console.log(this.pdfSrc);
        }
      );
  }
  DOKiPFPHICPreview;
  getPHICPFpdfPreview() {
    this.emptyState = false;
    this.isPreviewLoading = true;
    this.isPDFAvailable = false;
    let mode = 'P';
    this.DOKiPFRegularPreview = [];
    this.DOKiPFPHICPreview = [];
    this.doctorService
      .getDOKiPFPhicCaseRatesSOAPreview(
        this.drCode,
        mode,
        this.dateTodayFrom,
        this.dateTodayTo,
        this.site
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          this.DOKiPFRegularPreview = data;
          console.log(data);
        },
        (error) => {
          this.isPreviewLoading = false;
          console.log('error');
          console.log(error);
        },
        () => {
          this.isPreviewLoading = false;
          this.isPDFAvailable = true;
          console.log(this.pdfSrc);
          if (this.DOKiPFRegularPreview == null) {
            this.emptyState = true;
          }
        }
      );
  }

  getReadersFeepdf() {
    this.isPDFLoading = true;
    this.data = [];
    let testJsonPDF = {
      drCode: this.drCode,
      fromDate: this.dateTodayFrom,
      toDate: this.dateTodayTo,
      site: this.site,
      mode: 'P',
    };
    this.pdfSrc = '';
    this.doctorService
      .getDOKiPFReadersFeeSOA(testJsonPDF)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          let blob = new Blob([data], { type: 'application/pdf' });
          let downloadURL = window.URL.createObjectURL(data);
          this.pdfSrc = downloadURL;
          this.link = '';
          this.link = document.createElement('a');
          this.link.href = downloadURL;
          this.link.download = 'ReadersFeepdf.pdf';
        },
        (error) => {
          this.isPDFLoading = false;
          console.log('error');
          console.log(error);
        },
        () => {
          this.isPDFLoading = false;
          console.log(this.pdfSrc);
        }
      );
  }

  getDOKiPFReadersFeeSOAPreview() {
    console.log('getDOKiPFReadersFeeSOAPreview');

    this.emptyState = false;
    this.isPreviewLoading = true;
    this.isPDFAvailable = false;
    let mode = 'P';
    this.DOKiPFRegularPreview = [];
    this.DOKiPFPHICPreview = [];
    this.doctorService
      .getDOKiPFReadersFeeSOAPreview(
        this.drCode,
        mode,
        this.dateTodayFrom,
        this.dateTodayTo,
        this.site
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          this.DOKiPFRegularPreview = data;
          console.log(data);
        },
        (error) => {
          this.isPreviewLoading = false;
          console.log('error');
          console.log(error);
        },
        () => {
          this.isPreviewLoading = false;
          this.isPDFAvailable = true;
          if (this.DOKiPFRegularPreview == null) {
            this.emptyState = true;
          }
        }
      );
  }

  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  dateTodayFrom;
  dateTodayTo;
  yearTreandTO;
  dateValueFrom = '2022-01-15';
  dateValueTo = '2022-12-15';
  dateValueYear = '2022-01-15';
  dateTodayYear;
  monthTrendFrom: any = '01';
  monthTrendTo: any = '12';
  emptyState: boolean = false;
  setDateFromToRegularPF() {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    let date1 = new Date(date);
    let day1 = date1.getDate();
    let month1 = date1.getMonth() + 1;
    let year1 = date1.getFullYear();
    let sendDatedateValue =
      year1 + '-' + ('0' + month1).slice(-2) + '-' + ('0' + day1).slice(-2);
    this.dateValueFrom = sendDatedateValue;
    this.dateTodayFrom =
      ('0' + month1).slice(-2) + '/' + ('0' + day1).slice(-2) + '/' + year1;

    let date2 = new Date();
    let day2 = date2.getDate();
    let month2 = date2.getMonth() + 1;
    let year2 = date2.getFullYear();
    let sendDatedateValue2 =
      year2 + '-' + ('0' + month2).slice(-2) + '-' + ('0' + day2).slice(-2);
    this.dateValueTo = sendDatedateValue2;
    this.dateTodayTo =
      ('0' + month2).slice(-2) + '/' + ('0' + day2).slice(-2) + '/' + year2;

    let date3 = new Date();

    let day3 = date3.getDate();
    let month3 = date3.getMonth() + 1;
    let year3 = date3.getFullYear();

    let sendDatedateValue3 =
      year3 + '-' + ('0' + month3).slice(-2) + '-' + ('0' + day3).slice(-2);
    this.dateValueYear = sendDatedateValue3;
    this.dateTodayYear = year3;
    // this.callPreview();
  }
  formatDateRegularPF(fromtoyear, value: string) {
    if (fromtoyear == 'from') {
      console.log('from');

      let date1 = new Date(value);
      let month1 = date1.getMonth() + 1;
      let day1 = date1.getDate();
      let year1 = date1.getFullYear();
      this.dateValueFrom =
        year1 + '-' + ('0' + month1).slice(-2) + '-' + ('0' + day1).slice(-2);
      this.monthTrendFrom = ('0' + month1).slice(-2);
      this.dateTodayFrom =
        ('0' + month1).slice(-2) + '/' + ('0' + day1).slice(-2) + '/' + year1;
      this.callPreview();
    } else if (fromtoyear == 'to') {
      console.log('to');
      let date1 = new Date(value);
      let month1 = date1.getMonth() + 1;
      let day1 = date1.getDate();
      let year1 = date1.getFullYear();
      this.dateValueTo =
        year1 + '-' + ('0' + month1).slice(-2) + '-' + ('0' + day1).slice(-2);
      this.monthTrendTo = ('0' + month1).slice(-2);
      this.dateTodayTo =
        ('0' + month1).slice(-2) + '/' + ('0' + day1).slice(-2) + '/' + year1;
      //this.monthTrendFromTo();
      this.callPreview();
    }
  }
  savepdf() {
    if (this.isPDFAvailable) {
      if (this.mode == 'regpf') {
        this.getRegularPFpdf();
      } else if (this.mode == 'phicpf') {
        this.getPHICPFpdf();
      } else if (this.mode == 'readersfee') {
        this.getReadersFeepdf();
      }
    }
  }
  downloadpdf() {
    if (this.pdfSrc != '') {
      this.link.click();
    }
    //
  }
  callPreview() {
    console.log(this.mode);

    if (this.mode == 'regpf') {
      this.getRegularPFpdfPreview();
    } else if (this.mode == 'phicpf') {
      this.getPHICPFpdfPreview();
    } else if (this.mode == 'readersfee') {
      this.getDOKiPFReadersFeeSOAPreview();
    }
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
