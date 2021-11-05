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
import {UserSettingsModelv3,LoginResponseModelv3,RevokeTokenV3} from 'src/app/models/doctor';
import { DoctorService } from './services/doctor/doctor.service';
import { StorageService } from './services/storage/storage.service';
import { AuthConstants, Consta } from './config/auth-constants';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
    private storageService: StorageService
  ) {
    this.initializeApp();
    this.updateClient();
  }
  userData$ = new BehaviorSubject<any>([]);
  public revokeTokenV3: RevokeTokenV3; 
  initializeApp() {
    this.revokeTokenV3 = new RevokeTokenV3();
    console.log("initializeApp");
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screensizeService.onResize(this.platform.width());
    });




    if (localStorage.getItem('isIdle') == '1') {
    console.log(localStorage.getItem('isIdlestarted'));

      if (localStorage.getItem('isIdlestarted')==null) {
        console.log("IDLE WATCH");
        this.userIdle.startWatching();
        localStorage.setItem('isIdlestarted', '1');
      }else{
        console.log("IDLE WATCH ALREADY STARTED");
       
      }
      
     
    }
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe((count) => {
      if (localStorage.getItem('isIdle') == '1') {
        console.log(count);
        if (count == 1) {
          this.timerExpired();
          //this.userIdle.stopTimer()
        }
      } else {
        console.log("timer stopped");
        
        this.userIdle.stopTimer();
      }
    });

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.alertController.dismiss();
      localStorage.clear();
      localStorage.setItem('promptLogout', '1');
      localStorage.setItem('hasloggedin', '1');
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
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
  logout(){
    this.revokeTokenV3.jwt = this.functionsService.get('refreshToken');
    localStorage.setItem("torevoketoken","1");
    this.doctorService.revokeTokenV3(this.revokeTokenV3).subscribe(
      (res: any) => {
        console.log(res);
      },(error) => {
    
       },
       () => {

        this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
          this.userData$.next('');
          localStorage.removeItem('_cap_userDataKey');
          localStorage.removeItem('username');
          localStorage.clear();
          sessionStorage.clear();
          localStorage.setItem('hasloggedin', '1');
    
          this.router.navigate(['/login']);
        });
       }
    );
    
    
  }
  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }
}
