import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pfhelper',
  templateUrl: './professional-fee-helper.component.html',
  styleUrls: ['./professional-fee-helper.component.scss'],
})
export class ProfessionalFeeHelperComponent implements OnInit {
  @Input() InsurancePlusPhilhealth;
  @Input() txtInsurancePF;
  @Input() txtInsuranceVAT;
  @Input() InsurancePF;

  @Input() Philhealth;
  @Input() txtPhilHealthPF;
  @Input() txtPhilHealthVAT;

  @Input() PersonalPlusPhilhealth;
  @Input() txtPersonalPhilHealthPF;
  @Input() txtPersonalPhilHealthVAT;
  @Input() PersonalPhilhealthPF;
  constructor() {}

  ngOnInit() {}
}
