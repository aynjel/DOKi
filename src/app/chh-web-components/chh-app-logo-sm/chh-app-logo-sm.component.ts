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

  
  }
}
