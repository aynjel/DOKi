import { Component, Renderer2 } from "@angular/core";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
//import { SignalRService } from '../services/signal-r.service';
import { StorageService } from "../services/storage/storage.service";
import { AuthConstants } from "../config/auth-constants";
import { Constants } from "../shared/constants";

import { FunctionsService } from "../shared/functions/functions.service";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";
import { PatientService } from "../services/patient/patient.service";
import { AuthService } from "../services/auth/auth.service";
import { LoginData } from "../models/login-data.model";
import {
  UserSettingsModelv3,
  LoginResponseModelv3,
  RevokeTokenV3,
} from "src/app/models/doctor";
import {
  InPatientData,
  ProfessionalFeeModelv3,
} from "src/app/models/in-patient.model";
import { BehaviorSubject, fromEvent } from "rxjs";
import { DoctorService } from "../services/doctor/doctor.service";
import { UserIdleService } from "angular-user-idle";
import { AlertController, MenuController } from "@ionic/angular";
import { merge } from "highcharts";
import { LogoutService } from "../services/logout/logout.service";
import { ActivatedRoute, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  public logindata: LoginResponseModelv3;
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  userData$ = new BehaviorSubject<any>([]);
  badgecount = 0;
  isDesktop: boolean;
  isPortrait: boolean;
  signalList: any = [];
  dr_code;
  dr_username;
  public revokeTokenV3: RevokeTokenV3;
  constructor(
    private screensizeService: ScreenSizeService,
    private storageService: StorageService,
    private renderer: Renderer2,
    public constants: Constants,
    public functionsService: FunctionsService,
    public router: Router,
    private patientService: PatientService,
    private authService: AuthService,
    private doctorService: DoctorService,
    private userIdle: UserIdleService,
    public alertController: AlertController,
    private logoutService: LogoutService,
    private menu: MenuController
  ) {
    this.functionsService.logToConsole("constructor");
    this.userIdle.setCustomActivityEvents(fromEvent(document, "touchstart"));
    this.userIdle.setCustomActivityEvents(fromEvent(document, "touchend"));

    localStorage.removeItem("isIdlestarted");
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
    this.screensizeService.isPortraitView().subscribe((isPortrait) => {
      this.isPortrait = isPortrait;
    });
    /*this.signalRService.signalReceived.subscribe((signal: any) => {
      this.functionsService.logToConsole("-->" + signal.msg);
      this.badgecount = signal.msg;
      this.signalList.push(signal);
    });*/
  }
  toggleMenu() {
    this.menu.toggle(); //Add this method to your button click function
  }
  ngOnInit() {
    localStorage.setItem("tokenExpired", "0");

    if (localStorage.getItem("isIdle") == "1") {
      if (localStorage.getItem("isIdlestarted") == null) {
        this.functionsService.logToConsole(
          "IDLE WATCH : " + localStorage.getItem("isIdlestarted")
        );
        this.userIdle.stopTimer();
        this.userIdle.startWatching();

        localStorage.setItem("isIdlestarted", "1");
      } else {
        this.functionsService.logToConsole("IDLE WATCH ALREADY STARTED");
      }
    }

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe((count) => {
      if (localStorage.getItem("isIdle") == "1") {
        console.log(count);
        // this.functionsService.logToConsole(count);
        if (count == 1) {
          if (this.alert.length == 0) {
            this.timerExpired();
          }
        }
      } else {
        this.functionsService.logToConsole("timer stopped");

        this.userIdle.stopTimer();
        this.userIdle.stopWatching();
      }
    });

    // Start watch when time is up.
    let dr_username = atob(localStorage.getItem("username"));
    this.userIdle.onTimeout().subscribe(() => {
      localStorage.setItem("promptLogout", "1");
      this.userIdle.stopWatching();
      this.alertController.dismiss();
      this.logout();
      this.alert = [];
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.routerState.snapshot.url.includes("/login")) {
          this.userIdle.stopTimer();
          this.userIdle.stopWatching();
          this.alertController.dismiss();
          window.location.reload();
        }
        // Perform any necessary actions after navigation, e.g., refresh data
      });
  }
  alert: any = [];
  async timerExpired() {
    //localStorage.setItem('timerPrompt', '1');
    this.alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Dok, are you still there?",
      animated: true,
      backdropDismiss: false,
      message:
        "We understand you're busy. For you and your patients' security, we'll automatically log you out in a few minutes.",
      buttons: [
        {
          text: "Log me out",
          // role: 'cancel',
          cssClass: "secondary",
          handler: () => {
            this.logout();
            this.alert = [];
          },
        },
        {
          text: "Keep me in",
          handler: () => {
            //localStorage.removeItem("timerPrompt");
            this.alertController.dismiss();
            this.userIdle.stopTimer();
            this.alert = [];
          },
        },
      ],
    });
    await this.alert.present();
  }

  ionViewWillEnter() {
    /*
    if (localStorage.getItem("darkmode") == null) {
      localStorage.setItem("darkmode", "false");
    }
    if (localStorage.getItem("darkmode") == "true") {
      //this.functionsService.logToConsole("true");
      this.functionsService.logToConsole("true");
      this.renderer.setAttribute(document.body, "color-theme", "dark");
    } else {
      this.functionsService.logToConsole("false");
      this.renderer.setAttribute(document.body, "color-theme", "light");
    }*/
    this.functionsService.logToConsole("checkAppearance");

    this.logindata = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    this.dr_code = this.logindata.doctorCode;
    this.dr_username = atob(localStorage.getItem("username"));
    /*
    this.patientService.getUserSettingsV2(this.dr_username).subscribe(
      (res: any) => {       
        this.functionsService.logToConsole(res);
        
        if(Object.keys(res).length >= 1){
          let data = JSON.stringify(res);data = '['+data+']';let adat = JSON.parse(data);
          adat.forEach(el => {
            if(typeof el.appearance !== 'undefined'){
              if(el.appearance.darkmode == 1){
                this.renderer.setAttribute(document.body, "color-theme", "dark");
              }else{
                this.renderer.setAttribute(document.body, "color-theme", "light");
              }
            }else{
              this.renderer.setAttribute(document.body, "color-theme", "light");
            }
          });
        }
      },
      (error)=>{
      },() =>{
      });
      */
  }
  goto(a) {
    this.router.navigate(["/menu/" + a]);
  }
  logout() {
    this.logoutService.out();
    /*
    this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
      this.userData$.next('');
      localStorage.removeItem('_cap_userDataKey');
      localStorage.removeItem('username');
  
      sessionStorage.clear();
      localStorage.setItem('hasloggedin', '1');
      localStorage.setItem('username',this.dr_username);
      this.userIdle.stopWatching();
      this.router.navigate(['/login']);
    });*/
  }
}
