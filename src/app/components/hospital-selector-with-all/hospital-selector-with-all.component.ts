import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-hospital-selector-with-all',
  templateUrl: './hospital-selector-with-all.component.html',
  styleUrls: ['./hospital-selector-with-all.component.scss'],
})
export class HospitalSelectorWithAllComponent implements OnInit {
  active:boolean = false;
  active1:boolean = false;
  active3:boolean = true;
  @Output() hospital: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {} 
  onSubmit(data1:any,data2:boolean) {
    if(data1 == "C"){
      this.active = true;
      this.active1 = false;
      this.active3 = false;
    }
    if(data1 == "M"){
      this.active = false;
      this.active1 = true;
      this.active3 = false;
    }
    if(data1 == "A"){
      this.active = false;
      this.active1 = false;
      this.active3 = true;
    }
    this.hospital.emit(data1);
  }

}
