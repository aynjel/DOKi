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
  selector: 'app-tabs-historical',
  templateUrl: './tabs-historical.page.html',
  styleUrls: ['./tabs-historical.page.scss'],
})
export class TabsHistoricalPage implements OnInit {
  isDesktop: boolean;
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
    this.executiveService.getMontlyTotalAdmissions(this.yearTreandTO).subscribe(
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
          this.MTACebSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.MTAManSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
          this.MTACebSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.MTAManSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.monthTrendFromTo();
        }
      }
    );
  }
  monthTrendYear() {
    console.log(this.yearTreandTO);
    this.generateMonthlyTotalAdmissions();
  }
  monthTrendFromTo() {
    if (this.monthTrendTo >= this.monthTrendFrom) {
      //this.MTA.destroy();
      // this.MonthlyTotalAdmissionsCeb = [300, 452, 700];
      //this.MonthlyTotalAdmissionsMan = [300, 435, 500];
      this.MTACategory = [];
      this.MTACeb = [];
      this.MTAMan = [];
      this.MTATotal = 0;
      for (let i = this.monthTrendFrom - 1; i <= this.monthTrendTo - 1; i++) {
        this.MTATotal += this.MTACebSet[i];
        this.MTATotal += this.MTAManSet[i];
        this.MTACategory.push(this.MTACategorySet[i]);
        this.MTACeb.push(this.MTACebSet[i]);
        this.MTAMan.push(this.MTAManSet[i]);
      }
      console.log(this.MTACategory);

      this.populateMontlyTotalAdmissions();
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
    //////////console.log('Loading dismissed!');
  }
  public async dismissLoading(): Promise<void> {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  ngOnInit() {
    this.generateMonthlyTotalAdmissions();
  }
}
