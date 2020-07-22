import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ScreensizeService } from '../services/screensize.service';
import { StorageService } from '../services/storage.service';
import {LoginData} from '../models/logindata.model';
import { DoctorService } from '../services/doctor.service';
import * as HighCharts from 'highcharts';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userData$ = new BehaviorSubject<any>([]);
  displayUserData : any;
  isDesktop: boolean;
  dr_code = "";
  first_name = "";
  lineChartxAxisForYear:any;
  lineChartyAxisForYear:any;
  lineChartxAxisForMonth:any;
  lineChartyAxisForMonth:any;
  totalAdmitted:any = 0;
  totalForDischarge:any = 0;
  admitted = "A";
  discharge = "D";
  getTotalCount = {Admitted: "0", ForDischarge: "0", Total: "0"};
  public logindata:LoginData;
  constructor(
    private authService:AuthService,
    private screensizeService: ScreensizeService,
    private storageService:StorageService,
    private doctorService:DoctorService,
    private router:Router) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {window.location.reload();}this.isDesktop = isDesktop;
    });
    
  }

  lineChartPopulationForYear(){

    HighCharts.chart('lineChartForYear',{
      chart: {height: 300,type: 'areaspline'},
      title: {text: '1 Year Average'},
      xAxis: {categories: this.lineChartxAxisForYear},
      yAxis: {title: {text: ''}},
      plotOptions: {line: {dataLabels: {enabled: true},enableMouseTracking: false}},
      series: [{type: undefined,name: 'Total Patients',data: this.lineChartyAxisForYear}],
      responsive: {
        rules: [
          {
            condition: {
              minWidth: 300
            },
            chartOptions: {
              legend: 
                {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
            }
        }]},
      credits: {enabled: false}
    });
              
  }

  lineChartPopulationForMonth(){

    HighCharts.chart('lineChartForMonth',{
      chart: {height: 300,type: 'column'},
      title: {text: '1 Month Average'},
      xAxis: {categories: this.lineChartxAxisForMonth},
      yAxis: {title: {text: ''}},
      plotOptions: {
        line: {dataLabels: {enabled: true},enableMouseTracking: false},
        column: {
          borderRadius: 5
      }
      },
      series: [{type: undefined,name: 'Total Patients',data: this.lineChartyAxisForMonth}],
      responsive: {rules: [{condition: {minWidth: 300},chartOptions: {legend: {layout: 'horizontal',align: 'center',verticalAlign: 'bottom'}}}]},
      credits: {enabled: false}
    });
              
  }

  ngOnInit() {
    /*this.authService.userData$.subscribe(
      (res:any) => {
        this.logindata = <LoginData>res;
      }
    );*/

    
  }
  goto(data){
    this.router.navigate(['/menu/in-patients'+data]);
    
  }
  ionViewWillEnter(){
    if(!this.dr_code){
      this.logindata = <LoginData>this.authService.userData$.getValue();
      this.dr_code = this.logindata[0].dr_code;
      this.first_name = this.camelCase(this.logindata[0].first_name);
    }
    let catego=[];
    let totalPatient=[];
    this.doctorService.getYearHistoryGraph(this.dr_code).subscribe(
      (res: any) => {
        var count = Object.keys(res).length / 2;
        let month:any;
        let monthValue:any;
        for(let i=1; i<=count;i++){
          month = "Month"+i;
          monthValue = "Month"+i+"Value";
          catego.push(res[month]);
          totalPatient.push(Number(res[monthValue]));
        }
      },error =>{
      },
      () => {
        this.lineChartxAxisForYear = catego;
        this.lineChartyAxisForYear = totalPatient;
        this.lineChartPopulationForYear();
      });
      let Day=[];
      let DayValue=[];
      this.doctorService.MonthHistoryGraph(this.dr_code).subscribe(
        (res: any) => {
          let x = JSON.stringify(res);
          x = x.replace("[", "").replace("]", "");
          //x = x.replace("]", "");
          
          x = JSON.parse(x);
  
          var count = Object.keys(x).length/2;
          let month:any = "";
          let monthValue:any ="";
          for(let i=1; i<=count;i++){
            month = "Day"+i;
            monthValue = "Day"+i+"Value";
            console.log(x[month]+' - '+x[monthValue]);
            Day.push(x[month]);
            DayValue.push(Number(x[monthValue]));
          }
        },error =>{
        },
        () => {
          this.lineChartxAxisForMonth = Day;
          this.lineChartyAxisForMonth = DayValue;
          this.lineChartPopulationForMonth();
        });
      this.doctorService.getTotalCount(this.dr_code).subscribe(
        (res: any) => {if(res){this.getTotalCount = res;}},
        error =>{},() => {});


  }
  camelCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
  }
}
