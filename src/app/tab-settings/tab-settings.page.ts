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
@Component({
  selector: 'app-tab-settings',
  templateUrl: 'tab-settings.page.html',
  styleUrls: ['tab-settings.page.scss'],
})
export class TabSettingsPage {
  userData$ = new BehaviorSubject<any>([]);
  public logindata: LoginData;
  account: LoginData;
  isDesktop: boolean;

  displayUserData: any;
  dr_name: any;
  dr_code: any;
  userSettingsModel = new UserSettingsModel;
  userSettingDeletesModel = new UserSettingDeletesModel;
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
  phic:any;
  phicDays:any;
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
  ngOnInit() {}

  ionViewWillEnter() {
    this.$gaService.pageView('/Settings', 'Settings Tab');
    this.logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_name = this.logindata.last_name;
    this.dr_code = this.logindata.dr_code;


    this.dr_username = atob(localStorage.getItem('username'));
    let y = '';
    //PARSE USER SETTINGS
    console.log('ionViewWillEnter');
    


    this.profileExpiry = new ProfileExpiry();
    this.profileExpiry.mode = Consta.mode;
    this.profileExpiry.drCode = this.dr_code;
    this.doctorService.getProfileExpiry(this.profileExpiry).subscribe(
      (res: any) => {
          console.log(res);
          var dd    = new Date(res.LicenseExpiryDate);
          this.prc = dd.getDate()+'/'+(dd.getMonth() + 1)+'/'+dd.getUTCFullYear();
          this.prcDays = res.LicenseExpiryDaysRemaining;

          var dd    = new Date(res.PhicExpiryDate);
          this.phic = dd.getDate()+'/'+(dd.getMonth() + 1)+'/'+dd.getUTCFullYear();
          this.phicDays = res.PhicExpiryDaysRemaining;         
      }
    );

    this.patientService.getUserSettingsV2(this.dr_username).subscribe((res: any) => {
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
      });

    this.$gaService.event('Settings', 'User Flow', this.dr_name);
    this.authService.userData$.subscribe((res: any) => {
      this.account = <LoginData>res;
      let asdasda = JSON.stringify(res);
      asdasda = '['+asdasda+']';
      this.account = JSON.parse(asdasda);
      
    });
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

  toggle(
    event: { detail: { checked: any } },
    setting: any,
    property: any,
    flag: boolean
  ) {
    console.log('toggle');
    
    let value: any;
    if (event.detail.checked) {
      value = 1;
    } else {
      value = 0;
    }
    if (setting == 'appearance') {
      this.onDarkModeEnable(value);
    }
    this.updateOrInsert(setting, property, value, flag);
  }

  //UPDATE OR INSERT USER SETTINGS
  updateOrInsert(setting: any, property: any, value: any, flag: boolean) {
    console.log('updateOrInsert');
    let smpJSON =
      '{"username":"' +
      this.dr_username +
      '", "userReference": "' +
      this.dr_code +
      '","appCode":"DPP","setting":"' +
      setting +
      '","property":"' +
      property +
      '","value":"' +
      value +
      '"}';
      this.userSettingsModel.username = this.dr_username;
      this.userSettingsModel.userReference = this.dr_code;
      this.userSettingsModel.appCode = Consta.appCode;
      this.userSettingsModel.setting = setting;
      this.userSettingsModel.property = property;
      this.userSettingsModel.value  = value;
      this.userSettingsModel.mode = Consta.mode;
    if (flag) {
      this.patientService.updateUserSettingsV2(this.userSettingsModel).subscribe(() => {
        //this.ionViewWillEnter();
      });
    } else {
      this.patientService.insertUserSettingsV2(this.userSettingsModel).subscribe(() => {
      //  this.ionViewWillEnter();
      });
    }
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
              let smpJSON =
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
              localStorage.removeItem('_cap_userDataKey');
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
              );
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
