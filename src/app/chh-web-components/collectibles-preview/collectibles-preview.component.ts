import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'collectibles',
  templateUrl: './collectibles-preview.component.html',
  styleUrls: ['./collectibles-preview.component.scss'],
})
export class CollectiblesPreviewComponent implements OnInit {
  @Input() netpf;
  @Input() name;
  @Input() namePHIC;
  @Input() amountPHIC;
  @Input() amountREADERS;
  @Input() collection_date;
  @Input() dataCollection;
  showMore: boolean = true;
  account_no;
  reference_no;
  paymentMethod;
  amounttt;
  surcharge;
  first_case;
  first_case_desc;
  admission_date;
  unit_gd;
  procedure;
  disc_amount;
  constructor() {}

  ngOnInit() {
    if (this.dataCollection.amount != undefined) {
      this.netpf = this.dataCollection.amount;
    } else if (this.dataCollection.philhealth_amount != undefined) {
      this.netpf = this.dataCollection.philhealth_amount;
    } else if (this.dataCollection.net_rfee != undefined) {
      this.netpf = this.dataCollection.net_rfee;
    }

    if (this.dataCollection.name != undefined) {
      this.name = this.dataCollection.name;
    } else if (this.dataCollection.patient_name != undefined) {
      this.name = this.dataCollection.patient_name;
    }

    if (this.dataCollection.collection_date != undefined) {
      this.collection_date = this.dataCollection.collection_date;
    } else if (this.dataCollection.charge_date != undefined) {
      this.collection_date = this.dataCollection.charge_date;
    } else if (this.dataCollection.collected_dt != undefined) {
      this.collection_date = this.dataCollection.collected_dt;
    }
    this.account_no = this.dataCollection.account_no;
    this.paymentMethod = this.dataCollection.short_desc;
    this.amounttt = this.netpf;
    this.surcharge = this.dataCollection.surcharge;

    this.first_case = this.dataCollection.first_case;
    this.first_case_desc = this.dataCollection.first_case_desc;
    this.admission_date = this.dataCollection.admission_date;
    this.reference_no = this.dataCollection.reference_no;
    this.unit_gd = this.dataCollection.unit_gd;
    this.procedure = this.dataCollection.procedure;
    this.disc_amount = this.dataCollection.disc_amount;
  }

  showmore() {
    this.showMore = !this.showMore;
    console.log(this.showMore);
  }
}
