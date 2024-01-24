import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-professional-fee-er-summary-patient-info',
  templateUrl: './professional-fee-er-summary-patient-info.component.html',
  styleUrls: ['./professional-fee-er-summary-patient-info.component.scss'],
})
export class ProfessionalFeeErSummaryPatientInfoComponent implements OnInit {
  moreOrLess: boolean = false;
  @Input() display: boolean;
  @Input() data;
  @Input() site;
  @Input() is_pwd;
  @Input() is_senior;
  @Input() dateAdmitted;
  @Input() data1;
  @Input() withVat;
  @Input() payvenueTxt;
  @Input() is_philhealth_membership;
  @Input() patientDetailfromApi;
  @Input() patientDetailfromApi_from;
  @Input() patientDetailfromApi_to;
  @Input() admission_status;
  constructor() {}

  ngOnInit() {
    // console.log('this.data', this.data);
  }
  moreorless(data) {
    this.moreOrLess = !data;
  }
}
