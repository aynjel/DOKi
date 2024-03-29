import { Component, HostListener, OnInit, NgZone } from "@angular/core";
import { MenuController, Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ScreenSizeService } from "./services/screen-size/screen-size.service";
import { SwPush, SwUpdate } from "@angular/service-worker";
import { AlertController } from "@ionic/angular";
import { FunctionsService } from "./shared/functions/functions.service";
import { Constants } from "./shared/constants";
import { Messages } from "../app/shared/messages";
import { UserIdleService } from "angular-user-idle";
import { Router } from "@angular/router";
import {
  UserSettingsModelv3,
  LoginResponseModelv3,
  RevokeTokenV3,
} from "src/app/models/doctor";
import { DoctorService } from "./services/doctor/doctor.service";
import { StorageService } from "./services/storage/storage.service";
import { AuthConstants, Consta } from "./config/auth-constants";
import { BehaviorSubject } from "rxjs";
import { LogoutService } from "./services/logout/logout.service";
import { environment } from "src/environments/environment";
import { ActivatedRoute, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { NotificationService } from "./services/notification/notification.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  role_flag: any;
  isDesktop: boolean;
  isPortrait: boolean;
  public appPages = [
    {
      title: "Doctors",
      url: "/executive/doctors",
      icon: "git-network-outline",
      type: "exec",
    },
    {
      title: "Patients",
      url: "/executive/allpatients",
      icon: "person-circle-outline",
      type: "exec",
    },
    {
      title: "Physician Directory",
      url: "/executive/directory",
      icon: "book-outline",
      type: "exec",
    },
    {
      title: "Case Rates",
      url: "/executive/caserates",
      icon: "file-tray-full-outline",
      type: "exec",
    },
    {
      title: "Log Out",
      url: "logout",
      icon: "log-out-outline",
      type: "exec",
    } /*
    {
      title: 'Collectibles',
      url: 'menu/collectibles',
      icon: 'wallet-outline',
      type: 'med',
    },
    {
      title: 'Medical Abstract',
      url: 'menu/medical-abstract',
      icon: 'reader-outline',
      type: 'med',
    },
    {
      title: 'Medical Certificate',
      url: 'menu/medical-certificate',
      icon: 'document-text-outline',
      type: 'med',<ion-icon name="mail-open-outline"></ion-icon>
    },*/,
    {
      title: "Notification Center",
      url: "menu/notification",
      icon: "notifications-outline",
      type: "medcons",
    },
    {
      title: "Progress Notes History",
      url: "menu/patient-history",
      icon: "document-text-outline",
      type: "medcons",
    },
    {
      title: "Final Dx | Med Cert",
      url: "menu/inbox",
      icon: "document-outline",
      type: "medcons",
    },
    {
      title: "Medical Abstract",
      url: "menu/search-Medical-Abstract",
      icon: "documents-outline",
      type: "medcons",
    },

    {
      title: "Discharge Instruction",
      url: "menu/discharge-instruction-search",
      icon: "receipt-outline",
      type: "medcons",
    },

    /*{
      title: "Progress Notes",
      url: "menu/patient-history",
      icon: "reader-outline",
      type: "medcons",
    },*/
    {
      title: "Settings",
      url: "menu/settings",
      icon: "settings-outline",
      type: "medcons",
    },
    {
      title: "Case Rates",
      url: "menu/case-rates",
      icon: "newspaper-outline",
      type: "medcons",
    },
    {
      title: "Help",
      url: "menu/help",
      icon: "help-outline",
      type: "medcons",
    },
    {
      title: "Log Out",
      url: "logout",
      icon: "log-out-outline",
      type: "medcons",
    },
  ];
  logindata;
  firstName;
  lastName;
  dr_name;
  dr_code;
  dr_username;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private update: SwUpdate,
    private screensizeService: ScreenSizeService,
    public alertController: AlertController,
    public functionsService: FunctionsService,
    public constants: Constants,
    public messages: Messages,
    private userIdle: UserIdleService,
    public router: Router,
    private doctorService: DoctorService,
    private storageService: StorageService,
    private logoutService: LogoutService,
    private menu: MenuController,
    private ngZone: NgZone,
    private swPush: SwPush,
    private notificationService: NotificationService
  ) {
    this.initializeApp();
    this.updateClient();
    this.role_flag = localStorage.getItem("role_flag");
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
    this.screensizeService.isPortraitView().subscribe((isPortrait) => {
      this.isPortrait = isPortrait;
    });

    //console.log(environment.API_URL);
  }
  userData$ = new BehaviorSubject<any>([]);
  public revokeTokenV3: RevokeTokenV3;
  onSplitPaneVisible(event) {
    // //console.log(event);
  }
  toggleMenu() {
    this.menu.toggle(); //Add this method to your button click function
  }
  viewSidebar() {
    this.logindata = "";
    this.lastName = "";
    this.firstName = "";
    this.dr_code = "";
    this.dr_username = "";
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.role_flag = localStorage.getItem("role_flag");
      this.logindata = res;
      this.lastName = this.logindata.lastName;
      this.firstName = this.logindata.firstName;
      this.dr_code = this.logindata.doctorCode;
      this.dr_username = this.logindata.userName;
    });
  }
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.viewSidebar();
        // Perform any necessary actions after navigation, e.g., refresh data
      });

    if(
      this.swPush.isEnabled && 
      !localStorage.getItem('isSubscribed') &&
      !localStorage.getItem('pushSubscription') &&
      localStorage.getItem('_cap_' + AuthConstants.AUTH) !== null
    ){
      this.notificationService.allowNotification();
    }

    this.swPush.notificationClicks.subscribe(result => {
      const { onActionClick } = result.notification.data;
      if (onActionClick && onActionClick.redirect) {
        const notifId = onActionClick.read.url;
        this.notificationService.updateNotificationStatus(notifId).subscribe();
        if (localStorage.getItem('_cap_' + AuthConstants.AUTH) === null) {
          localStorage.setItem('notificationClicks', JSON.stringify(result));
          return this.router.navigate(['/login']);
        }

        if (onActionClick.redirect.url === '' || onActionClick.redirect.url === null) {
          return this.router.navigate(['/menu/notifications']);
        }
      }
    });
  }
  initializeApp() {
    //console.log("initializeApp");
    //console.log(environment.API_URL);
    this.revokeTokenV3 = new RevokeTokenV3();
    this.functionsService.logToConsole("initializeApp");
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screensizeService.onResize(this.platform.width());
      if (screen.width > screen.height) {
        this.screensizeService.onPortrait(90);
      } else {
        this.screensizeService.onPortrait(0);
      }
    });

    /* this.dr_name = this.logindata.lastName;
    this.dr_code = this.logindata.doctorCode;
    this.dr_username = this.logindata.userName;*/

    /*
    if (localStorage.getItem('isIdle') == '1') {
    this.functionsService.logToConsole(localStorage.getItem('isIdlestarted'));

     // if (localStorage.getItem('isIdlestarted')==null) {
        this.functionsService.logToConsole("IDLE WATCH");
        this.userIdle.startWatching();
        localStorage.setItem('isIdlestarted', '1');
      //}else{
        //this.functionsService.logToConsole("IDLE WATCH ALREADY STARTED");
     // }
      
     
    }
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe((count) => {
      if (localStorage.getItem('isIdle') == '1') {
        this.functionsService.logToConsole(count);
        if (count == 1) {
          this.timerExpired();
          //this.userIdle.stopTimer()
        }
      } else {
        this.functionsService.logToConsole("timer stopped");
        
        this.userIdle.stopTimer();
      }
    });

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.alertController.dismiss();

      localStorage.setItem('promptLogout', '1');
      localStorage.setItem('hasloggedin', '1');
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
*/
  }

  updateClient() {
    if (!this.update.isEnabled) {
      this.functionsService.logToConsole("not enabled");
    } else {
      this.functionsService.logToConsole("enabled");
    }
    this.update.available.subscribe((event) => {
      this.presentAlertConfirm();
    });
  }

  async timerExpired() {
    const alert = await this.alertController.create({
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
          },
        },
        {
          text: "Keep me in",
          handler: () => {
            this.alertController.dismiss();
            this.userIdle.stopTimer();
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: this.messages.UPDATE_AVAILABLE,
      buttons: [
        {
          text: this.constants.UI_COMPONENT_TEXT__VALUE__UPDATE,
          handler: () => {
            this.update.activateUpdate().then(() => location.reload());
          },
        },
      ],
    });
    await alert.present();
  }

  logout() {
    this.logoutService.out();
  }
  isLoading: Boolean = false;
  whattodo(data) {
    this.isLoading = true;
    //console.log(data);
    /*this.router.navigate(['/menu/dashboard']).then(() => {
      window.location.reload();
    });*/
    if (data == "logout") {
      this.logout();
    } else {
      this.router.navigate([data]).then(() => {
        // window.location.reload();
      });
    }
  }
  @HostListener("window:orientationchange", ["$event"])
  @HostListener("window:resize", ["$event"])
  private onResize(event) {
    this.screensizeService.onPortrait(window.orientation);
    /*if (screen.width > screen.height) {
      this.screensizeService.onPortrait(90);
    } else {
      this.screensizeService.onPortrait(0);
    }*/
    this.screensizeService.onResize(event.target.innerWidth);
  }
}
