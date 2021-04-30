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
    public router: Router
  ) {
    this.initializeApp();
    this.updateClient();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screensizeService.onResize(this.platform.width());
    });

    /*
    this.userIdle.startWatching();

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
    });*/
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
            localStorage.clear();
            localStorage.setItem('hasloggedin', '1');
            this.alertController.dismiss();
            this.router.navigate(['/login']).then(() => {
              window.location.reload();
            });
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

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }
}
