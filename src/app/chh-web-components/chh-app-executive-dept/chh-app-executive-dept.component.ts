import { Component, OnInit } from '@angular/core';
import {  Input } from '@angular/core';
@Component({
  selector: 'app-chh-app-executive-dept',
  templateUrl: './chh-app-executive-dept.component.html',
  styleUrls: ['./chh-app-executive-dept.component.scss'],
})
export class ChhAppExecutiveDeptComponent implements OnInit {
  chhgreen :any = '#275228';
  chhred : any = '#d12027';
  chhtextcolor:any = '#ffffff';
  tTC = 'C';
  tTM = 'M';
  @Input() name: any;
  @Input() total: any;
  @Input() percentage: any;
  @Input() cebu: any;
  @Input() mandaue: any;
  constructor() { }

  ngOnInit() {}

}
