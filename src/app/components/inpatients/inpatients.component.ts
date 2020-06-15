import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-inpatients',
  templateUrl: './inpatients.component.html',
  styleUrls: ['./inpatients.component.scss'],
})
export class InpatientsComponent implements OnInit {
  @Input() accountItem;
  constructor() { }

  ngOnInit() {}

}
