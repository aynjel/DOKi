import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { ScreensizeService } from "../../services/screensize.service";

@Component({
  selector: "chh-app-error-404",
  templateUrl: "./chh-app-error-404.page.html",
  styleUrls: ["./chh-app-error-404.page.scss"],
})

export class ChhAppError404Page implements OnInit {
  isDesktop: boolean;
  constructor(private screensizeService: ScreensizeService) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {}
}
