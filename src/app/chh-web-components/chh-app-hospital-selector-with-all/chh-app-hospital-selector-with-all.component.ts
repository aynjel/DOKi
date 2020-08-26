import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ScreenSizeService } from "../../services/screen-size/screen-size.service";

@Component({
  selector: "chh-app-hospital-selector-with-all",
  templateUrl: "./chh-app-hospital-selector-with-all.component.html",
  styleUrls: ["./chh-app-hospital-selector-with-all.component.scss"],
})

export class ChhAppHospitalSelectorWithAllComponent implements OnInit {
  active: boolean = false;
  active1: boolean = false;
  active2: boolean = false;
  active3: boolean = true;
  currenturl: any;
  isDesktop: boolean;
  filter: any = "All";
  @Output() hospital: EventEmitter<any> = new EventEmitter();
  constructor(
    private router: Router,
    private screensizeService: ScreenSizeService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {}

  onSubmit(data1: any, data2: boolean) {
    if (data1 == "C") {
      this.active = true;
      this.active1 = false;
      this.active3 = false;
    }
    if (data1 == "M") {
      this.active = false;
      this.active1 = true;
      this.active3 = false;
    }
    if (data1 == "A") {
      this.active = false;
      this.active1 = false;
      this.active3 = true;
    }
    if (data1 == "ALL") {
      console.log(this.currenturl);
      if (this.currenturl != data1) {
        this.currenturl = data1;
        this.router.navigate(["/menu/in-patients"]);
      }
    } else if (data1 == "AC") {
      this.router.navigate(["/menu/in-patientsAC"]);
    } else if (data1 == "DN") {
      this.router.navigate(["/menu/in-patientsDN"]);
    }
    this.hospital.emit(data1);
  }

  redirect() {}
}
