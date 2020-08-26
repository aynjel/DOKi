import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { ScreenSizeService } from "../../services/screen-size/screen-size.service";

@Component({
  selector: "chh-app-error-404",
  templateUrl: "./chh-app-error-404.page.html",
  styleUrls: ["./chh-app-error-404.page.scss"],
})

export class ChhAppError404Page implements OnInit {
  isDesktop: boolean;
  constructor(private screensizeService: ScreenSizeService) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {}
}
