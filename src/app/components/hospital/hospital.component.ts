import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
})
export class HospitalComponent implements OnInit {
  active:boolean = true;
  active1:boolean = false;
  @Output() hospital: EventEmitter<any> = new EventEmitter();
  @Input() readonlyComp: boolean;
  @Input() Activator: any;
  constructor() { console.log("Activator 1"+this.Activator); }

  ngOnInit() {
    console.log("Activator "+this.Activator);
    if(this.Activator == "C"){
      this.active = true;
      this.active1 = false;
    }
    if(this.Activator == "M"){
      this.active = false;
      this.active1 = true;
    }
  }
  onSubmit(data1:any,data2:boolean) {
    if(data1 == "C"){
      this.active = true;
      this.active1 = false;
    }
    if(data1 == "M"){
      this.active = false;
      this.active1 = true;
    }
    this.hospital.emit(data1);
  }
}
