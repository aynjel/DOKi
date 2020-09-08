import { Component, OnInit } from "@angular/core";
import { FunctionsService } from "../../shared/functions/functions.service";

@Component({
  selector: "chh-app-logo-sm",
  templateUrl: "./chh-app-logo-sm.component.html",
  styleUrls: ["./chh-app-logo-sm.component.scss"],
})

export class ChhAppLogoSmComponent implements OnInit {
  logo: any;
  constructor(public functionsService: FunctionsService) {}

  ngOnInit() {
    if (localStorage.getItem("darkmode") == "true") {
      this.functionsService.logToConsole("true");
      this.logo = "assets/img/orgwidelogosupergraphic.png";
    } else {
      this.functionsService.logToConsole("false");
      this.logo = "assets/img/orgwidelogo.png";
    }
  }
}
