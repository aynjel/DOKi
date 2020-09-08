import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "chh-app-start",
  templateUrl: "./chh-app-start.component.html",
  styleUrls: ["./chh-app-start.component.scss"],
})

export class ChhAppStartComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToLoginPage() {
    this.router.navigate(["login"]);
  }
}
