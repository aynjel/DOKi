import { Component, HostListener } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ScreenSizeService } from "./services/screen-size/screen-size.service";
import { SwUpdate } from "@angular/service-worker";
import { AlertController } from "@ionic/angular";
import { FunctionsService } from "./shared/functions/functions.service";
import { Constants } from "./shared/constants";
import { Messages } from "../app/shared/messages";


@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
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
    public messages: Messages
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

  @HostListener("window:resize", ["$event"])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }
}
