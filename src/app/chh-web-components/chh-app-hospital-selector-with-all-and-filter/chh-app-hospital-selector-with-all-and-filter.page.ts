import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { ScreenSizeService } from "../../services/screen-size/screen-size.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Constants } from "../../shared/constants";
import { FunctionsService } from "../../shared/functions/functions.service";

@Component({
  selector: "chh-app-hospital-selector-with-all-and-filter",
  templateUrl: "./chh-app-hospital-selector-with-all-and-filter.page.html",
  styleUrls: ["./chh-app-hospital-selector-with-all-and-filter.page.scss"],
})

export class ChhAppHospitalSelectorWithAllAndFilterPage implements OnInit {
  active: boolean = false;
  active1: boolean = false;
  active2: boolean = false;
  active3: boolean = true;
  currenturl: any;
  isDesktop: boolean;
  admittedOrDischarge: any = "All";
  @Output() hospital: EventEmitter<any> = new EventEmitter();
  constructor(
    private router: Router,
    private screensizeService: ScreenSizeService,
    private location: Location,
    public constants: Constants,
    public functionsService: FunctionsService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });

    if (this.isDesktop) {
      router.events.subscribe((val) => {
        if (location.path() == "/menu/in-patients") {
          this.admittedOrDischarge = "ALL";
        } else if (location.path() == "/menu/in-patients/AC") {
          this.admittedOrDischarge = "AC";
        } else if (location.path() == "/menu/in-patients/DN") {
          this.admittedOrDischarge = "DN";
        }
      });
    }
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
    this.hospital.emit(data1);
  }

  changeRedirect(event: any) {
    if (this.admittedOrDischarge == "ALL") {
      this.router.navigate(["/menu/in-patients"]);
    } else if (this.admittedOrDischarge == "AC") {
      this.router.navigate(["/menu/in-patients/AC"]);
    } else if (this.admittedOrDischarge == "DN") {
      this.router.navigate(["/menu/in-patients/DN"]);
    }
  }
}
