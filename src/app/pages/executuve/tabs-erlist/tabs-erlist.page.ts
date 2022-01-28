import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { BehaviorSubject } from 'rxjs';
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

@Component({
  selector: 'app-tabs-erlist',
  templateUrl: './tabs-erlist.page.html',
  styleUrls: ['./tabs-erlist.page.scss'],
})
export class TabsErlistPage implements OnInit {
  isDesktop: boolean;
  dateToday: any = '12/31/2021';
  listOfPatients: any = [];
  listOfPatientsTemp: any;
  listOfPatientsTemp1: any;
  listOfPatientsTemp2: any;
  searchBar: any = '';
  responseData: any;
  segmentModel: any = 'Clean ER';
  segmentModel1: any = 'ALL';
  maxTime: any;
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
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        //window.location.reload();
      }

      this.isDesktop = isDesktop;
    });
  }
  settings() {
    this.router.navigate(['/executive/settings']);
  }

  ngOnInit() {
    this.getErwaitlist('12/31/2021');
  }
  showSkeleton: boolean = false;
  noData: boolean = false;
  getErwaitlist(data) {
    this.listOfPatients = [];
    this.showSkeleton = true;
    this.noData = false;
    let dateToSend = encodeURIComponent(data);
    this.executiveService.getERList(dateToSend).subscribe(
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
    this.searchBar = '';
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  filterList() {
    ////console.log(this.searchBar);
    if (this.searchBar == '') {
      this.listOfPatients = this.listOfPatientsTemp2;
    } else {
      this.listOfPatients = [];
      this.listOfPatientsTemp2.forEach((element) => {
        if (
          element.patientName
            .toLowerCase()
            .includes(this.searchBar.toLowerCase())
        ) {
          this.listOfPatients.push(element);
        }
      });
    }
    //console.log('listOfPatients');

    //console.log(this.listOfPatients);

    if (this.listOfPatients == null || this.listOfPatients.length <= 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }
  segmentChanged() {
    this.listOfPatients = [];
    this.listOfPatientsTemp1 = [];
    this.listOfPatientsTemp2 = [];
    if (this.listOfPatientsTemp != null) {
      this.listOfPatientsTemp.forEach((element) => {
        if (element.erType == this.segmentModel) {
          this.listOfPatientsTemp1.push(element);
        }
      });
    } else {
      this.listOfPatientsTemp1 = [];
    }
    if (this.segmentModel1 == 'ALL') {
      this.listOfPatientsTemp2 = this.listOfPatientsTemp1;
    } else {
      this.listOfPatients = [];
      this.listOfPatientsTemp1.forEach((element) => {
        if (element.site == this.segmentModel1) {
          this.listOfPatientsTemp2.push(element);
        }
      });
    }
    //console.log(this.listOfPatientsTemp2);

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
    this.maxTime = yearMaxDate + '-' + monthMaxDate + '-' + dayMaxDate;

    let date1 = new Date(this.dateToday);

    let day1 = date1.getDate();
    let month1 = date1.getMonth() + 1;
    let year1 = date1.getFullYear();
    let sendDate = month1 + '/' + day1 + '/' + year1;

    //console.log(this.maxTime);
    this.listOfPatients = [];
    this.listOfPatientsTemp1 = [];
    this.getErwaitlist(sendDate);
  }
}
