import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pfsummary',
  templateUrl: './professional-fee-summary-texts.component.html',
  styleUrls: ['./professional-fee-summary-texts.component.scss'],
})
export class ProfessionalFeeSummaryTextsComponent implements OnInit {
  @Input() payvenueN: any;
  @Input() data1: any;
  @Input() withVatN: any;
  constructor() {}

  ngOnInit() {}
}
