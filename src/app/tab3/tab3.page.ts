import { Component, OnInit, Renderer2 } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage.service";
import { AuthConstants } from "../config/auth-constants";
import { ScreensizeService } from "../services/screensize.service";
import { LoginData } from "../models/logindata.model";
import { BehaviorSubject } from "rxjs";
import { GoogleAnalyticsService } from 'ngx-google-analytics';
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
  darkmode:boolean = true;
  displayUserData: any;
  dr_name:any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private screensizeService: ScreensizeService,
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
    this.$gaService.pageView('/Settings', 'Settings Tab');
    this.logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_name = this.logindata[0].last_name;
    this.$gaService.event('Settings','User Flow',this.dr_name);
    this.authService.userData$.subscribe((res: any) => {
      console.log(res);
      this.account = <LoginData>res;
    });
    if(localStorage.getItem('darkmode') == 'true'){
      this.darkmode = true
    }else{
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
      localStorage.removeItem('_cap_userDataKey');
      //localStorage.clear();
      //window.location.reload();
      this.router.navigate(['/login']);
    });
  }
}
