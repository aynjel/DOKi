import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '../../../shared/constants';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { UserSettingsModelv3, LoginResponseModelv3 } from 'src/app/models/doctor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import { throwIfEmpty } from 'rxjs/operators';
import { runInThisContext } from 'vm';
import { DashboardgraphComponent } from "../components/dashboardgraph/dashboardgraph.component";
/*
import * as HighCharts from "highcharts";
import More from 'highcharts/highcharts-more';
import Tree from 'highcharts/modules/treemap';
import Heatmap from 'highcharts/modules/heatmap';
More(HighCharts);
Tree(HighCharts);
Heatmap(HighCharts);*/

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
import { ModalController } from '@ionic/angular';
// Initialize exporting module.
//Exporting(HighCharts);



@Component({
  selector: 'app-tabs-dashboard',
  templateUrl: './tabs-dashboard.page.html',
  styleUrls: ['./tabs-dashboard.page.scss'],
})
export class TabsDashboardPage implements OnInit {
  isDesktop: boolean;
  userData$ = new BehaviorSubject<any>([]);
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  public logindata: LoginResponseModelv3;
  userName: any;
  totalAdmissions: any;
  totalAdmissionsC: any;
  totalAdmissionsM: any;
  totalAdmissionstoday: any;
  totalAdmissionstodayC: any;
  totalAdmissionstodayM: any;
  forDischargeC: any;
  forDischargeM: any;
  forDischarge: any;
  forDischargeV3: any;
  tTC = 'C';
  tTM = 'M';
  totalAdmissionsV3: any;
  totalAdmissionsV33: boolean = true;
  totalAdmissionsTodayV3: any;
  totalAdmissionsTodayV33: boolean = true;
  forDischargeV33: boolean = true;
  chhgreen: any = '#275228';
  chhred: any = '#d12027';
  chhtextcolor: any = '#ffffff';
  getTotalAdmissionsByDept: any;
  getTotalAdmissionsByDeptData: any;
  getTotalAdmissionsByDeptDataTM: any;

  TotalAdmissionsByDeptAndSite: any;
  TotalAdmissionsByDeptAndSiteData: any;
  TotalAdmissionsByDeptAndSiteDataTM: any;
  jsonForPopulate: any;
  dumpTotalAdmissions: any;
  criticalTV33: boolean = true;
  criticalT: any;
  criticalC: any;
  criticalM: any;
  noncriticalT: any;
  noncriticalC: any;
  noncriticalM: any;
  stackedBar: any = true;
  constructor(private storageService: StorageService,
    private router: Router,
    public constants: Constants,
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private executiveService: ExecutiveService,
    private modalController: ModalController
  ) {

    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        //window.location.reload();
      }

