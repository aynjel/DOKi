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
  @Input() site: any = "";
  @Input() CvdnCvd: any =""; 
  constructor() { }


  dataC:any=[];
  ngOnInit() {
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


 
}
