import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { ScreenSizeService } from "../../services/screen-size/screen-size.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Constants } from "../../shared/constants";
import { FunctionsService } from "../../shared/functions/functions.service";
import { Variables } from "../../shared/variables";
import { throwError } from "rxjs";
import { Console } from "console";

@Component({
  selector: 'app-chh-app-hospital-selector-with-all-and-filter-ed',
  templateUrl: './chh-app-hospital-selector-with-all-and-filter-ed.component.html',
  styleUrls: ['./chh-app-hospital-selector-with-all-and-filter-ed.component.scss'],
})
export class ChhAppHospitalSelectorWithAllAndFilterEdComponent implements OnInit {
  active = true;
  active1 = false;
  active2 = false;
  active3 = false;
  currenturl: any;
  isDesktop: boolean;

  public admittedOrDischarge = "All";

  @Output() hospital: EventEmitter<any> = new EventEmitter();
  @Output() inPatientMode: EventEmitter<any> = new EventEmitter();
  constructor(
    private router: Router,
    private screensizeService: ScreenSizeService,
    private location: Location,
    public constants: Constants,
    public functionsService: FunctionsService,
    public variables: Variables
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });

    if (this.isDesktop) {
      router.events.subscribe((val) => {
        if (location.path().trim() == "/menu/er-patients") {
          this.admittedOrDischarge = "All";
        } else if (location.path().trim() == "/menu/er-patients/RE") {
          this.admittedOrDischarge = "RE";
        } else if (location.path().trim() == "/menu/er-patients/ED") {
          this.admittedOrDischarge = "ED";
        }
        this.admittedOrDischarge = this.variables.tempSelection;
      });
    }
  }

  ngOnInit() {
    //this.admittedOrDischarge = this.variables.tempSelection;
  }

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
  onSubmit1(data1: any, data2: boolean) {
    if (data1 == this.constants.CHH_SITE__VALUE__ALL /*"ALL"*/) {
      //localStorage.setItem("navigateInpatient", "ALL");
      this.inPatientMode.emit("ALL");
      /*this.router.navigate(["/menu/er-patients"]).then(() => {
        window.location.reload();
      });*/
    } else if (
      data1 == this.constants.ADMISSION_STATUS__CODE__FOR_REGISTERED /*"RE"*/
    ) {
      this.inPatientMode.emit("RE");
      //localStorage.setItem("navigateInpatient", "RE");
      /*this.router.navigate(["/menu/er-patients/RE"]).then(() => {
        window.location.reload();
      });*/
    } else if (
      data1 == this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE_ED /*"ED"*/
    ) {
      this.inPatientMode.emit("ED");
      //localStorage.setItem("navigateInpatient", "ED");
      /*this.router.navigate(["/menu/er-patients/ED"]).then(() => {
        window.location.reload();
      });*/
    }
  }
  changeRedirect(event: any) {
    this.functionsService.logToConsole("1");

    this.variables.tempSelection = this.admittedOrDischarge;

    if (this.admittedOrDischarge.trim() == "All") {
      this.inPatientMode.emit("ALL");
      /*this.router.navigate(["/menu/in-patients"]).then(() => {
        window.location.reload();
      });*/
    } else if (this.admittedOrDischarge.trim() == "RE") {
      this.inPatientMode.emit("RE");
      /*this.router.navigate(["/menu/in-patients/RE"]).then(() => {
        window.location.reload();
      });*/
    } else if (this.admittedOrDischarge.trim() == "ED") {
      this.inPatientMode.emit("ED");
      /*this.router.navigate(["/menu/in-patients/ED"]).then(() => {
        window.location.reload();
      });*/
    }

    //this.variables.tempCounter++;

    //this.functionsService.logToConsole(this.variables.tempCounter+" COUNTER " + this.admittedOrDischarge);
  }
}
