import { Component, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenSizeService } from './services/screen-size/screen-size.service';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from '@ionic/angular';
import { FunctionsService } from './shared/functions/functions.service';
import { Constants } from './shared/constants';
import { Messages } from '../app/shared/messages';
import { UserIdleService } from 'angular-user-idle';
import { Router } from '@angular/router';
import {
  UserSettingsModelv3,
  LoginResponseModelv3,
  RevokeTokenV3,
} from 'src/app/models/doctor';
import { DoctorService } from './services/doctor/doctor.service';
import { StorageService } from './services/storage/storage.service';
import { AuthConstants, Consta } from './config/auth-constants';
import { BehaviorSubject } from 'rxjs';
import { LogoutService } from './services/logout/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  role_flag: any;
  isDesktop: boolean;
  public appPages = [
    {
      title: 'Doctors',
      url: '/executive/doctors',
      icon: 'git-network-outline',
    },
    {
      title: 'Patients',
      url: '/executive/allpatients',
      icon: 'person-circle-outline',
    },
    {
      title: 'Physician Directory',
      url: '/executive/directory',
      icon: 'book-outline',
    },
    {
      title: 'Case Rates',
      url: '/executive/caserates',
      icon: 'file-tray-full-outline',
    },
    {
      title: 'Log Out',
      url: 'logout',
      icon: 'log-out-outline',
    },
  ];
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
    private logoutService: LogoutService
  ) {
    this.initializeApp();
    this.updateClient();
    this.role_flag = localStorage.getItem('role_flag');
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }
  userData$ = new BehaviorSubject<any>([]);
  public revokeTokenV3: RevokeTokenV3;
  onSplitPaneVisible(event) {
    console.log(event);
  }
  initializeApp() {
    this.revokeTokenV3 = new RevokeTokenV3();
    this.functionsService.logToConsole('initializeApp');

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screensizeService.onResize(this.platform.width());
    });

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
      this.functionsService.logToConsole('not enabled');
    } else {
      this.functionsService.logToConsole('enabled');
    }
    this.update.available.subscribe((event) => {
      this.presentAlertConfirm();
    });
  }

  async timerExpired() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Dok, are you still there?',
      animated: true,
      backdropDismiss: false,
      message:
        "We understand you're busy. For you and your patients' security, we'll automatically log you out in a few minutes.",
      buttons: [
        {
          text: 'Log me out',
          // role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.logout();
          },
        },
        {
          text: 'Keep me in',
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
      cssClass: 'my-custom-class',
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
    let dr_username = atob(localStorage.getItem('username'));
    this.revokeTokenV3 = new RevokeTokenV3();
    this.revokeTokenV3.jwt = decodeURIComponent(
      this.functionsService.getcookie('refreshToken')
    );
    this.doctorService
      .revokeTokenV3(this.revokeTokenV3)
      .subscribe((res: any) => {
        this.functionsService.logToConsole(res);
      });

    this.logoutService.out();
  }
  whattodo(data) {
    console.log(data);
    if (data == 'logout') {
      this.logout();
    }
  }
  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }
}
