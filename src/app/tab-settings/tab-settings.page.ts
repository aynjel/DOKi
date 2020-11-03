import { Component, OnInit, Renderer2 } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage/storage.service";
import { AuthConstants } from "../config/auth-constants";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
import { PatientService } from "../services/patient/patient.service";
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
import { ChhAppTermsAndConditionsPage } from "../chh-web-components/chh-app-terms-and-conditions/chh-app-terms-and-conditions.page";
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
  dr_code:any;


  //toggles
  smsAdmitted:boolean = true;
  smsDischarge:boolean = true;
  pushNotiAdmitted = false;
  pushNotiDischarge = false;
  darkmode: boolean = true;
  privacyPolicy:boolean = true;

  draftJson:any;
  draftJson2:any;

  isset_smsNotification:boolean = false;
  isset_pushNotification:boolean = false;
  isset_appearance:boolean = false;
  isset_privacyPolicy:boolean = false;
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
    private actionSheetController:ActionSheetController,
    private patientService:PatientService
  ) {
    this.privacyPolicy = true;
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
    this.patientService.getAppSetting().subscribe(
      (res: any) => {  
           
        let data = JSON.stringify(res);data = '['+data+']';this.draftJson = JSON.parse(data);
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
  
  ngOnInit(){

    
  }
  ionViewWillEnter() {


    
    this.$gaService.pageView('/Settings', 'Settings Tab');
    this.logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_name = this.logindata[0].last_name;
    this.dr_code = this.logindata[0].dr_code;

    
    this.patientService.getUserSettings('DPP',this.dr_code).subscribe(
      (res: any) => {
        let data = JSON.stringify(res);data = '['+data+']';this.draftJson2 = JSON.parse(data);
        console.log('FIRST RUN --->>>>');
        console.log(JSON.stringify(this.draftJson));
        if (typeof this.draftJson2[0].smsNotification !== 'undefined') {
          this.isset_smsNotification = true;
        }else{
          this.isset_smsNotification = false;
        }
        if (typeof this.draftJson2[0].pushNotification !== 'undefined') {
          this.isset_pushNotification = true;
        }else{
          this.isset_pushNotification = false;
        }
        if (typeof this.draftJson2[0].appearance !== 'undefined') {
          this.isset_appearance = true;
        }else{
          this.isset_appearance = false;
        }
        if (typeof this.draftJson2[0].privacyPolicy !== 'undefined') {
          this.isset_privacyPolicy = true;
            this.draftJson[0].privacyPolicy.accepted = this.draftJson2[0].privacyPolicy.accepted;
            
        }else{
          this.isset_privacyPolicy = false;
        }
        console.log('SECOND RUN --->>>>');
        console.log(JSON.stringify(this.draftJson));
      
      });








    
    this.$gaService.event('Settings','User Flow',this.dr_name);
    this.authService.userData$.subscribe((res: any) => {
      //this.functionsService.logToConsole(res);
      this.account = <LoginData>res;
    });
    if (localStorage.getItem("darkmode") == "true") {
      this.darkmode = true;
    } else {
      this.darkmode = false;
    }

  }

  onDarkModeEnable(event: { detail: { checked: any } }) {
    let value = 0;
    if (event.detail.checked) {
      value = 1;
      this.renderer.setAttribute(document.body, "color-theme", "dark");
      localStorage.setItem('darkmode','true');
          this.$gaService.event('Settings - Dark Mode True','User Flow',this.dr_name);
    } else {
      value =0;
      this.renderer.setAttribute(document.body, "color-theme", "light");
      localStorage.setItem('darkmode','false');
      this.$gaService.event('Settings - Dark Mode False','User Flow',this.dr_name);
    }
    //if(this.isDesktop){window.location.reload();}
    this.updateOrInsert(this.dr_code,'DPP','appearance','darkmode',value,this.isset_appearance);
     
   
  }



  updateOrInsert(username:any, appcode:any, settings:any, property:any,value:any,flag:boolean){
    let smpJSON = '{"username": "'+username+'","appcode": "'+appcode+'","setting": "'+settings+'","property": "'+property+'","value": "'+value+'"}';
    if(flag){
      this.patientService.updateUserSettings(smpJSON).subscribe((res1: any) => {});
    }else{
      this.isset_appearance = true;
      this.patientService.insertUserSettings(smpJSON).subscribe((res1: any) => {});
    }
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
            let smpJSON = '{"username": "'+this.dr_code+'","appcode": "DPP","setting": "privacyPolicy","property": "accepted","value": "0"}';

            this.updateOrInsert(this.dr_code,'DPP','privacyPolicy','accepted',0,this.isset_privacyPolicy);

            this.privacyPolicy = true;
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
  async viewTermsAndCondition(){
    let cssData;
    if(this.isDesktop){
      cssData ='my-privacy-modal-css'
    }else{
      cssData = "";
    }
    const modal = await this.modalController.create({
      component: ChhAppTermsAndConditionsPage,
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
