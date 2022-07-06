import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';
import { StorageService } from '../services/storage/storage.service';
import { DoctorService } from '../services/doctor/doctor.service';
import * as HighCharts from 'highcharts';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FunctionsService } from '../shared/functions/functions.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Constants } from '../shared/constants';
import { Consta } from '../config/auth-constants';
import { DoctorHistoryModel, RevokeTokenV3 } from '../models/doctor';
import { PatientService } from '../services/patient/patient.service';
import { LoginResponseModelv3 } from 'src/app/models/doctor';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LogoutService } from '../services/logout/logout.service';
@Component({
  selector: 'app-tab-dashboard',
  templateUrl: './tab-dashboard.page.html',
  styleUrls: ['./tab-dashboard.page.scss'],
})
export class TabDashboardPage implements OnInit {
  userData$ = new BehaviorSubject<any>([]);
  public doctorHistoryModel = new DoctorHistoryModel();
  displayUserData: any;
  isDesktop: boolean;
  dr_code = '';
  first_name = '';
  lineChartxAxisForYear: any;
  lineChartyAxisForYear: any;
  lineChartxAxisForMonth: any;
  lineChartyAxisForMonth: any;
  totalAdmitted: any = 0;
  totalForDischarge: any = 0;
  admitted = 'A';
  discharge = 'D';
  getTotalCount = { admitted: '0', forDischarge: '0', total: '0' };

  public logindata: LoginResponseModelv3;
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  private ngUnsubscribe = new Subject();
  isNotification: boolean;
  constructor(
    private authService: AuthService,
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private router: Router,
    public functionsService: FunctionsService,
    protected $gaService: GoogleAnalyticsService,
    public constants: Constants,
    private renderer: Renderer2,
    private logoutService: LogoutService
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

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
  }
  lineChartPopulationForYear() {
    HighCharts.setOptions({
      chart: {
        style: {
          fontFamily: 'Nunito', // fontFamily: 'Inter'
        },
      },
    });

    HighCharts.chart('lineChartForYear', {
      chart: {
        renderTo: 'container',
        height: 300,
        type: 'column',
        styledMode: true,
      },
      title: { text: '12-Month Trend' },
      xAxis: {
        categories: this.lineChartxAxisForYear,
        labels: {
          enabled: false,
        },
      },
      yAxis: { title: { text: '' } },
      plotOptions: {
        line: { dataLabels: { enabled: true }, enableMouseTracking: false },
        column: {
          borderRadius: 5,
        },
      },
      series: [
        {
          type: undefined,
          name: 'Patients',
          data: this.lineChartyAxisForYear,
          label: { enabled: false },
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              minWidth: 300,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
      credits: { enabled: false },
    });
  }

  lineChartPopulationForMonth() {
    HighCharts.setOptions({
      chart: {
        style: {
          fontFamily: 'Nunito', // fontFamily: 'Inter'
        },
      },
    });

    HighCharts.chart('lineChartForMonth', {
      chart: {
        renderTo: 'container',
        height: 300,
        type: 'column',
        styledMode: true,
      },
      title: { text: '30-Day Trend' },
      xAxis: {
        categories: this.lineChartxAxisForMonth,
        labels: {
          enabled: false,
        },
      },
      yAxis: { title: { text: '' } },
      plotOptions: {
        line: { dataLabels: { enabled: true }, enableMouseTracking: false },
        column: {
          borderRadius: 5,
        },
      },
      series: [
        {
          type: undefined,
          name: 'Patients',
          data: this.lineChartyAxisForMonth,
        },
      ],
      responsive: {
        rules: [
          {
            condition: { minWidth: 300 },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
      credits: { enabled: false },
    });
  }

  ngOnInit() {
    this.$gaService.pageView('/Dashboard', 'Dashboard Tab');
  }
  dateToday;
  dateNow;
  checkInbox() {
    let data = {
      dt_from: this.functionsService.getDateYYYYMMDD(9999) + 'T00:00:00.000Z',
      dt_to: this.functionsService.getDateYYYYMMDD() + 'T00:00:00.000Z',
    };
    console.log(data);

    let jsonResponse = null;
    this.doctorService
      .getPendingApproval(data)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          jsonResponse = res;
        },
        (error) => {},
        () => {
          this.isNotification = false;
          jsonResponse.forEach((element) => {
            if (
              element.approval_status == 'FA' ||
              element.approval_status == 'RA'
            ) {
              this.isNotification = true;
            }
          });
        }
      );
  }
  goto(data) {
    this.router.navigate(['/menu/in-patients' + data]);
  }

  ionViewWillEnter() {
    this.checkInbox();
    this.ngUnsubscribe = new Subject();
    localStorage.removeItem('selectedPatient');
    this.logindata = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    this.dr_code = this.logindata.doctorCode;
    this.functionsService.logToConsole(this.dr_code);
    this.doctorHistoryModel.accountNo = 'none';
    this.doctorHistoryModel.drCode = this.logindata.doctorCode;
    this.doctorHistoryModel.mode = Consta.mode;
    this.first_name = this.logindata.firstName; //this.camelCase(this.logindata[0].first_name);
    this.functionsService.logToConsole(this.logindata);

    let dr_name = this.logindata.lastName;
    this.$gaService.event('Dashboard', 'User Flow', dr_name);
    let catego = [];
    let totalPatient = [];

    this.doctorService
      .getYearHistoryGraphV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          var count = Object.keys(res).length / 2;
          let month: any;
          let monthValue: any;
          for (let i = 1; i <= count; i++) {
            month = 'month' + i;
            monthValue = 'month' + i + 'Value';
            catego.push(res[month]);
            totalPatient.push(Number(res[monthValue]));
          }
        },
        (error) => {},
        () => {
          this.lineChartxAxisForYear = catego;
          this.lineChartyAxisForYear = totalPatient;
          this.lineChartPopulationForYear();
        }
      );
    let Day = [];
    let DayValue = [];
    this.doctorService
      .getMonthHistoryGraphV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.functionsService.logToConsole(res);

          if (res != null) {
            let x = JSON.stringify(res);
            x = x.replace('[', '').replace(']', '');
            x = JSON.parse(x);
            var count = Object.keys(x).length / 2;
            let month: any = '';
            let monthValue: any = '';
            for (let i = 1; i <= count; i++) {
              month = 'day' + i;
              monthValue = 'day' + i + 'Value';
              Day.push(x[month]);
              DayValue.push(Number(x[monthValue]));
            }
          }
        },
        (error) => {
          this.functionsService.logToConsole(error);
        },
        () => {
          this.lineChartxAxisForMonth = Day;
          this.lineChartyAxisForMonth = DayValue;
          this.lineChartPopulationForMonth();
        }
      );
    this.doctorService
      .getTotalCountV3(this.doctorHistoryModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.functionsService.logToConsole(JSON.stringify(res));
          if (res) {
            this.getTotalCount = res;
          }
        },
        (error) => {},
        () => {}
      );
  }

  camelCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
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
  revokeTokenV3;
  logout() {
    let dr_username = atob(localStorage.getItem('username'));
    this.revokeTokenV3 = new RevokeTokenV3();
    this.revokeTokenV3.jwt = decodeURIComponent(
      this.functionsService.getcookie('refreshToken')
    );
    console.log(this.revokeTokenV3);

    this.doctorService
      .revokeTokenV3(this.revokeTokenV3)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        this.functionsService.logToConsole(res);
      });

    this.logoutService.out();
  }
}