      this.isDesktop = isDesktop;
    });

  }


  ngOnInit() {

    this.totalAdmissions = 0;
    this.totalAdmissionsC = 0;
    this.totalAdmissionsM = 0;
    this.totalAdmissionstoday = 0;
    this.totalAdmissionstodayC = 0;
    this.totalAdmissionstodayM = 0;
    this.forDischargeC = 0;
    this.forDischargeM = 0;
    this.forDischarge = 0;


    this.totalAdmissionsV33 = true;
    this.totalAdmissionsTodayV33 = true;
    this.forDischargeV33 = true;

    ////////console.log(this.logindata);

    this.executiveService.totalAdmissionsV3().subscribe(
      (res: any) => {
        ////////console.log(res);
        this.totalAdmissionsV3 = res;
      },
      (error) => { this.totalAdmissionsV33 = false; },
      () => {

        if (this.totalAdmissionsV3) {
          this.totalAdmissionsV3.forEach(element => {
            this.totalAdmissionsV33 = false;
            this.totalAdmissions = this.totalAdmissions + element.totalAdmissions;
            if (element.site == 'C') {
              this.totalAdmissionsC = element.totalAdmissions;
            } else if (element.site == 'M') {
              this.totalAdmissionsM = element.totalAdmissions;
            }
          });
        } else {
          this.totalAdmissionsV33 = false;
          //this.totalAdmissions = this.totalAdmissionsC = this.totalAdmissionsM= 0;
        }

      }
    );

    this.totalAdmissionstoday = 0;
    this.executiveService.totalAdmissionsTodayV3().subscribe(
      (res: any) => {
        ////////console.log(res);
        this.totalAdmissionsTodayV3 = res;
      },
      (error) => { this.totalAdmissionsTodayV33 = false; },
      () => {

        if (this.totalAdmissionsTodayV3) {
          this.totalAdmissionsTodayV3.forEach(element => {
            this.totalAdmissionsTodayV33 = false;
            this.totalAdmissionstoday = this.totalAdmissionstoday + element.totalNewAdmissions;
            if (element.site == 'C') {
              this.totalAdmissionstodayC = element.totalNewAdmissions;
            } else if (element.site == 'M') {
              this.totalAdmissionstodayM = element.totalNewAdmissions;
            }
          });
        } else {
          this.totalAdmissionsTodayV33 = false;
        }

      }

    );


    this.executiveService.forDischargeV3().subscribe(
      (res: any) => {
        ////////console.log(res);
        this.forDischargeV3 = res;
      },
      (error) => { this.forDischargeV33 = false; },
      () => {

        if (this.forDischargeV3) {
          this.forDischargeV3.forEach(element => {
            this.forDischargeV33 = false;
            this.forDischarge = this.forDischarge + element.totalForDischarge;
            if (element.site == 'C') {
              this.forDischargeC = element.totalForDischarge;
            } else if (element.site == 'M') {
              this.forDischargeM = element.totalForDischarge;
            }
          });
        } else {
          this.forDischargeV33 = false;
        }



      }

    );




    let getTotalPxTypesBySite: any;
    this.criticalT = 0;
    this.noncriticalT = 0;
    this.executiveService.getTotalPxTypesBySite().subscribe(
      (res: any) => {
        ////console.log(res);

        getTotalPxTypesBySite = res;
      },
      (error) => {
        this.criticalTV33 = false;
      },
      () => {
        this.criticalTV33 = false;
        getTotalPxTypesBySite.forEach(element => {

          if ((element.site == 'C' || element.site == 'M') && element.patientType == 'Critical') {
            this.criticalT = this.criticalT + element.totalAdmissions;
            if (element.site == 'C') {
              this.criticalC = element.totalAdmissions;
            }
            if (element.site == 'M') {
              this.criticalM = element.totalAdmissions;
            }
          }
          if ((element.site == 'C' || element.site == 'M') && element.patientType == 'Non-Critical') {
            this.noncriticalT = this.noncriticalT + element.totalAdmissions;
            if (element.site == 'C') {
              this.noncriticalC = element.totalAdmissions;
            }
            if (element.site == 'M') {
              this.noncriticalM = element.totalAdmissions;
            }
          }
        });
      }

    );
    this.getTotalAdmissions();


    /*
        this.TotalAdmissionsByDeptAndSiteData = [];
        this.TotalAdmissionsByDeptAndSiteDataTM = [];
        this.executiveService.getTotalAdmissionsByDeptAndSite().subscribe(
          (res: any) => {     
           
          this.TotalAdmissionsByDeptAndSite = res;
     
          
        },
        (error) => {},
        () => {
          this.famTotal=0;this.famPer=0;this.famC = 0;this.famM = 0;
          this.inmTotal=0;this.inmPer=0;this.inmC = 0;this.inmM = 0;
    
          this.jsonForPopulate=[];
          this.TotalAdmissionsByDeptAndSite.forEach(element => {
    
              if(element.deptName == "FAM - C" || element.deptName == "FAM - M"){
                  this.famTotal = this.famTotal + element.numOfAdmissions;
                  this.famPer = (this.famTotal / this.totalAdmissions)*100;
                  if(element.deptName == "FAM - C"){
                    this.famC = element.numOfAdmissions;
                  }else{
                    this.famM = element.numOfAdmissions;
                  }
    
              }
    
          });
        }
    
        );*/




        
        this.getTotalCovidPxTypesBySite();
  }





















































  //this.callPieChart(this.getTotalAdmissionsByDeptData,'admission','Admissions by Department','Department');
  async callPieChart(data1: any, data2: any, data3: any, data4: any) {
    ////console.log(data1);

    const modal = await this.modalController.create({
      component: DashboardgraphComponent,
      cssClass: 'my-custom-css',
      componentProps: {
        'chartdata': data1,
        'type': data2,
        'title': data3,
        'seriesname': data4
      }
    });
    return await modal.present();
  }
  /*
  
     _____ ______ _______     _______    _        _                 _           _         _             
    / ____|  ____|__   __|   |__   __|  | |      | |       /\      | |         (_)       (_)            
   | |  __| |__     | |         | | ___ | |_ __ _| |      /  \   __| |_ __ ___  _ ___ ___ _  ___  _ __  
   | | |_ |  __|    | |         | |/ _ \| __/ _` | |     / /\ \ / _` | '_ ` _ \| / __/ __| |/ _ \| '_ \ 
   | |__| | |____   | |         | | (_) | || (_| | |    / ____ \ (_| | | | | | | \__ \__ \ | (_) | | | |
    \_____|______|  |_|         |_|\___/ \__\__,_|_|   /_/    \_\__,_|_| |_| |_|_|___/___/_|\___/|_| |_|
                                                                                                        
                                                                                                        
  
  */

  getTotalAdmissions() {
    this.getTotalAdmissionsByDeptData = [];
    this.executiveService.getTotalAdmissionsByDept().subscribe(
      (res: any) => {
        this.getTotalAdmissionsByDept = res;
      },
      (error) => { },
      () => {
        if (this.getTotalAdmissionsByDept) {
          this.getTotalAdmissionsByDept.forEach(element => {
            this.getTotalAdmissionsByDeptData.push({ name: element.deptName, y: element.numOfAdmissions });
          });
          ////console.log(JSON.stringify(this.getTotalAdmissionsByDeptData));
          
          this.populatePieChart();
          /*
          ////console.log(this.getTotalAdmissionsByDeptData);
          this.callPieChart(this.getTotalAdmissionsByDeptData,'admission','Admissions by Department','Department');
          */
        }
      }

    );
  }
  /*                                             
  ______ ______ ______ ______ ______ ______ ______ 
 |______|______|______|______|______|______|______|
                                                                       
  */
  populatePieChart() {


    HighCharts.setOptions({
      chart: {
        style: {
          fontFamily: "Nunito", // fontFamily: 'Inter'
        },
      },

    });
    let chart = HighCharts.chart("PieChart", {

      chart: {
        renderTo: "container",
        height: 300,
        type: "pie",
        styledMode: true,
        reflow: false
      },
      title: { text: "Admissions by Department" },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} <br /> {point.percentage:.1f} %'
          }
        }
      },
      series: [
        {
          type: undefined,
          name: "Department",
          data: this.getTotalAdmissionsByDeptData
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
    setTimeout(() => { chart.reflow() }, 300);
  }
  /*
  
  
  
    _______    _        _                 _               _____             __     __             
   |__   __|  | |      | |       /\      | |             |  __ \            \ \   / /             
      | | ___ | |_ __ _| |      /  \   __| |_ __ ___     | |__) |__ _ __     \ \_/ /__  __ _ _ __ 
      | |/ _ \| __/ _` | |     / /\ \ / _` | '_ ` _ \    |  ___/ _ \ '__|     \   / _ \/ _` | '__|
      | | (_) | || (_| | |    / ____ \ (_| | | | | | |   | |  |  __/ |         | |  __/ (_| | |   
      |_|\___/ \__\__,_|_|   /_/    \_\__,_|_| |_| |_|   |_|   \___|_|         |_|\___|\__,_|_|   
                                                                                                  
                                                                                                  
                                                                                                                        
  
  */



  getTotalAdmissionsPerYear() {

    let cvdOccupancy: any;
    let dataC = [];
    let datanonC = [];
    this.executiveService.getCovidVsNonCovidOccupancyCurrentYear().subscribe(
      (res: any) => {
        cvdOccupancy = res; //////console.log(res);

      },
      (error) => {

      },
      () => {
        this.stackedBar = false;
        let c1total = 0;
        let c2total = 0;
        let c3total = 0;
        let c4total = 0;
        let c5total = 0;
        let c6total = 0;
        let c7total = 0;
        let c8total = 0;
        let c9total = 0;
        let c10total = 0;
        let c11total = 0;
        let c12total = 0;
        let nc1total = 0;
        let nc2total = 0;
        let nc3total = 0;
        let nc4total = 0;
        let nc5total = 0;
        let nc6total = 0;
        let nc7total = 0;
        let nc8total = 0;
        let nc9total = 0;
        let nc10total = 0;
        let nc11total = 0;
        let nc12total = 0;
        cvdOccupancy.forEach(el => {




          if (el.month == 1) {
            if (el.patientType == 'Covid') { c1total = c1total + el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc1total = nc1total + el.aveOccupancy; }
          }
          if (el.month == 2) {
            if (el.patientType == 'Covid') { c2total = c2total + el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc2total = nc2total + el.aveOccupancy; }
          }
          if (el.month == 3) {
            if (el.patientType == 'Covid') { c3total += el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc3total += el.aveOccupancy; }
          }
          if (el.month == 4) {
            if (el.patientType == 'Covid') { c4total += el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc4total += el.aveOccupancy; }
          }
          if (el.month == 5) {
            if (el.patientType == 'Covid') { c5total += el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc5total += el.aveOccupancy; }
          }
          if (el.month == 6) {
            if (el.patientType == 'Covid') { c6total += el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc6total += el.aveOccupancy; }
          }
          if (el.month == 7) {
            if (el.patientType == 'Covid') { c7total += el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc7total += el.aveOccupancy; }
          }
          if (el.month == 8) {
            if (el.patientType == 'Covid') { c8total += el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc8total += el.aveOccupancy; }
          }
          if (el.month == 9) {
            if (el.patientType == 'Covid') { c9total += el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc9total += el.aveOccupancy; }
          }
          if (el.month == 10) {
            if (el.patientType == 'Covid') { c10total += el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc10total += el.aveOccupancy; }
          }
          if (el.month == 11) {
            if (el.patientType == 'Covid') { c11total += el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc11total += el.aveOccupancy; }
          }
          if (el.month == 12) {
            if (el.patientType == 'Covid') { c12total += el.aveOccupancy; }
            if (el.patientType == 'Non-Covid') { nc12total += el.aveOccupancy; }
          }

        });
        dataC.push(c1total);
        dataC.push(c2total);
        dataC.push(c3total);
        dataC.push(c4total);
        dataC.push(c5total);
        dataC.push(c6total);
        dataC.push(c7total);
        dataC.push(c8total);
        dataC.push(c9total);
        dataC.push(c10total);
        dataC.push(c11total);
        dataC.push(c12total);
        datanonC.push(nc1total);
        datanonC.push(nc2total);
        datanonC.push(nc3total);
        datanonC.push(nc4total);
        datanonC.push(nc5total);
        datanonC.push(nc6total);
        datanonC.push(nc7total);
        datanonC.push(nc8total);
        datanonC.push(nc9total);
        datanonC.push(nc10total);
        datanonC.push(nc11total);
        datanonC.push(nc12total);
        this.populateStackedBar(dataC, datanonC);

      }


    );


  }


/*
      [{
          type: 'column',
          name: 'Covid (Cebu)',
          data: [5, 3],
          stack: 'Cebu',
      }, {
        type: 'column',
          name: 'Non Covid (Cebu)',
          data: [3, 4],
          stack: 'Cebu',
      }, {
        type: 'column',
          name: 'Covid (Mandaue)',
          data: [2, 5],
          stack: 'Mandaue',
      }, {
        type: 'column',
          name: 'Non Covid (Mandaue)',
          data: [3, 4],
          stack: 'Mandaue',
      }]*/

  totalCovidPxTypesBySite:any;
  getTotalCovidPxTypesBySite() {
    let toreturn=[];
    let CCC = 0;
    let CCNC = 0;
    let CNCC = 0;
    let CNCNC = 0;
    let MCC = 0;
    let MCNC = 0;
    let MNCC = 0;
    let MNCNC = 0;
    this.totalCovidPxTypesBySite = [];
    this.executiveService.getTotalCovidPxTypesBySite().subscribe(
      (res: any) => {
        //console.log(res);
        
        this.totalCovidPxTypesBySite = res;
      },
      (error) => { },
      () => {
        this.totalCovidPxTypesBySite.forEach(el => {
            //console.log(el);
            if(el.site=='C'&& el.patientType01 == 'Critical'  && el.patientType02=='Covid' ){
              CCC = el.totalAdmissions;
            }
            if(el.site=='C' && el.patientType01 == 'Non-Critical' && el.patientType02=='Covid' ){
              CNCC = el.totalAdmissions;
            }
            if(el.site=='C' && el.patientType01 == 'Critical' && el.patientType02=='Non-Covid' ){
              CCNC = el.totalAdmissions;
            }
            if(el.site=='C' && el.patientType01 == 'Non-Critical' && el.patientType02=='Non-Covid' ){
              CNCNC = el.totalAdmissions;
            }
            if(el.site=='M' && el.patientType01 == 'Critical' && el.patientType02=='Covid' ){
              MCC = el.totalAdmissions;
            }
            if(el.site=='M' && el.patientType01 == 'Non-Critical' && el.patientType02=='Covid' ){
              MNCC = el.totalAdmissions;
            }
            if(el.site=='M' && el.patientType01 == 'Critical' && el.patientType02=='Non-Covid' ){
              MCNC = el.totalAdmissions;
            }
            if(el.site=='M' && el.patientType01 == 'Non-Critical' && el.patientType02=='Non-Covid' ){
              MNCNC = el.totalAdmissions;
            }
        });
        /*toreturn = [{
          type: 'column',
          name: 'Covid (Cebu)',
          data: [CCC, CCNC],
          stack: 'Cebu',
          color:'#83898c'
      }, {
        type: 'column',
          name: 'Non Covid (Cebu)',
          data: [CNCC, CNCNC],
          stack: 'Cebu',
          color:'#27aae1'
      }, {
        type: 'column',
          name: 'Covid (Mandaue)',
          data: [MCC, MCNC],
          stack: 'Mandaue',
          color:'#ffdd21'
      }, {
        type: 'column',
          name: 'Non Covid (Mandaue)',
          data: [MNCC, MNCNC],
          stack: 'Mandaue',
          color:'#009444'
      }];*/
      toreturn = [
        {
          type: 'column',
            name: 'Critical | Non-Covid',
            data: [CCNC, MCNC],
            stack: 'Non-Covid',
            color:'#27aae1'
        },{
        type: 'column',
        name: 'Critical | Covid',
        data: [CCC, MCC],
        stack: 'Covid',
        color:'#FFA500'
    },   {
      type: 'column',
        name: 'Non-Critical | Non-Covid',
        data: [CNCNC, MNCNC],
        stack: 'Non-Covid',
        color:'#009444'
    },{
      type: 'column',
        name: 'Non-Critical | Covid',
        data: [CNCC, MNCC],
        stack: 'Covid',
        color:'#FFA500'
    }];
      this.populateBasicBar(toreturn);



        
      }

    );
  }

  populateBasicBar(data:any){
    HighCharts.setOptions({
      chart: {
        style: {
          fontFamily: "Nunito", // fontFamily: 'Inter'
        },
      },

    });
    
    let chartxxx = HighCharts.chart("BasicBar", {
      chart: {
        renderTo: "container",
        type: "column",
      },    
   
        title: {
            text: 'Total Admissions per Patient type'
        },
    
        xAxis: {
          categories: ['Cebu', 'Mandaue',]
      },
    
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: ''
            }
        },
  
        tooltip: {
            formatter: function () {
              var stackName = this.series.userOptions.stack;
              return '<b>' + this.x + '</b><br/>' +
                  this.series.name + ': ' + this.y + '<br/>' +
                  'Total: ' +  this.total;
            }
        },
    
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: data,
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
    setTimeout(() => { chartxxx.reflow() }, 1000);
  }













  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  settings() {
    this.router.navigate(['/executive/settings']);
  }
  ionViewWillEnter() {

  }

  famTotal: any; famPer: any; famC: any; famM: any;
  inmTotal: any; inmPer: any; inmC: any; inmM: any;
  checkInput() {
    this.doctorService.refreshTokenV3().subscribe((res: any) => {
      ////////console.log(res);
    });
  }

  detail(type: any,site:any) {

    //////console.log(data);
    //this.getTotalCovidPxTypesBySite(type,site);
  }

  /*treeMap1(){
    HighCharts.chart('TreeMap1', {
      chart: {
        renderTo: "container",
        styledMode: true,
      },
      series: [{
        type: "treemap",
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        levels: [{
          level: 1,
          layoutAlgorithm: 'sliceAndDice',
          dataLabels: {
            enabled: true,
            align: 'left',
            verticalAlign: 'top',
            style: {
              fontSize: '12px'
            }
          }
        }],
        data: [{
          id: 'A',
          name: 'IM',
          color: "#013759"
        }, {
          id: 'B',
          name: 'PEDIA',
          color: "#c5f5f0 "
        }, {
          id: 'C',
          name: 'SUR',
          color: '#EC9800'
        },{
          id: 'D',
          name: 'OBG',
          color: "#EC2500"
        }, {
          id: 'E',
          name: 'FAM',
          color: "#ECE100"
        }, {
          id: 'F',
          name: 'ORT',
          color: '#EC9800'
        }, {
          name: 'Cebu',
          parent: 'A',
          value: 5
        }, {
          name: 'mandaui',
          parent: 'A',
          value: 3
        }, {
          name: 'Peter',
          parent: 'A',
          value: 4
        }, {
          name: 'Anne',
          parent: 'B',
          value: 4
        }, {
          name: 'Rick',
          parent: 'B',
          value: 10
        }, {
          name: 'Peter',
          parent: 'B',
          value: 1
        }, {
          name: 'Anne',
          parent: 'O',
          value: 1
        }, {
          name: 'Rick',
          parent: 'O',
          value: 3
        }, {
          name: 'Peter',
          parent: 'O',
          value: 3
        }, {
          name: 'Susanne',
          parent: 'Kiwi',
          value: 2,
          color: '#9EDE00'
        }]
      }],
      title: {
        text: 'Admissions by Department'
      }
    });
  }
  treeMap(){

    HighCharts.chart("TreeMap", {

      chart: {
        renderTo: "container",
        type: "treemap",
        styledMode: true,
      },
      colorAxis: {
        minColor: '#FFFFFF',
        maxColor: '#009444',
      },
      series: [
        {
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          data: [{"name":"FAM","value":14,"colorValue":1},{"name":"INM","value":187,"colorValue":187},{"name":"OBG","value":27,"colorValue":27},{"name":"ORT","value":12,"colorValue":12},{"name":"PED","value":39,"colorValue":39},{"name":"SUR","value":33,"colorValue":33}],
        },
      ],
      title: {
        text: 'Admissions by Department',
      },
    });
  }*/

  populateStackedBar(datax: any, datay: any) {
    let chart = HighCharts.chart("stackedBar", {
      chart: {
        renderTo: "container",
        type: "column",
      },

      title: {
        text: 'Covid & Non-Covid Graph'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
          }
        }
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: HighCharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Percentage : {point.percentage:.1f}% <br/>Total: {point.stackTotal}'
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          },

        }
      },
      /*series: [{
          name: 'John',
          data: [5, 3, 4, 7, 2]
        }, {
          name: 'Jane',
          data: [2, 2, 3, 2, 1]
        }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
      }]*/
      series: [
        {
          type: 'column',
          name: 'Non-Covid',
          data: datay
        },
        {
          type: 'column',
          name: 'Covid',
          data: datax
        },
      ],
      credits: { enabled: false },
    });
    setTimeout(() => { chart.reflow() }, 1000);
  }
}
