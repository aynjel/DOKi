import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { AuthConstants, Consta } from '../config/auth-constants';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';
import { PatientService } from '../services/patient/patient.service';
import { LoginData } from '../models/login-data.model';
import { ProfileExpiry } from '../models/doctor';


import { BehaviorSubject } from 'rxjs';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Constants } from '../shared/constants';
import { FunctionsService } from '../shared/functions/functions.service';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { ChhAppAddAppointmentsModalPage } from '../chh-web-components/chh-app-add-appointments-modal/chh-app-add-appointments-modal.page';
import { ChhAppChangePasswordPage } from '../chh-web-components/chh-app-change-password/chh-app-change-password.page';
import { ChhAppChangePassPage } from '../chh-web-components/chh-app-change-pass/chh-app-change-pass.page';
import { ChhAppPrivacyPolicyPage } from '../chh-web-components/chh-app-privacy-policy/chh-app-privacy-policy.page';
import { ChhAppTermsAndConditionsPage } from '../chh-web-components/chh-app-terms-and-conditions/chh-app-terms-and-conditions.page';
import { UserSettingsModel,UserSettingDeletesModel } from '../models/doctor';
import { DoctorService } from '../services/doctor/doctor.service';
import { element } from 'protractor';
import {UserSettingsModelv3,LoginResponseModelv3,AppSettingsModelv3} from 'src/app/models/doctor';
import { InPatientData,ProfessionalFeeModelv3 } from 'src/app/models/in-patient.model';

@Component({
  selector: 'app-tab-settings',
  templateUrl: 'tab-settings.page.html',
  styleUrls: ['tab-settings.page.scss'],
})
export class TabSettingsPage {
  userData$ = new BehaviorSubject<any>([]);
  public logindata:LoginResponseModelv3 ;
  account: LoginResponseModelv3;
  isDesktop: boolean;

