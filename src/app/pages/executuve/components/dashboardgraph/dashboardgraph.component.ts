import { Component, OnInit,Input } from '@angular/core';

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
  selector: 'app-dashboardgraph',
  templateUrl: './dashboardgraph.component.html',
  styleUrls: ['./dashboardgraph.component.scss'],
})
export class DashboardgraphComponent implements OnInit {
  @Input() data: any;
  @Input() CritnCrit: any = "";
  @Input() CritnCritcnt: any = 0;
  @Input() site: any = "";
  @Input() CvdnCvd: any =""; 
  cebuCovid:any;
  cebuCovidTotal:any =0;
  cebuNonCovid:any;
  cebuNonCovidTotal:any =0;
  ManCovid:any;
  ManCovidTotal:any =0;
  ManNonCovid:any;
  ManNonCovidTotal:any =0;
  constructor(private modalController:ModalController) { }

  fullsite:any;
  fullCvdnCvd:any = "";
  dataC:any=[];
  ngOnInit() {
    if(this.site == "C"){
      this.fullsite = " | Cebu";
    }else if(this.site == "M"){
      this.fullsite = " | Mandaue";
    }else{
      this.fullsite = "";
    }
    if(this.CvdnCvd != ""){this.fullCvdnCvd = "("+this.CvdnCvd+")";}
    
    
    this.cebuCovid = [];
    this.cebuCovidTotal = 0;
    this.cebuNonCovid=[];
    this.cebuNonCovidTotal=0;

    this.ManCovid = [];
    this.ManCovidTotal = 0;
    this.ManNonCovid=[];
    this.ManNonCovidTotal=0;
    this.data.forEach(el => {
      if(el.patientType1 == this.CritnCrit){
        if(el.patientType2 == 'Covid' && el.site=='C'){
          this.cebuCovid.push({name:el.station,x:el.totalAdmissions});
          this.cebuCovidTotal += el.totalAdmissions;
        }
        if(el.patientType2 == 'Non-Covid' && el.site=='C'){
          this.cebuNonCovid.push({name:el.station,x:el.totalAdmissions});
          this.cebuNonCovidTotal += el.totalAdmissions;
        }
        if(el.patientType2 == 'Covid' && el.site=='M'){
          this.ManCovid.push({name:el.station,x:el.totalAdmissions});
          this.ManCovidTotal += el.totalAdmissions;
        }
        if(el.patientType2 == 'Non-Covid' && el.site=='M'){
          this.ManNonCovid.push({name:el.station,x:el.totalAdmissions});
          this.ManNonCovidTotal += el.totalAdmissions;
        }
      }
    });
    
/*
      console.log(this.data);
      
      console.log("CritnCrit : "+this.CritnCrit);
      console.log("site : "+this.site);     
      console.log("CvdnCvd : "+this.CvdnCvd);

*/
      this.data.forEach(el => {
        
        if(this.site == "" && this.CvdnCvd == ""){
          if(el.patientType1 == this.CritnCrit ){
            //console.log(el);

          }
        }
      });
      

  }
  closemodal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

 
}
