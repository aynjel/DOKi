import { Component, OnInit, Input } from '@angular/core';
import { FunctionsService } from 'src/app/shared/functions/functions.service';

@Component({
  selector: 'patientName',
  templateUrl: './patient-name.component.html',
  styleUrls: ['./patient-name.component.scss'],
})
export class PatientNameComponent implements OnInit {
  @Input() patient_name: any;
  @Input() patient_no: any;
  @Input() account_no: any;
  @Input() ap_name: any;
  @Input() dateCreated: any;
  @Input() wholeJson: any;
  @Input() age: any;
  @Input() birthday: any;
  @Input() room_no;
  moreOrLess: boolean = false;
  constructor(private functionService: FunctionsService) {}
  date;
  time;
  ngOnInit() {
    console.log(this.dateCreated);

    this.date = this.functionService.getDateYYYYMMDD(this.dateCreated);
    this.time = this.functionService.getFormatAMPM(this.dateCreated);
  }
  moreorless(data) {
    this.moreOrLess = data;
  }
}
