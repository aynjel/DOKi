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
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ChhAppAddAppointmentsModalPage } from "../chh-web-components/chh-app-add-appointments-modal/chh-app-add-appointments-modal.page";
import { ChhAppChangePasswordPage } from "../chh-web-components/chh-app-change-password/chh-app-change-password.page";
import { ChhAppChangePassPage } from "../chh-web-components/chh-app-change-pass/chh-app-change-pass.page";
import { ChhAppPrivacyPolicyPage } from "../chh-web-components/chh-app-privacy-policy/chh-app-privacy-policy.page"
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

  displayUserData: any;
  dr_name:any;
  privacyPolicy:boolean = true;

  //toggles
  smsAdmitted:boolean = true;
  smsDischarge:boolean = true;
  pushNotiAdmitted = false;
  pushNotiDischarge = false;
  darkmode: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private screensizeService: ScreenSizeService,
    private renderer: Renderer2,
    protected $gaService: GoogleAnalyticsService,
    public constants: Constants,
    public functionsService: FunctionsService,
    private modalController: ModalController,
    private actionSheetController:ActionSheetController
  ) {
    this.privacyPolicy = true;
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }




  async showaddmodal() {
    const modal = await this.modalController.create({
      component: ChhAppChangePasswordPage,
      componentProps: {
        backdropDismiss: true,
      },
    });
    modal.onDidDismiss().then((data) => {
     
    });
    return await modal.present();
  }

  async showaddmodal1() {
    const modal = await this.modalController.create({
      component: ChhAppChangePassPage,
      componentProps: {
        backdropDismiss: true,
      },
    });
    modal.onDidDismiss().then((data) => {
     
    });
    return await modal.present();
  }
  
  ngOnInit(){}
  ionViewWillEnter() {

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



    //mock Codes
    let x:boolean = false;
    let y=0;
    this.authService.mockUserSettings().subscribe((res: any) => {
    
      
      let data = JSON.stringify(res);
      console.log(data);
      
      data = '['+data+']';
      let adat = JSON.parse(data);
      adat.forEach(element => {

          this.smsAdmitted  = element.smsNotifications.patientAdmitted;
          this.smsDischarge  = element.smsNotifications.patientDischarged;
          this.pushNotiAdmitted  = element.pushNotifications.patientAdmitted;
          this.pushNotiDischarge  = element.pushNotifications.patientDischarged;
 
      });
    });
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
  
  async optoutofprivacy(event: { detail: { checked: any } }) {

    if (event.detail.checked) {}
    else{

      const actionSheet = await this.actionSheetController.create({
        mode:'ios',
        header: 'Are you sure you want to opt-out of our privacy Policy?',
        cssClass: "my-custom-class",
        buttons: [{
          text: 'Yes, Opt-Out',
          role: 'destructive',
          icon: 'arrow-undo-outline',
          handler: () => {
            this.userData$.next("");
            localStorage.removeItem("_cap_userDataKey");
            this.router.navigate(["/login"]);
          }
        },  {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.privacyPolicy = true;
          }
        }]
      });
      await actionSheet.present();
  
    }
  }

  async viewPrivacyPolicy(){
    let cssData;
    if(this.isDesktop){
      cssData ='my-privacy-modal-css'
    }else{
      cssData = "";
    }
    const modal = await this.modalController.create({
      component: ChhAppPrivacyPolicyPage,
      cssClass: cssData,
      componentProps: {
        backdropDismiss: true,
        'origin': 'settings'
      },

    });
    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }
}
