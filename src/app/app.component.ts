import { Component, HostListener  } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreensizeService } from './services/screensize.service';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private update:SwUpdate,
    private screensizeService: ScreensizeService,
    public alertController: AlertController
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
  }
  updateClient(){
    if(!this.update.isEnabled){console.log("not enabled");}
    else{console.log("enabled");}
    this.update.available.subscribe((event) =>{
      this.presentAlertConfirm();
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Update Available...',
      buttons: [{text: 'Update',handler: () => {this.update.activateUpdate().then(() => location.reload());}}]
    });
    await alert.present();
  }
  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }
  
}
