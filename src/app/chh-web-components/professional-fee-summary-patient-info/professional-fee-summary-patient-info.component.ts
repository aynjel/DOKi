import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pfSummaryPxInfo',
  templateUrl: './professional-fee-summary-patient-info.component.html',
  styleUrls: ['./professional-fee-summary-patient-info.component.scss'],
})
export class ProfessionalFeeSummaryPatientInfoComponent implements OnInit {
  moreOrLess: boolean = false;
  @Input() data;
  @Input() site;
  @Input() is_pwd;
  @Input() is_senior;
  @Input() dateAdmitted;
  @Input() data1;
  @Input() withVat;
  @Input() payvenueTxt;
  @Input() is_philhealth_membership;
  constructor() {}

  ngOnInit() {}
  moreorless(data) {
    this.moreOrLess = !data;
  }
}
