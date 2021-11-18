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
  @Input() chartdata: any;
  @Input() type: any;
  @Input() title: any;
  @Input() seriesname: any; 
  constructor() { }

  ngOnInit() {

      console.log(JSON.stringify(this.chartdata));
      
      this.populatepichart();

  }


  populatepichart(){
    HighCharts.setOptions({
      chart: {
        style: {
          fontFamily: "Nunito", // fontFamily: 'Inter'
        },
      },
      
    });
    let chart = HighCharts.chart("admissionByDepartment", {

      chart: {
        renderTo: "container",
        height: 300,
        type: "pie",
        styledMode: true,
      },
      title: { text: this.title },
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
          name: this.seriesname,
          data: [
            {"name":"Covid","y":2},
            {"name":"Non-Covid","y":26},
            {"name":"Covid Non-Critical Cebu","y":6},
            {"name":"Non-Covid Critical Cebu","y":178},
            {"name":"Non-Covid Critical Man","y":6},
            {"name":"Non-Covid Non-Critical Man","y":33}]
        },
      ],

      credits: { enabled: false },
    });
    setTimeout(() => { chart.reflow()}, 100);
  }

}
