import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chh-app-is-patient-seen',
  templateUrl: './chh-app-is-patient-seen.component.html',
  styleUrls: ['./chh-app-is-patient-seen.component.scss'],
})
export class ChhAppIsPatientSeenComponent implements OnInit {
  @Output() showIsPatientSeenEventEmitter: EventEmitter<any> = new EventEmitter();
  showSelection:any;
  constructor() { }

  ngOnInit() {}
  viewtoggle1(e){
    //this.yesnoToggle = !this.yesnoToggle;
/*
    if(this.yesnoToggle){
      this.yesno = "Yes";
    }else{
      this.yesno = "No";
    }
      console.log(e.detail.checked);
      if(e.detail.checked){
        this.insCoor = "Yes";
      }else{
        this.insCoor = "No";
      }*/

      //console.log(e);
    //  console.log(e.detail.value);

      if(e.detail.value == "y"){
        this.showSelection = true;
      }else{
        this.showSelection = false;
      }

      this.showIsPatientSeenEventEmitter.emit(
        this.showSelection
      );
  }
}
