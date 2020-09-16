import { Component, OnInit, Renderer2 } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage/storage.service";
import { AuthConstants } from "../config/auth-constants";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
import { LoginData } from "../models/login-data.model";
import { BehaviorSubject } from "rxjs";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { Constants } from "../shared/constants";
import { FunctionsService } from "../shared/functions/functions.service";

@Component({
  selector: "app-tab-settings",
  templateUrl: "tab-settings.page.html",
  styleUrls: ["tab-settings.page.scss"],
})

export class TabSettingsPage {
  userData$ = new BehaviorSubject<any>([]);
  public logindata: LoginData;
  account: LoginData;
  isDesktop: boolean;
  darkmode: boolean = true;
  displayUserData: any;
  dr_name:any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private screensizeService: ScreenSizeService,
    private renderer: Renderer2,
    protected $gaService: GoogleAnalyticsService,
    public constants: Constants,
    public functionsService: FunctionsService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {

    this.$gaService.pageView('/Settings', 'Settings Tab');
    this.logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_name = this.logindata[0].last_name;
    this.$gaService.event('Settings','User Flow',this.dr_name);
    this.authService.userData$.subscribe((res: any) => {
      this.functionsService.logToConsole(res);
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
      localStorage.setItem('darkmode','true');
          this.$gaService.event('Settings - Dark Mode True','User Flow',this.dr_name);
    } else {
      this.renderer.setAttribute(document.body, "color-theme", "light");
      localStorage.setItem('darkmode','false');
      this.$gaService.event('Settings - Dark Mode False','User Flow',this.dr_name);
    }
    //if(this.isDesktop){window.location.reload();}
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
