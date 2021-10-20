import { Component, OnInit, Renderer2 } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
import { StorageService } from "../services/storage/storage.service";
import { LoginData } from "../models/login-data.model";
import { DoctorService } from "../services/doctor/doctor.service";
import * as HighCharts from "highcharts";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { FunctionsService } from "../shared/functions/functions.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { Constants } from "../shared/constants";
import { AuthConstants, Consta } from '../config/auth-constants';
import { DoctorHistoryModel } from '../models/doctor';
import { PatientService } from "../services/patient/patient.service";

@Component({
  selector: "app-tab-dashboard",
  templateUrl: "./tab-dashboard.page.html",
  styleUrls: ["./tab-dashboard.page.scss"],
})

export class TabDashboardPage implements OnInit {
  userData$ = new BehaviorSubject<any>([]);
  public doctorHistoryModel = new DoctorHistoryModel;
  displayUserData: any;
  isDesktop: boolean;
  dr_code = "";
  first_name = "";
  lineChartxAxisForYear: any;
  lineChartyAxisForYear: any;
  lineChartxAxisForMonth: any;
  lineChartyAxisForMonth: any;
  totalAdmitted: any = 0;
  totalForDischarge: any = 0;
  admitted = "A";
  discharge = "D";
  getTotalCount = { Admitted: "0", ForDischarge: "0", Total: "0" };

  public logindata: LoginData;

  constructor(
    private authService: AuthService,
    private screensizeService: ScreenSizeService,
    private storageService: StorageService,
    private doctorService: DoctorService,
    private router: Router,
    public functionsService: FunctionsService,
    protected $gaService: GoogleAnalyticsService,
    public constants: Constants,
    private patientService: PatientService,
    private renderer: Renderer2
  ){
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
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
          fontFamily: "Nunito", // fontFamily: 'Inter'
        },
      },
    });

    HighCharts.chart("lineChartForYear", {
      chart: {
        renderTo: "container",
        height: 300,
        type: "column",
        styledMode: true,
      },
      title: { text: "12-Month Trend" },
      xAxis: {
        categories: this.lineChartxAxisForYear,
        labels: {
          enabled: false,
        },
      },
      yAxis: { title: { text: "" } },
      plotOptions: {
        line: { dataLabels: { enabled: true }, enableMouseTracking: false },
        column: {
          borderRadius: 5,
        },
      },
      series: [
        {
          type: undefined,
          name: "Patients",
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
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
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
          fontFamily: "Nunito", // fontFamily: 'Inter'
        },
      },
    });

    HighCharts.chart("lineChartForMonth", {
      chart: {
        renderTo: "container",
        height: 300,
        type: "column",
        styledMode: true,
      },
      title: { text: "30-Day Trend" },
      xAxis: {
        categories: this.lineChartxAxisForMonth,
        labels: {
          enabled: false,
        },
      },
      yAxis: { title: { text: "" } },
      plotOptions: {
        line: { dataLabels: { enabled: true }, enableMouseTracking: false },
        column: {
          borderRadius: 5,
        },
      },
      series: [
        {
          type: undefined,
          name: "Patients",
          data: this.lineChartyAxisForMonth,
        },
      ],
      responsive: {
        rules: [
          {
            condition: { minWidth: 300 },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
      credits: { enabled: false },
    });
  }

  ngOnInit() {
    this.$gaService.pageView("/Dashboard", "Dashboard Tab");
  }

  goto(data) {
    this.router.navigate(["/menu/in-patients" + data]);
  }

  ionViewWillEnter() {
    
    this.logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_code = this.logindata.dr_code;
    console.log(this.dr_code);
    this.doctorHistoryModel.accountNo = 'none';
    this.doctorHistoryModel.drCode = this.logindata.dr_code;
    this.doctorHistoryModel.mode = Consta.mode;
    this.first_name = this.logindata.first_name;//this.camelCase(this.logindata[0].first_name);
    let  dr_name = this.logindata.last_name;
    this.$gaService.event('Dashboard','User Flow',dr_name);
    let catego = [];
    let totalPatient = [];
    console.log(this.doctorHistoryModel);
    this.doctorService.getYearHistoryGraphV3().subscribe(
      (res: any) => {
        console.log(res);
        
        var count = Object.keys(res).length / 2;
        console.log(count);
        
        let month: any;
        let monthValue: any;
        for (let i = 1; i <= count; i++) {
          month = "Month" + i;
          monthValue = "Month" + i + "Value";
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
    this.doctorService.getMonthHistoryGraphV2(this.doctorHistoryModel).subscribe(
      (res: any) => {
        this.functionsService.logToConsole(res);
        let x = JSON.stringify(res);
        x = x.replace("[", "").replace("]", "");
        //x = x.replace("]", "");

        x = JSON.parse(x);

        var count = Object.keys(x).length / 2;
        let month: any = "";
        let monthValue: any = "";
        for (let i = 1; i <= count; i++) {
          month = "Day" + i;
          monthValue = "Day" + i + "Value";
          Day.push(x[month]);
          DayValue.push(Number(x[monthValue]));
        }
      },
      (error) => {},
      () => {
        this.lineChartxAxisForMonth = Day;
        this.lineChartyAxisForMonth = DayValue;
        this.lineChartPopulationForMonth();
      }
    );
    this.doctorService.getTotalCountV2(this.doctorHistoryModel).subscribe(
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
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }
  checkAppearance() {
    console.log('checkAppearance');
    var values = JSON.parse('[' + atob(localStorage.getItem("user_settings"))+ ']');
    let dr_username = atob(localStorage.getItem('username'));
    values.forEach(element => {
      console.log(element.darkmode);
      if(element.darkmode == 1){
        this.renderer.setAttribute(document.body,'color-theme','dark');
      }else{
        this.renderer.setAttribute(document.body,'color-theme','light');
      }
    });
    
   /* this.patientService
      .getUserSettingsV2(dr_username)
      .subscribe((res: any) => {
        if (Object.keys(res).length >= 1) {
          let data = JSON.stringify(res);
          data = '[' + data + ']';
          let adat = JSON.parse(data);
          adat.forEach((el) => {
            if (typeof el.appearance !== 'undefined') {
              if (el.appearance.darkmode == 1) {
                this.renderer.setAttribute(
                  document.body,
                  'color-theme',
                  'dark'
                );
              } else {
                this.renderer.setAttribute(
                  document.body,
                  'color-theme',
                  'light'
                );
              }
            } else {
              this.renderer.setAttribute(document.body, 'color-theme', 'light');
            }
          });
        }
      });*/
  }
}
