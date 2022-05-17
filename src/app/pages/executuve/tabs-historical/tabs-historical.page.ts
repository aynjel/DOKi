import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { Router } from '@angular/router';
import { Constants } from '../../../shared/constants';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import {
  UserSettingsModelv3,
  LoginResponseModelv3,
} from 'src/app/models/doctor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import { throwIfEmpty } from 'rxjs/operators';
import { runInThisContext } from 'vm';
import { DashboardgraphComponent } from '../components/dashboardgraph/dashboardgraph.component';
import * as HighCharts from 'highcharts';
import More from 'highcharts/highcharts-more';
More(HighCharts);
import Tree from 'highcharts/modules/treemap';
Tree(HighCharts);
import Heatmap from 'highcharts/modules/heatmap';
Heatmap(HighCharts);
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
import { ThrowStmt } from '@angular/compiler';
import { LoadingController, ModalController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// Initialize exporting module.
//Exporting(HighCharts);
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-tabs-historical',
  templateUrl: './tabs-historical.page.html',
  styleUrls: ['./tabs-historical.page.scss'],
})
export class TabsHistoricalPage implements OnInit {
  isDesktop: boolean;
  private ngUnsubscribe = new Subject();
  constructor(
    private storageService: StorageService,
    private router: Router,
    public constants: Constants,
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private executiveService: ExecutiveService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {
    this.screensizeService
      .isDesktopView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          // Reload because our routing is out of place
          //window.location.reload();
        }

        this.isDesktop = isDesktop;
      });
  }
  ngOnInit() {
    this.ngUnsubscribe = new Subject();
    this.generateMonthlyTotalAdmissions();
    this.generateYTDDailyAvgCensusByMonth();
    this.generateYTDAverageLOSByMonth();
    this.setDateFromTo();
  }
  settings() {
    this.router.navigate(['/executive/settings']);
  }

  /*
  __  __             _   _          _______    _        _                _           _         _                 
 |  \/  |           | | | |        |__   __|  | |      | |      /\      | |         (_)       (_)                
 | \  / | ___  _ __ | |_| |_   _      | | ___ | |_ __ _| |     /  \   __| |_ __ ___  _ ___ ___ _  ___  _ __  ___ 
 | |\/| |/ _ \| '_ \| __| | | | |     | |/ _ \| __/ _` | |    / /\ \ / _` | '_ ` _ \| / __/ __| |/ _ \| '_ \/ __|
 | |  | | (_) | | | | |_| | |_| |     | | (_) | || (_| | |   / ____ \ (_| | | | | | | \__ \__ \ | (_) | | | \__ \
 |_|  |_|\___/|_| |_|\__|_|\__, |     |_|\___/ \__\__,_|_|  /_/    \_\__,_|_| |_| |_|_|___/___/_|\___/|_| |_|___/
                            __/ |                                                                                
                           |___/                                                                                 
  */
  monthTrendFrom: any = '01';
  monthTrendTo: any = '12';
  yearTreandTO: any = '2022';
  MTATotal: any;
  MTA: any;

  MTACeb: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  MTAMan: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  MTACebSet: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  MTAManSet: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  MTACategory: any = ['', '', '', '', '', '', '', '', '', '', '', ''];
  MTACategorySet: any = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  populateMontlyTotalAdmissions() {
    if (this.MTA != undefined) {
      this.MTA.destroy();
    }
    this.MTA = HighCharts.chart('populateMontlyTotalAdmissions', {
      chart: {
        type: 'column',
      },
      title: {
        //text: 'Total Admissions ' + this.yearTreandTO + ' : ' + this.MTATotal,
        text: '',
      },
      xAxis: {
        categories: this.MTACategory,
      },
      yAxis: {
        title: { text: '' },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          },
        },
      },
      /*tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}',
      },*/
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat:
          '{series.name}: {point.y}<br/><br/>Total: {point.stackTotal}',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Cebu',
          type: undefined,
          color: '#275228',
          data: this.MTACeb,
        },
        {
          name: 'Mandaue',
          type: undefined,
          color: '#d12027',
          data: this.MTAMan,
        },
      ],
      credits: { enabled: false },
    });
    //this.MTA.yAxis[0].setExtremes(500, 4700);
    setTimeout(() => {
      this.MTA.reflow();
    }, 1000);
  }

  generateMonthlyTotalAdmissions() {
    let tempMTA;
    //this.presentLoading();
    this.executiveService
      .getMontlyTotalAdmissions(this.yearTreandTO)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.dismissLoading();
          tempMTA = res;
        },
        (error) => {
          this.dismissLoading();
        },
        () => {
          this.dismissLoading();
          if (tempMTA != null) {
            this.MTATotal = 0;
            // this.MTACebSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.MTACebSet = [];
            // this.MTAManSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.MTAManSet = [];
            tempMTA.forEach((element) => {
              if (element.site == 'C') {
                this.MTATotal += element.totalAdmsMTD;
                this.MTACebSet[element.month - 1] = element.totalAdmsMTD;
              }
              if (element.site == 'M') {
                this.MTATotal += element.totalAdmsMTD;
                this.MTAManSet[element.month - 1] = element.totalAdmsMTD;
              }
            });
            this.MTACeb = this.MTACebSet;
            this.MTAMan = this.MTAManSet;
            this.MTACategory = this.MTACategorySet;
            this.monthTrendFromTo();
          } else {
            /*
            this.MTACebSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.MTAManSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            */
            this.MTACebSet = [];
            this.MTAManSet = [];
            this.monthTrendFromTo();
          }
        }
      );
  }

  monthTrendYear() {
    this.generateMonthlyTotalAdmissions();
    this.generateYTDDailyAvgCensusByMonth();
    this.generateYTDAverageLOSByMonth();
  }
  monthTrendFromTo() {
    if (this.monthTrendTo >= this.monthTrendFrom) {
      this.MTACategory = [];
      this.MTACeb = [];
      this.MTAMan = [];
      this.MTATotal = 0;
      this.cebuCovid = [];
      console.log(this.cebuCovidTmp);
      for (let i = this.monthTrendFrom - 1; i <= this.monthTrendTo - 1; i++) {
        this.MTATotal += this.MTACebSet[i];
        this.MTATotal += this.MTAManSet[i];
        this.MTACategory.push(this.MTACategorySet[i]);
        this.MTACeb.push(this.MTACebSet[i]);
        this.MTAMan.push(this.MTAManSet[i]);
        this.cebuCovid.push(this.cebuCovidTmp[i]);
      }
      this.populateMontlyTotalAdmissions();
    }
    this.monthTrendFromTo1();
  }
  monthTrendFromTo1() {
    if (this.monthTrendTo >= this.monthTrendFrom) {
      this.cebuCovid = [];
      this.cebuNonCovid = [];
      this.mandaueCovid = [];
      this.mandaueNonCovid = [];
      for (let i = this.monthTrendFrom - 1; i <= this.monthTrendTo - 1; i++) {
        this.cebuCovid.push(this.cebuCovidTmp[i]);
        this.cebuNonCovid.push(this.cebuNonCovidTmp[i]);
        this.mandaueCovid.push(this.mandaueCovidTmp[i]);
        this.mandaueNonCovid.push(this.mandaueNonCovidTmp[i]);
      }
      this.buildYTDDailyAvgCensusByMonth();
    }
    this.monthTrendFromTo2();
  }
  monthTrendFromTo2() {
    if (this.monthTrendTo >= this.monthTrendFrom) {
      this.cebuCritical = [];
      this.cebuNonCritical = [];
      this.mandaueCritical = [];
      this.mandaueNonCritical = [];
      for (let i = this.monthTrendFrom - 1; i <= this.monthTrendTo - 1; i++) {
        this.cebuCritical.push(this.cebuCriticalTmp[i]);
        this.cebuNonCritical.push(this.cebuNonCriticalTmp[i]);
        this.mandaueCritical.push(this.mandaueCriticalTmp[i]);
        this.mandaueNonCritical.push(this.mandaueNonCriticalTmp[i]);
      }
      this.buildYTDAverageLOSByMonth();
    }
  }
  loading: any;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 0,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    //////////////////console.log('Loading dismissed!');
  }
  public async dismissLoading(): Promise<void> {
    if (this.loading) {
      this.loading.dismiss();
    }
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
  dateValueFrom = '2012-01-15';
  dateValueTo = '2012-12-15';
  dateValueYear = '2022-01-15';
  dateTodayYear;
  setDateFromTo() {
    let date1 = new Date(this.dateValueFrom);
    let day1 = date1.getDate();
    let month1 = date1.getMonth() + 1;
    let year1 = date1.getFullYear();
    let sendDatedateValue =
      year1 + '-' + ('0' + month1).slice(-2) + '-' + ('0' + day1).slice(-2);
    this.dateValueFrom = sendDatedateValue;
    this.dateTodayFrom = this.monthNames[month1 - 1];

    let date2 = new Date();
    let day2 = date2.getDate();
    let month2 = date2.getMonth() + 1;
    let year2 = date2.getFullYear();
    let sendDatedateValue2 =
      year2 + '-' + ('0' + month2).slice(-2) + '-' + ('0' + day2).slice(-2);
    this.dateValueTo = sendDatedateValue2;
    this.dateTodayTo = this.monthNames[month2 - 1];
    let date11 = new Date();
    let month11 = date11.getMonth() + 1;
    let day11 = date11.getDate();
    let year11 = date11.getFullYear();
    this.dateValueTo =
      year11 + '-' + ('0' + month11).slice(-2) + '-' + ('0' + day11).slice(-2);
    this.monthTrendTo = ('0' + month11).slice(-2);

    let date3 = new Date();
    //console.log(date3);

    let day3 = date3.getDate();
    let month3 = date3.getMonth() + 1;
    let year3 = date3.getFullYear();
    //console.log(year3);
    let sendDatedateValue3 =
      year3 + '-' + ('0' + month3).slice(-2) + '-' + ('0' + day3).slice(-2);
    this.dateValueYear = sendDatedateValue3;
    this.dateTodayYear = year3;
  }
  formatDate(fromtoyear, value: string) {
    if (fromtoyear == 'from') {
      let date1 = new Date(value);
      let month1 = date1.getMonth() + 1;
      let day1 = date1.getDate();
      let year1 = date1.getFullYear();
      this.dateValueFrom =
        year1 + '-' + ('0' + month1).slice(-2) + '-' + ('0' + day1).slice(-2);
      this.monthTrendFrom = ('0' + month1).slice(-2);
      this.dateTodayFrom = this.monthNames[month1 - 1];
      this.monthTrendFromTo();
    } else if (fromtoyear == 'to') {
      let date1 = new Date(value);
      let month1 = date1.getMonth() + 1;
      let day1 = date1.getDate();
      let year1 = date1.getFullYear();
      this.dateValueTo =
        year1 + '-' + ('0' + month1).slice(-2) + '-' + ('0' + day1).slice(-2);
      this.monthTrendTo = ('0' + month1).slice(-2);
      this.dateTodayTo = this.monthNames[month1 - 1];
      this.monthTrendFromTo();
    } else if (fromtoyear == 'year') {
      let date1 = new Date(value);
      let month1 = date1.getMonth() + 1;
      let day1 = date1.getDate();
      let year1 = date1.getFullYear();
      this.yearTreandTO = year1;
      this.dateTodayYear = year1;
      this.dateValueYear =
        year1 + '-' + ('0' + month1).slice(-2) + '-' + ('0' + day1).slice(-2);
      this.monthTrendYear();
    }
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  cebuCovid = [];
  cebuCovidTmp = [];
  cebuNonCovid = [];
  cebuNonCovidTmp = [];
  mandaueCovid = [];
  mandaueCovidTmp = [];
  mandaueNonCovid = [];
  mandaueNonCovidTmp = [];
  generateYTDDailyAvgCensusByMonth() {
    this.cebuCovid = [];
    this.cebuCovidTmp = [];
    this.cebuNonCovid = [];
    this.cebuNonCovidTmp = [];
    this.mandaueCovid = [];
    this.mandaueCovidTmp = [];
    this.mandaueNonCovid = [];
    this.mandaueNonCovidTmp = [];
    let tempMTA;
    this.executiveService
      .getYTDDailyAvgCensusByMonth(this.yearTreandTO)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.dismissLoading();
          tempMTA = res;
        },
        (error) => {
          this.dismissLoading();
        },
        () => {
          tempMTA = this.orderBy(tempMTA);
          tempMTA.forEach((el) => {
            for (let i = 1; i <= 12; i++) {
              if (
                el.month == i.toString() &&
                el.patientType == 'Covid' &&
                el.site == 'C'
              ) {
                ////console.log(el.aveOccupancy);
                this.cebuCovid.push(el.aveOccupancy);
                this.cebuCovidTmp.push(el.aveOccupancy);
              }
              if (
                el.month == i.toString() &&
                el.patientType == 'Non-Covid' &&
                el.site == 'C'
              ) {
                // //console.log(el.aveOccupancy);
                this.cebuNonCovid.push(el.aveOccupancy);
                this.cebuNonCovidTmp.push(el.aveOccupancy);
              }
              if (
                el.month == i.toString() &&
                el.patientType == 'Covid' &&
                el.site == 'M'
              ) {
                ////console.log(el.aveOccupancy);
                this.mandaueCovid.push(el.aveOccupancy);
                this.mandaueCovidTmp.push(el.aveOccupancy);
              }
              if (
                el.month == i.toString() &&
                el.patientType == 'Non-Covid' &&
                el.site == 'M'
              ) {
                // //console.log(el.aveOccupancy);
                this.mandaueNonCovid.push(el.aveOccupancy);
                this.mandaueNonCovidTmp.push(el.aveOccupancy);
              }
            }
          });
          //console.log(this.cebuCovid);
          //console.log(this.cebuNonCovid);
          this.dismissLoading();
          this.monthTrendFromTo1();
        }
      );
  }
  DACpM;
  buildYTDDailyAvgCensusByMonth() {
    if (this.DACpM != undefined) {
      this.DACpM.destroy();
    }
    this.DACpM = HighCharts.chart('YTDDailyAvgCensusByMonth', {
      chart: {
        type: 'column',
      },
      title: {
        //text: 'Total Admissions ' + this.yearTreandTO + ' : ' + this.MTATotal,
        text: '',
      },
      xAxis: {
        categories: this.MTACategory,
      },
      yAxis: {
        title: { text: '' },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          },
        },
      },
      /*tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}',
      },*/
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat:
          '{series.name}: {point.y}<br/><br/>Total: {point.stackTotal}',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Covid Cebu',
          data: this.cebuCovid,
          type: undefined,
          stack: 'Cebu',
          color: '#05c75f',
        },
        {
          name: 'Non-Covid Cebu',
          data: this.cebuNonCovid,
          type: undefined,
          stack: 'Cebu',
          color: '#275228',
        },
        {
          name: 'Covid Mandaue',
          data: this.mandaueCovid,
          type: undefined,
          stack: 'mandaue',
          color: '#e78c8f',
        },
        {
          name: 'Non-Covid Mandaue',
          data: this.mandaueNonCovid,
          type: undefined,
          stack: 'mandaue',
          color: '#d12027',
        },
      ],
      credits: { enabled: false },
    });
    //this.MTA.yAxis[0].setExtremes(500, 4700);
    setTimeout(() => {
      this.DACpM.reflow();
    }, 1000);
  }
  cebuCritical = [];
  cebuCriticalTmp = [];
  cebuNonCritical = [];
  cebuNonCriticalTmp = [];
  mandaueCritical = [];
  mandaueCriticalTmp = [];
  mandaueNonCritical = [];
  mandaueNonCriticalTmp = [];
  generateYTDAverageLOSByMonth() {
    this.cebuCritical = [];
    this.cebuCriticalTmp = [];
    this.cebuNonCritical = [];
    this.cebuNonCriticalTmp = [];
    this.mandaueCritical = [];
    this.mandaueCriticalTmp = [];
    this.mandaueNonCritical = [];
    this.mandaueNonCriticalTmp = [];
    let tempMTA;
    this.executiveService
      .getYTDAverageLOSByMonth(this.yearTreandTO)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.dismissLoading();
          tempMTA = res;
        },
        (error) => {
          this.dismissLoading();
        },
        () => {
          tempMTA.forEach((el) => {
            for (let i = 1; i <= 12; i++) {
              if (
                el.month == i.toString() &&
                el.patientType == 'Critical' &&
                el.site == 'C'
              ) {
                this.cebuCriticalTmp.push(el.aveLOS);
                this.cebuCritical.push(el.aveLOS);
              }
              if (
                el.month == i.toString() &&
                el.patientType == 'Non-Critical' &&
                el.site == 'C'
              ) {
                this.cebuNonCriticalTmp.push(el.aveLOS);
                this.cebuNonCritical.push(el.aveLOS);
              }
              if (
                el.month == i.toString() &&
                el.patientType == 'Critical' &&
                el.site == 'M'
              ) {
                this.mandaueCriticalTmp.push(el.aveLOS);
                this.mandaueCritical.push(el.aveLOS);
              }
              if (
                el.month == i.toString() &&
                el.patientType == 'Non-Critical' &&
                el.site == 'M'
              ) {
                this.mandaueNonCriticalTmp.push(el.aveLOS);
                this.mandaueNonCritical.push(el.aveLOS);
              }
            }
          });
          //console.log(this.cebuCritical);
          //console.log(this.cebuNonCritical);
          this.dismissLoading();
          this.monthTrendFromTo2();
        }
      );
  }
  albm;
  buildYTDAverageLOSByMonth() {
    if (this.albm != undefined) {
      this.albm.destroy();
    }
    this.albm = HighCharts.chart('YTDAverageLOSByMonth', {
      chart: {
        type: 'column',
      },
      title: {
        //text: 'Total Admissions ' + this.yearTreandTO + ' : ' + this.MTATotal,
        text: '',
      },
      xAxis: {
        categories: this.MTACategory,
      },
      yAxis: {
        title: { text: '' },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          },
        },
      },
      /*tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}',
      },*/
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat:
          '{series.name}: {point.y}<br/><br/>Total: {point.stackTotal}',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Critical Cebu',
          data: this.cebuCritical,
          type: undefined,
          stack: 'Cebu',
          color: '#05c75f',
        },
        {
          name: 'Non-Critical Cebu',
          data: this.cebuNonCritical,
          type: undefined,
          stack: 'Cebu',
          color: '#275228',
        },
        {
          name: 'Critical Mandaue',
          data: this.mandaueCritical,
          type: undefined,
          stack: 'mandaue',
          color: '#e78c8f',
        },
        {
          name: 'Non-Critical Mandaue',
          data: this.mandaueNonCritical,
          type: undefined,
          stack: 'mandaue',
          color: '#d12027',
        },
      ],
      credits: { enabled: false },
    });
    //this.MTA.yAxis[0].setExtremes(500, 4700);
    setTimeout(() => {
      this.albm.reflow();
    }, 1000);
  }
  orderBy(arr) {
    return arr.sort((item1: any, item2: any) => {
      return this.comparator(item2, item1);
    });
  }

  comparator(a: any, b: any) {
    return b.month - a.month;
  }
}
