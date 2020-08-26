import { Component, OnInit, Renderer2 } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage/storage.service";
import { AuthConstants } from "../config/auth-constants";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
import { LoginData } from "../models/login-data.model";
import { BehaviorSubject } from "rxjs";
import { GoogleAnalyticsService } from "ngx-google-analytics";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})

export class Tab3Page {
  userData$ = new BehaviorSubject<any>([]);
  public logindata: LoginData;
  account: LoginData;
  isDesktop: boolean;
  darkmode: boolean = true;
  displayUserData: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private screensizeService: ScreenSizeService,
    private renderer: Renderer2,
    protected $gaService: GoogleAnalyticsService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
    this.$gaService.pageView("/Settings", "Settings Tab");
    this.authService.userData$.subscribe((res: any) => {
      console.log(res);
      this.account = <LoginData>res;
    });
    if (localStorage.getItem("darkmode") == "true") {
      this.darkmode = true;
    } else {
      this.darkmode = false;
    }
  }

  onDarkModeEnable(event: { detail: { checked: any } }) {
    if (event.detail.checked) {
      this.renderer.setAttribute(document.body, "color-theme", "dark");
      localStorage.setItem("darkmode", "true");
    } else {
      this.renderer.setAttribute(document.body, "color-theme", "light");
      localStorage.setItem("darkmode", "false");
    }
    if (this.isDesktop) {
      window.location.reload();
    }
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
      //clear behavior subject
      this.userData$.next("");
      //clear local storage
      localStorage.removeItem("_cap_userDataKey");
      //localStorage.clear();
      //window.location.reload();
      this.router.navigate(["/login"]);
    });
  }
}