  displayUserData: any;
  dr_name: any;
  dr_code: any;
  userSettingsModel = new UserSettingsModel;
  userSettingDeletesModel = new UserSettingDeletesModel;
  appSettingsModelv3 = new AppSettingsModelv3; 
  //toggles
  smsAdmitted: boolean = false;
  smsDischarge: boolean = false;
  pushNotiAdmitted = false;
  pushNotiDischarge = false;
  darkmode: boolean = false;
  privacyPolicy: boolean = true;
  profileExpiry:any;
  draftJson: any;
  draftJson2: any;
  dr_username;
  tmpData;
  isset_smsAdmitted: boolean = false;
  isset_smsDischarge: boolean = false;
  isset_pushNotiAdmitted: boolean = false;
  isset_pushNotiDischarge: boolean = false;
  isset_darkmode: boolean = false;
  isset_privacyPolicy: boolean = false;
  prc:any;
  prcDays:any;
  prcBar:any;
  prcBarColor:any;
  prcBarHide:any;
  phic:any;
  phicDays:any;
  phicBar:any;
  phicBarColor:any;
  phicBarHide:any;
  data1;
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
    public userSettingsModelv3: UserSettingsModelv3; 
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
    private actionSheetController: ActionSheetController,
    private patientService: PatientService,
    public alertController: AlertController,
    private doctorService: DoctorService
  ) {
    this.privacyPolicy = true;

    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });

    this.patientService.getAppSettingV2().subscribe((res: any) => {
      this.draftJson = res;
      //let data = JSON.stringify(res);data = '['+data+']';this.draftJson = JSON.parse(data);
    });
  }

  /* async showaddmodal() {
    const modal = await this.modalController.create({
      component: ChhAppChangePasswordPage,
      componentProps: {
        backdropDismiss: true,
      },
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }*/

  async modalUpdate(header, message, data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: header,
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            if (data) {
              this.privacyPolicy = true;
              this.userData$.next('');
              localStorage.removeItem('_cap_userDataKey');
              this.router.navigate(['/login']);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async showaddmodal1() {
    const modal = await this.modalController.create({
      component: ChhAppChangePassPage,

      componentProps: {
        backdropDismiss: true,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data == 'Success') {
        this.modalUpdate(
          this.constants.UI_COMPONENT_TEXT_VALUE_PASSWORD_SUCCESS_TITLE,
          this.constants.UI_COMPONENT_TEXT_VALUE_CHANGE_PASSWORD_SUCCESS_BODY,
          true
        );
      } else if (data.data == 'none') {
      } else {
        this.modalUpdate(
          this.constants.UI_COMPONENT_TEXT_VALUE_PASSWORD_FAILED_TITLE,
          this.constants.UI_COMPONENT_TEXT_VALUE_CHANGE_PASSWORD_FAILED_BODY,
          false
        );
      }
    });
    return await modal.present();
  }

  async autoLogoutActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: 'You will be now logged Out',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Okay',
          role: 'destructive',
          icon: 'arrow-undo-outline',
          handler: () => {
            this.privacyPolicy = true;
            this.userData$.next('');
            localStorage.removeItem('_cap_userDataKey');
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await actionSheet.present();
  }
  ngOnInit() {

    this.checkAppearance();
  }

  ionViewWillEnter() {
    this.$gaService.pageView('/Settings', 'Settings Tab');
    
    this.logindata = <LoginResponseModelv3>this.authService.userData$.getValue();
    console.log(this.logindata);
    
    this.dr_name = this.logindata.lastName;
    this.dr_code = this.logindata.doctorCode;


    this.dr_username =this.logindata.userName;
    let y = '';
    //PARSE USER SETTINGS
    console.log('ionViewWillEnter');
    


    this.profileExpiry = new ProfileExpiry();
    this.profileExpiry.mode = Consta.mode;
    this.profileExpiry.drCode = this.dr_code;
    this.doctorService.getProfileExpiry(this.profileExpiry).subscribe(
      (res: any) => {
          var dd    = new Date(res.LicenseExpiryDate);
          this.prc = dd.getDate()+'/'+(dd.getMonth() + 1)+'/'+dd.getUTCFullYear();
          this.prcDays = res.LicenseExpiryDaysRemaining;
          if(this.prcDays > 90){
            this.prcBar = this.prcDays/90;
            this.prcBarColor='';
            this.prcBarHide = 'ion-hide';
          }else if(this.prcDays >= 60 && this.prcDays <= 90 ){
            this.prcBar = this.prcDays/90;
            this.prcBarColor='mango';
            this.prcBarHide = '';          
          }else if(this.prcDays >= 30 && this.prcDays <= 59 ){
            this.prcBar = this.prcDays/90;
            this.prcBarColor='warning';
            this.prcBarHide = '';          
          }else{
            this.prcBar = this.prcDays/90;
            this.prcBarColor='danger';
            this.prcBarHide = '';  
          }

          var dd    = new Date(res.PhicExpiryDate);
          this.phic = dd.getDate()+'/'+(dd.getMonth() + 1)+'/'+dd.getUTCFullYear();
          this.phicDays = res.PhicExpiryDaysRemaining;    
          if(this.phicDays > 90){
            this.phicBar = this.phicDays/90;
            this.phicBarColor='';
            this.phicBarHide = 'ion-hide';
          }else if(this.phicDays >= 60 && this.phicDays <= 90 ){
            this.phicBar = this.phicDays/90;
            this.phicBarColor='mango';
            this.phicBarHide = '';          
          }else if(this.phicDays >= 30 && this.phicDays <= 59 ){
            this.phicBar = this.phicDays/90;
            this.phicBarColor='warning';
            this.phicBarHide = '';          
          }else{
            this.phicBar = this.phicDays/90;
            this.phicBarColor='danger';
            this.phicBarHide = '';  
          }  
      }
    );


    this.userSettingsModelv3 = JSON.parse('['+atob(localStorage.getItem("user_settings"))+']');

    this.doctorService.getUserSettingsV3().subscribe(
      (res: any) => {
        this.userSettingsModelv3 = <UserSettingsModelv3>res;
        localStorage.setItem("user_settings",btoa(JSON.stringify(this.userSettingsModelv3)));
      },(error) => {
      },
      () => {

        this.checkAppearance();
      }
      );


     







    /*this.patientService.getUserSettingsV2(this.dr_username).subscribe((res: any) => {
        console.log(res);
        
        Object.keys(res).forEach((key) => {

          var value = res[key];
          Object.keys(value).forEach((lock) => {
            var valuex = value[lock];
            if (key != 'appCode') {
              if (key != 'username') {

                if (key == 'appearance') {
                  this.isset_darkmode = true;
                  if (valuex == '1') {
                    this.darkmode = true;
                    this.renderer.setAttribute(
                      document.body,
                      'color-theme',
                      'dark'
                    );
                  } else {
                    this.darkmode = false;
                    this.renderer.setAttribute(
                      document.body,
                      'color-theme',
                      'light'
                    );
                  }
                }
                if (key == 'privacyPolicy') {
                  this.isset_privacyPolicy = true;
                  if (lock == 'accepted') {
                    if (valuex == '1') {
                      this.privacyPolicy = true;
                    }
                  }
                }
                if (key == 'pushNotification') {
                  if (lock == 'patientAdmitted') {
                    this.isset_pushNotiAdmitted = true;
                    if (valuex == '1') {
                      this.pushNotiAdmitted = true;
                    } else {
                      this.pushNotiAdmitted = false;
                    }
                  } else if (lock == 'patientDischarged') {
                    this.isset_pushNotiDischarge = true;
                    if (valuex == '1') {
                      this.pushNotiDischarge = true;
                    } else {
                      this.pushNotiDischarge = false;
                    }
                  }
                }
                if (key == 'smsNotification') {
                  if (lock == 'patientAdmitted') {
                    this.isset_smsAdmitted = true;
                    if (valuex == '1') {
                      this.smsAdmitted = true;
                    } else {
                      this.smsAdmitted = false;
                    }
                  } else if (lock == 'patientDischarged') {
                    this.isset_smsDischarge = true;
                    if (valuex == '1') {
                      this.smsDischarge = true;
                    } else {
                      this.smsDischarge = false;
                    }
                  }
                }
              }
            }
          });

        });
      });*/




    this.$gaService.event('Settings', 'User Flow', this.dr_name);
    this.authService.userData$.subscribe((res: any) => {
      this.account = <LoginResponseModelv3>res;
      console.log(this.account);
      
      let asdasda = JSON.stringify(res);
      asdasda = '['+asdasda+']';
      this.account = JSON.parse(asdasda);
      
    });
  }








  toggleV3(event: { detail: { checked: any } },setting: any,property: any,flag: boolean) {
    let value: any;
    if (event.detail.checked) {
      value = '1';
    } else {
      value = '0';
    }
    if(setting == 'smsNotification' ){
      this.userSettingsModelv3.smsNotification = value;
    }
    if(setting == 'darkmode' ){
      this.userSettingsModelv3.darkmode = value;
    }
    localStorage.setItem("user_settings",btoa(JSON.stringify(this.userSettingsModelv3)));
    this.updateUserSettings();
  }
  updateUserSettings(){
    console.log('updateUserSettingsupdateUserSettingsupdateUserSettingsupdateUserSettingsupdateUserSettingsupdateUserSettingsupdateUserSettingsupdateUserSettingsupdateUserSettingsupdateUserSettingsupdateUserSettingsupdateUserSettings');
    
    console.log(this.userSettingsModelv3);
    
    this.doctorService.updateUserSettingsV3(this.userSettingsModelv3).subscribe(
      (res: any) => {
        console.log(res);
        
      },(error) => {
        
      },
      () => {

        this.checkAppearance();
      }

    );
  }






















  onDarkModeEnable(data: any) {
    console.log('onDarkModeEnable');
    if (data == '1') {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      this.$gaService.event(
        'Settings - Dark Mode True',
        'User Flow',
        this.dr_name
      );
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
      this.$gaService.event(
        'Settings - Dark Mode False',
        'User Flow',
        this.dr_name
      );
    }
  }
  checkAppearance() {
//    console.log('checkAppearance');
    var values = JSON.parse('[' + atob(localStorage.getItem("user_settings"))+ ']');
    //console.log(values);
    
    let dr_username = atob(localStorage.getItem('username'));
    values.forEach(element => {
      if(element.darkmode == '1'){
        this.renderer.setAttribute(document.body,'color-theme','dark');
        this.isset_darkmode = true;
        this.darkmode = true;
      }else{
        this.renderer.setAttribute(document.body,'color-theme','light');
        this.isset_darkmode = false;
        this.darkmode = false;
      }
      if(element.privacyPolicy == '1'){
        this.privacyPolicy = true;
      }else{
        this.privacyPolicy = false;
      }
      if(element.smsNotification == '1'){
        this.smsAdmitted = true;
        this.isset_smsAdmitted = true;
      }else{
        this.smsAdmitted = false;
        this.isset_smsAdmitted = false;
      }
      



    });
  }


  

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
      this.userData$.next('');
      localStorage.removeItem('_cap_userDataKey');
      localStorage.removeItem('username');
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('hasloggedin', '1');
      this.router.navigate(['/login']).then( ()=>{
        window.location.reload();
      }
        
      );
    });

  }
  //OPT-OUT of PRIVACY POLICY
  async optoutofprivacy(event: { detail: { checked: any } }) {
    if (event.detail.checked) {
    } else {
      const actionSheet = await this.actionSheetController.create({
        mode: 'ios',
        header: 'Are you sure you want to opt-out of our Privacy Policy?',
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'Yes, Opt-Out',
            role: 'destructive',
            icon: 'arrow-undo-outline',
            handler: () => {
              this.userSettingsModelv3.privacyPolicy = '0';
              this.updateUserSettings();
              /*let smpJSON =
                '{"username": "' +
                this.dr_code +
                '","userReference": "' +
                this.dr_code +
                '""appCode": "DPP","setting": "privacyPolicy","property": "accepted","value": "0"}';
              this.updateOrInsert(
                'privacyPolicy',
                'accepted',
                0,
                this.isset_privacyPolicy
              );
              this.privacyPolicy = true;
              this.userData$.next('');
              */
              localStorage.clear();
              this.router.navigate(['/login']);
            },
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              this.privacyPolicy = true;
            },
          },
        ],
      });
      await actionSheet.present();
    }
  }

  //when reset is clicked
  async resetUserSettings() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: 'Are you sure you want to RESET USER SETTINGS?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Yes, Reset',
          role: 'destructive',
          icon: 'refresh-outline',
          handler: () => {
            this.doctorService.getAppSettingsV3().subscribe(
              (resdata: any) => {
                this.appSettingsModelv3 = <AppSettingsModelv3>resdata;
                this.userSettingsModelv3 = <UserSettingsModelv3>resdata;
                this.userSettingsModelv3.privacyPolicy = '1';
                localStorage.setItem("user_settings",btoa(JSON.stringify(this.userSettingsModelv3)));
              },(error) => {
                 this.functionsService.sorryDoc();
                },
                () => {
  
                  this.updateUserSettings();
                }
              );
            /*
            let smpJSON =
              '{"username": "' +
              this.dr_username +
              '","userReference": "' +
              this.dr_code +
              '","appCode": "DPP","setting": "string","property":"string","value": "string"}';
              this.userSettingDeletesModel.username = this.dr_username;
              this.userSettingDeletesModel.userReference = this.dr_code;
              this.userSettingDeletesModel.setting = "string";
              this.userSettingDeletesModel.appCode = Consta.appCode;
              this.userSettingDeletesModel.mode = Consta.mode;

            this.patientService
              .resetUserSettingsV2(this.userSettingDeletesModel)
              .subscribe(
                (res: any) => {
                  //console.log(res);
                },
                (error) => {},
                () => {
                  this.backToDefault();
                  let smpJSON =
                    '{"username": "' +
                    this.dr_username +
                    '","userReference": "' +
                    this.dr_code +
                    '","appCode": "DPP","setting":"privacyPolicy","property": "accepted","value": "1"}';
                  //console.log(smpJSON);
                  this.userSettingsModel = new UserSettingsModel;
                  this.userSettingsModel.username = this.dr_username;
                  this.userSettingsModel.userReference = this.dr_code;
                  this.userSettingsModel.appCode = Consta.appCode;
                  this.userSettingsModel.mode = Consta.mode;
                  this.userSettingsModel.setting = "privacyPolicy";
                  this.userSettingsModel.property = "accepted";
                  this.userSettingsModel.value  = "1";
                  this.patientService
                    .insertUserSettingsV2(this.userSettingsModel)
                    .subscribe(() => {
                      this.ionViewWillEnter();
                    });
                }
              );*/
          },
        },
        { text: 'Cancel', icon: 'close', role: 'cancel', handler: () => {} },
      ],
    });
    await actionSheet.present();
  }
  //reset the data
  backToDefault() {
    let y = '';
    Object.keys(this.draftJson).forEach((key) => {
      var value = this.draftJson[key];
      Object.keys(value).forEach((lock) => {
        var valuex = value[lock];
        if (key != 'appCode') {
          if (key == 'appearance') {
            this.isset_darkmode = false;
            this.renderer.setAttribute(document.body, 'color-theme', 'light');
            if (valuex == '1') {
              this.darkmode = true;
            } else {
              this.darkmode = false;
            }
          }
          if (key == 'pushNotification') {
            if (lock == 'patientAdmitted') {
              this.isset_pushNotiAdmitted = false;
              if (valuex == '1') {
                this.pushNotiAdmitted = true;
              } else {
                this.pushNotiAdmitted = false;
              }
            } else if (lock == 'patientDischarged') {
              this.isset_pushNotiDischarge = false;
              if (valuex == '1') {
                this.pushNotiDischarge = true;
              } else {
                this.pushNotiDischarge = false;
              }
            }
          }
          if (key == 'smsNotification') {
            if (lock == 'patientAdmitted') {
              this.isset_smsAdmitted = false;
              if (valuex == '1') {
                this.smsAdmitted = true;
              } else {
                this.smsAdmitted = false;
              }
            } else if (lock == 'patientDischarged') {
              this.isset_smsDischarge = false;
              if (valuex == '1') {
                this.smsDischarge = true;
              } else {
                this.smsDischarge = false;
              }
            }
          }
        }
      });
    });
  }

  async viewPrivacyPolicy() {
    let cssData;
    if (this.isDesktop) {
      cssData = 'my-privacy-modal-css';
    } else {
      cssData = '';
    }
    const modal = await this.modalController.create({
      component: ChhAppPrivacyPolicyPage,
      cssClass: cssData,
      componentProps: {
        backdropDismiss: true,
        origin: 'settings',
      },
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }

  async viewTermsAndCondition() {
    let cssData;
    if (this.isDesktop) {
      cssData = 'my-privacy-modal-css';
    } else {
      cssData = '';
    }
    const modal = await this.modalController.create({
      component: ChhAppTermsAndConditionsPage,
      cssClass: cssData,
      componentProps: {
        backdropDismiss: true,
        origin: 'settings',
      },
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }
}
