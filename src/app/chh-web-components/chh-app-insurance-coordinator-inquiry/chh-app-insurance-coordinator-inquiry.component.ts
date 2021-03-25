import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chh-app-insurance-coordinator-inquiry',
  templateUrl: './chh-app-insurance-coordinator-inquiry.component.html',
  styleUrls: ['./chh-app-insurance-coordinator-inquiry.component.scss'],
})
export class ChhAppInsuranceCoordinatorInquiryComponent implements OnInit {
  showSeenPatient:any;
  @Output() showSeenPatientEventEmitter: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {}
  viewtoggle(e){
      if(e.detail.value == "y"){
        this.showSeenPatient = true;
      }else if(e.detail.value == "n"){
        this.showSeenPatient = true;
      }else{
        this.showSeenPatient = false;
      }
      this.showSeenPatientEventEmitter.emit(
        this.showSeenPatient
      );
  }
}
