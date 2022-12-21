import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { StorageService } from "src/app/services/storage/storage.service";
import { AuthConstants, Consta } from "../../../config/auth-constants";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { Constants } from "../../../shared/constants";
import { ScreenSizeService } from "src/app/services/screen-size/screen-size.service";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import {
  UserSettingsModelv3,
  LoginResponseModelv3,
} from "src/app/models/doctor";
import { AuthService } from "src/app/services/auth/auth.service";
import { ExecutiveService } from "src/app/services/executive/executive.service";
import { throwIfEmpty } from "rxjs/operators";
import { runInThisContext } from "vm";
import { DashboardgraphComponent } from "../components/dashboardgraph/dashboardgraph.component";
import * as HighCharts from "highcharts";
import More from "highcharts/highcharts-more";
More(HighCharts);
import Tree from "highcharts/modules/treemap";
Tree(HighCharts);
import Heatmap from "highcharts/modules/heatmap";
Heatmap(HighCharts);
// Load the exporting module.
import Exporting from "highcharts/modules/exporting";
import { ThrowStmt } from "@angular/compiler";
import {
  IonDatetime,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
// Initialize exporting module.
//Exporting(HighCharts);
import { format, parseISO } from "date-fns";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { NavigationStart } from "@angular/router";
@Component({
  selector: "app-tabs-erlist",
  templateUrl: "./tabs-erlist.page.html",
  styleUrls: ["./tabs-erlist.page.scss"],
})
export class TabsErlistPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isDesktop: boolean;
  dateToday: any = "12/31/2021";
  listOfPatients: any = [];
  listOfPatientsFinal: any = [];
  listOfPatientsTemp: any;
  listOfPatientsTemp1: any;
  listOfPatientsTemp2: any;
  searchBar: any = "";
  responseData: any;
  segmentModel: any = "Clean ER";
  segmentModel1: any = "ALL";
  maxTime: any;
  refreshcounter;
  dateValue = "2021-12-31";
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
    this.setDate();
  }
  isCalendar: boolean;
  activateIsCalendarModal() {
    this.isCalendar = true;
    const modalState = {
      modal: true,
      desc: "fake state for our modal",
    };
    history.pushState(modalState, null);
  }
  @HostListener("window:popstate", ["$event"])
  dismissModal() {
    if (this.isCalendar) {
      this.modalController.dismiss();
      this.isCalendar = false;
    }
  }
  closeCalendar() {
    this.isCalendar = false;
    this.modalController.dismiss();
  }
  setDate() {
    let date1 = new Date(this.dateValue);

    let day1 = date1.getDate();
    let month1 = date1.getMonth() + 1;
    let year1 = date1.getFullYear();
    let sendDatedateToday =
      ("0" + month1).slice(-2) + "/" + ("0" + day1).slice(-2) + "/" + year1;
    let sendDatedateValue =
      year1 + "-" + ("0" + month1).slice(-2) + "-" + ("0" + day1).slice(-2);
    this.dateValue = sendDatedateValue;
    this.dateToday = sendDatedateToday;
    ////console.log(this.dateValue);
  }
  formatDate(value: any) {
    if (this.isCalendar) {
      this.closeCalendar();
    }

    this.isCalendar = false;
    let date1 = new Date(value);
    let day1 = date1.getDate();
    let month1 = date1.getMonth() + 1;
    let year1 = date1.getFullYear();
    let sendDatedateToday =
      ("0" + month1).slice(-2) + "/" + ("0" + day1).slice(-2) + "/" + year1;
    let sendDatedateValue =
      year1 + "-" + ("0" + month1).slice(-2) + "-" + ("0" + day1).slice(-2);
    this.dateValue = sendDatedateValue;
    this.dateToday = sendDatedateToday;
    this.dateChanged();
  }
  /*********************************************/
  settings() {
    this.router.navigate(["/executive/settings"]);
  }

  ngOnInit() {
    this.ngUnsubscribe = new Subject();
    this.formatDate(this.dateToday);
    //this.getErwaitlist('12/31/2021');
    // this.setDate();
  }
  showSkeleton: boolean = false;
  noData: boolean = false;
  getErwaitlist(data) {
    this.refreshcounter = 1;
    this.listOfPatients = [];
    this.listOfPatientsFinal = [];
    this.showSkeleton = true;
    this.noData = false;
    let dateToSend = encodeURIComponent(data);
    this.executiveService
      .getERList(dateToSend)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.showSkeleton = false;
          this.listOfPatientsTemp =
            this.listOfPatientsTemp1 =
            this.listOfPatientsTemp2 =
              res;
        },
        (error) => {},
        () => {
          this.segmentChanged();
        }
      );
  }
  doRefresh(event) {
    this.searchBar = "";
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  filterList() {
    this.refreshcounter = 1;
    //////console.log(this.searchBar);
    if (this.searchBar == "") {
      this.listOfPatients = this.listOfPatientsTemp2;
    } else {
      this.listOfPatients = [];
      /*this.listOfPatientsTemp2.forEach((element) => {
        if (
          element.patientName
            .toLowerCase()
            .includes(this.searchBar.toLowerCase())
        ) {
          this.listOfPatients.push(element);
        }
      });*/

      this.listOfPatients = this.listOfPatientsTemp2.filter((x) =>
        x.patientName.toLowerCase().includes(this.searchBar.toLowerCase())
      );
    }
    ////console.log('listOfPatients');

    ////console.log(this.listOfPatients);

    if (this.listOfPatients == null || this.listOfPatients.length <= 0) {
      this.noData = true;
    } else {
      this.noData = false;
      let i = 1;

      /* this.listOfPatients.forEach((element) => {
        if (i <= 10) {
          this.listOfPatientsFinal.push(element);
        }
        i++;
      });*/
      //console.log(this.listOfPatients);

      this.listOfPatientsFinal = this.listOfPatients.slice(0, 10);
      //console.log(this.listOfPatientsFinal);
    }
  }
  segmentChanged() {
    this.listOfPatients = [];
    this.listOfPatientsTemp1 = [];
    this.listOfPatientsTemp2 = [];
    if (this.listOfPatientsTemp != null) {
      this.listOfPatientsTemp1 = this.listOfPatientsTemp.filter(
        (x) => x.erType == this.segmentModel
      );
      console.log(this.listOfPatientsTemp1);
    } else {
      this.listOfPatientsTemp1 = [];
    }
    if (this.segmentModel1 == "ALL") {
      this.listOfPatientsTemp2 = this.listOfPatientsTemp1;
    } else {
      this.listOfPatients = [];
      /*this.listOfPatientsTemp1.forEach((element) => {
        if (element.site == this.segmentModel1) {
          this.listOfPatientsTemp2.push(element);
        }
      });*/
      this.listOfPatientsTemp2 = this.listOfPatientsTemp1.filter(
        (x) => x.site == this.segmentModel1
      );
    }
    ////console.log(this.listOfPatientsTemp2);

    this.filterList();
  }

  dateChanged() {
    /*let today: any = new Date();
    let days = 86400000; //number of milliseconds in a day
    let fiveDaysAgo = new Date(today - 5 * days);

    let day = fiveDaysAgo.getDate();
    let month = fiveDaysAgo.getMonth() + 1;
    let year = fiveDaysAgo.getFullYear();
    this.dateToday = month + '/' + day + '/' + year;
*/
    //this.maxTime = month + '/' + day + '/' + year;
    let getMaxDate = new Date();
    let dayMaxDate = getMaxDate.getDate();
    let monthMaxDate = getMaxDate.getMonth() + 1;
    let yearMaxDate = getMaxDate.getFullYear();
    this.maxTime = yearMaxDate + "-" + monthMaxDate + "-" + dayMaxDate;

    let date1 = new Date(this.dateToday);

    let day1 = date1.getDate();
    let month1 = date1.getMonth() + 1;
    let year1 = date1.getFullYear();
    let sendDate =
      ("0" + month1).slice(-2) + "/" + ("0" + day1).slice(-2) + "/" + year1;

    ////console.log(this.maxTime);
    this.listOfPatients = [];
    this.listOfPatientsTemp1 = [];
    this.getErwaitlist(sendDate);
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  loadData(event) {
    this.refreshcounter++;
    // Using settimeout to simulate api call
    setTimeout(() => {
      // load more data

      this.listOfPatientsFinal = this.listOfPatientsFinal.concat(
        this.listOfPatients.slice(
          this.refreshcounter * 10 - 10,
          this.refreshcounter * 10
        )
      );
      /*
      let i = 1;
      //////console.log(this.listOfPatientsTemp1.length);
      this.listOfPatientsTemp1.forEach((element) => {
        if (
          i > this.refreshcounter * 10 - 10 &&
          i <= this.refreshcounter * 10
        ) {
          this.listOfPatients.push(element);
          //////console.log(element.status);
        }
        i++;
      });
*/
      //Hide Infinite List Loader on Complete
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 500);
  }
}
