import { Component, OnInit } from "@angular/core";

@Component({
  selector: "chh-app-logo-sm",
  templateUrl: "./chh-app-logo-sm.component.html",
  styleUrls: ["./chh-app-logo-sm.component.scss"],
})

export class ChhAppLogoSmComponent implements OnInit {
  logo: any;
  constructor() {}

  ngOnInit() {
    if (localStorage.getItem("darkmode") == "true") {
      console.log("true");
      this.logo = "assets/img/orgwidelogosupergraphic.png";
    } else {
      console.log("false");
      this.logo = "assets/img/orgwidelogo.png";
    }
  }
}
