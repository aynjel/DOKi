import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "chh-app-hospital",
  templateUrl: "./chh-app-hospital.component.html",
  styleUrls: ["./chh-app-hospital.component.scss"],
})

export class ChhAppHospitalComponent implements OnInit {
  active: boolean = true;
  active1: boolean = false;
  @Output() hospital: EventEmitter<any> = new EventEmitter();
  @Input() readonlyComp: boolean;
  @Input() Activator: any;
  constructor() {
  }

  ngOnInit() {
    if (this.Activator == "C") {
      this.active = true;
      this.active1 = false;
    }
    if (this.Activator == "M") {
      this.active = false;
      this.active1 = true;
    }
  }
  
  onSubmit(data1: any, data2: boolean) {
    if (data1 == "C") {
      this.active = true;
      this.active1 = false;
    }
    if (data1 == "M") {
      this.active = false;
      this.active1 = true;
    }
    this.hospital.emit(data1);
  }
}
