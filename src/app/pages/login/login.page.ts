import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants, Consta } from '../../config/auth-constants';
import { DoctorConstants } from '../../config/auth-constants';
import { AuthService } from '../../services/auth/auth.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { PatientService } from '../../services/patient/patient.service';
import { StorageService } from '../../services/storage/storage.service';
import { ToastService } from '../../services/toast/toast.service';
import { DoctorInfoGlobal } from '../../shared/doctor-info-global';
import { LoginData } from '../../models/login-data.model';
import {
  LoginModel,
  ChangePasswordModel,
  LoginResponseModel,
  InserUSerSettingsModel,
} from '../../models/patient';
import {
  LoginModelv3,
  LoginResponseModelv3,
  AppSettingsModelv3,
  UserSettingsModelv3,
} from '../../models/doctor';

import { FunctionsService } from '../../shared/functions/functions.service'; //"@ionic/angular";
//import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Constants } from '../../shared/constants';

import {
  AfterViewInit,
  ElementRef,
  Renderer2,
  Input,
  NgZone,
} from '@angular/core';
import {
  AlertController,
  GestureController,
  ModalController,
} from '@ionic/angular';
import { Gesture, GestureConfig } from '@ionic/core';
import { ViewChildren, QueryList } from '@angular/core';
import { IonGrid, IonContent, IonRow } from '@ionic/angular';
import { ChhAppPrivacyPolicyPage } from './../../chh-web-components/chh-app-privacy-policy/chh-app-privacy-policy.page';
import * as bcrypt from 'bcryptjs';
import { ChhAppChangePasswordPage } from '../../chh-web-components/chh-app-change-password/chh-app-change-password.page';

import { ChhAppCaseratesComponent } from '../../chh-web-components/chh-app-caserates/chh-app-caserates.component';

import { tick } from '@angular/core/testing';
import { ChhAppForgotPasswordComponent } from '../../chh-web-components/chh-app-forgot-password/chh-app-forgot-password.component';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public logindata: LoginData;
  public loginModel: LoginModel;
  public loginModelv3: LoginModelv3;
  public loginResponseModel: LoginResponseModel;
  public loginResponseModelv3: LoginResponseModelv3;
  public changePasswordModel: ChangePasswordModel;
  public appSettingsModelv3: AppSettingsModelv3;
  public userSettingsModelv3: UserSettingsModelv3;
  private ngUnsubscribe = new Subject();
  saltRounds = 10;
  resultJson;
  testDB: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toast: ToastService,
    private doctorService: DoctorService,
    public functionsService: FunctionsService,
    //protected $gaService: GoogleAnalyticsService,
    public constants: Constants,
    private gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2,
    private zone: NgZone,
    private modalController: ModalController,
    private patientService: PatientService,
    public alertController: AlertController
  ) {}
  isSetPrivacyPolicy: boolean = false;
  isPrivacyPolicy: boolean = false;
  loginresponse: any;
  hashedPassword: any;
  showPassword() {
    this.isActiveToggleTextPassword =
      this.isActiveToggleTextPassword == true ? false : true;
    this.isEyeOnOff = this.isEyeOnOff == true ? false : true;
  }
  isActiveToggleTextPassword: Boolean = true;
  isEyeOnOff: Boolean = true;
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }
  public getName() {
    return this.isEyeOnOff ? 'eye-off-outline' : 'eye-outline';
  }

  public postData = {
    username: '',
    password: '',
    // username: 'PGALBO',
    // password: '@Dell150790',
  };

  btnDisable: boolean = false;

  ngOnInit() {
    this.ngUnsubscribe = new Subject();
    this.postData.username = localStorage.getItem('srnm');
    this.loginResponseModel = new LoginResponseModel();
    this.onDarkModeEnable();
    //this.$gaService.pageView('/login', 'Login Page');
    if (localStorage.getItem('promptLogout') == '1') {
      this.timerExpired();
    }
    if (localStorage.getItem('testdb') == '1') {
      this.testDB = true;
    } else {
      this.testDB = false;
    }
  }
  /*V3 App*/
  checkInput() {
    this.btnDisable = true;
    if (this.postData.username == '' || this.postData.password == '') {
      this.functionsService.sorryDoc();
      this.btnDisable = false;
    } else {
      localStorage.setItem('username', btoa(this.postData.username));
      this.startLoginProcessV3();
    }
  }

  /*V3 App*/
  startLoginProcessV3() {
    localStorage.setItem('tokenExpired', '0');
    this.loginModelv3 = new LoginModelv3();
    this.loginModelv3.userNameOrEmail = this.postData.username;
    this.loginModelv3.password = this.postData.password;
    this.loginResponseModelv3 = new LoginResponseModelv3();
    let userIndentifier;
    let dualFlag1: boolean = false;
    let dualFlag2: boolean = false;
    this.doctorService
      .loginV3(this.loginModelv3)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.loginResponseModelv3 = <LoginResponseModelv3>res;
          let execflag: boolean = true;

          if (this.loginResponseModelv3.isAuthenticated == true) {
            this.loginResponseModelv3.roles.forEach((element) => {
              if (execflag) {
                if (element == 'Administrator') {
                  userIndentifier = 'Administrator';
                } else if (element == 'Executive') {
                  userIndentifier = 'Executive';
                  localStorage.setItem('role_flag', 'exec');
                  execflag = false;
                } else {
                  localStorage.setItem('role_flag', 'medcons');
                }
              }

              if (element == 'Executive') {
                dualFlag1 = true;
              }
              if (element == 'MedicalConsultant') {
                dualFlag2 = true;
              }
            });
            ////console.log("userIndentifier : "+userIndentifier);
          }
        },
        (error) => {
          //this.functionsService.logToConsole(error);
          this.functionsService.sorryDoc();
          this.btnDisable = false;
        },
        () => {
          if (this.loginResponseModelv3.isAuthenticated == true) {
            if (dualFlag1 == true && dualFlag2 == true) {
              this.loginAsMedExec();
            } else {
              if (userIndentifier == 'Administrator') {
                localStorage.setItem('id_token', this.loginResponseModelv3.jwt);
                this.storageService.store(
                  AuthConstants.AUTH,
                  this.loginResponseModelv3
                );
                this.userRolegetUserSettingsV3('administrator');
              } else if (userIndentifier == 'Executive') {
                localStorage.setItem('id_token', this.loginResponseModelv3.jwt);
                this.storageService.store(
                  AuthConstants.AUTH,
                  this.loginResponseModelv3
                );
                this.userRolegetUserSettingsV3('executive');
              } else {
                // this.loginResponseModelv3.roles.forEach(element => {
                if (this.loginResponseModelv3.jwt != null) {
                  localStorage.setItem(
                    'id_token',
                    this.loginResponseModelv3.jwt
                  );
                }
                if (this.loginResponseModelv3.isDefaultPasswordChanged) {
                  this.getUserSettingsV3();
                } else {
                  this.updatePasswordV3();
                }

                // });
              }
            }
          } else {
            this.functionsService.alert(
              this.loginResponseModelv3.message,
              'Okay'
            );
            this.btnDisable = false;
          }
          /*
        if(this.loginResponseModelv3.jwt != null){
          localStorage.setItem("id_token",this.loginResponseModelv3.jwt);
        }
        if(this.loginResponseModelv3.isDefaultPasswordChanged){
          this.getUserSettingsV3();
        }else{
          this.getUserSettingsV3();
          //this.updatePasswordV3();
        }*/
        }
      );
  }
  /*V3 App*/

  userRolegetUserSettingsV3(linkTo: any) {
    let jsonResponse: any;
    let settingsIndicator: any;
    this.doctorService
      .getUserSettingsV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          jsonResponse = res;
          jsonResponse = <UserSettingsModelv3>res;
          localStorage.setItem(
            'user_settings',
            btoa(JSON.stringify(jsonResponse))
          );
        },
        (error) => {},
        () => {
          Object.keys(jsonResponse).forEach((key) => {
            if (jsonResponse[key] == null) {
              settingsIndicator = false;
            } else {
              settingsIndicator = true;
            }

            //this.storageService.store(AuthConstants.AUTH, this.loginResponseModelv3);
            if (settingsIndicator) {
              //this.getAppsettingsV3();
              this.router.navigate(['/' + linkTo]).then(() => {
                window.location.reload();
              });
            } else {
              this.getAppsettingsV3();
              this.router.navigate(['/' + linkTo]).then(() => {
                window.location.reload();
              });
            }
          });
        }
      );
  }

  async loginAsMedExec() {
    this.alertController
      .create({
        header: 'Confirm Login',
        message: 'Login As',
        buttons: [
          {
            text: 'Medical Consultant',
            handler: () => {
              localStorage.setItem('role_flag', 'medcons');
              let xFlag: boolean = false;
              //this.loginResponseModelv3.roles.forEach(element => {
              ////console.log('check flag');
              if (this.loginResponseModelv3.jwt != null) {
                localStorage.setItem('id_token', this.loginResponseModelv3.jwt);
              }
              //if(!xFlag){
              if (this.loginResponseModelv3.isDefaultPasswordChanged) {
                this.getUserSettingsV3();
                xFlag = true;
              } else {
                this.updatePasswordV3();
                xFlag = true;
              }
              //}

              // });
            },
          },
          {
            text: 'Executive',
            handler: () => {
              localStorage.setItem('role_flag', 'exec');
              localStorage.setItem('id_token', this.loginResponseModelv3.jwt);
              this.storageService.store(
                AuthConstants.AUTH,
                this.loginResponseModelv3
              );
              this.userRolegetUserSettingsV3('executive');
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  getUserSettingsV3() {
    this.appSettingsModelv3 = new AppSettingsModelv3();
    this.userSettingsModelv3 = new UserSettingsModelv3();
    let settingsIndicator: any;
    let jsonResponse: any;
    this.doctorService
      .getUserSettingsV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          jsonResponse = res;
          this.userSettingsModelv3 = <UserSettingsModelv3>res;
          localStorage.setItem(
            'user_settings',
            btoa(JSON.stringify(this.userSettingsModelv3))
          );
          //this.functionsService.logToConsole(this.userSettingsModelv3);
        },
        (error) => {
          // this.functionsService.sorryDoc();
          this.functionsService.sorryDoc();
          this.btnDisable = false;
        },
        () => {
          let x = true;
          Object.keys(jsonResponse).forEach((key) => {
            if (x) {
              if (jsonResponse[key] == null) {
                settingsIndicator = false;
                x = false;
              } else {
                settingsIndicator = true;
              }
            }
          });
          if (settingsIndicator) {
            this.checkPrivacyPolicyV3();
          } else {
            this.doctorService
              .getAppSettingsV3()
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(
                (resdata: any) => {
                  this.appSettingsModelv3 = <AppSettingsModelv3>resdata;
                  this.userSettingsModelv3 = <UserSettingsModelv3>resdata;
                  localStorage.setItem(
                    'user_settings',
                    btoa(JSON.stringify(this.userSettingsModelv3))
                  );
                  //this.functionsService.logToConsole(this.appSettingsModelv3);
                },
                (error) => {
                  this.functionsService.sorryDoc();
                  this.btnDisable = false;
                },
                () => {
                  this.doctorService
                    .insertUserSettingsV3(this.appSettingsModelv3)
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe(
                      (resInsert: any) => {
                        //this.functionsService.logToConsole('insertUserSettingsV3 : '+resInsert);
                      },
                      (error) => {
                        // this.functionsService.sorryDoc();
                      },
                      () => {
                        this.checkPrivacyPolicyV3();
                      }
                    );
                }
              );
          }
        }
      );
  }

  getAppsettingsV3() {
    this.doctorService
      .getAppSettingsV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (resdata: any) => {
          this.appSettingsModelv3 = <AppSettingsModelv3>resdata;
          this.userSettingsModelv3 = <UserSettingsModelv3>resdata;
          localStorage.setItem(
            'user_settings',
            btoa(JSON.stringify(this.userSettingsModelv3))
          );
          //this.functionsService.logToConsole(this.appSettingsModelv3);
        },
        (error) => {
          this.functionsService.sorryDoc();
          this.btnDisable = false;
        },
        () => {
          this.doctorService
            .insertUserSettingsV3(this.appSettingsModelv3)

            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
              (resInsert: any) => {
                //this.functionsService.logToConsole('insertUserSettingsV3 : '+resInsert);
              },
              (error) => {
                // this.functionsService.sorryDoc();
              },
              () => {
                //this.checkPrivacyPolicyV3();
              }
            );
        }
      );
  }
  /*V3 App*/
  checkPrivacyPolicyV3() {
    let settingsIndicator: any;
    let jsonResponse: any;

    //this.functionsService.logToConsole(this.userSettingsModelv3.privacyPolicy);

    if (this.userSettingsModelv3.privacyPolicy == 0) {
      this.showPrivacyPolicyV3();
    } else {
      //this.functionsService.logToConsole('LOGIN');
      this.loginV3();
    }
  }
  /*V3 App*/
  async showPrivacyPolicyV3() {
    const modal = await this.modalController.create({
      component: ChhAppPrivacyPolicyPage,
      componentProps: { backdropDismiss: true, origin: 'login' },
    });
    modal.onDidDismiss().then((data) => {
      //this.functionsService.logToConsole(data);
      this.btnDisable = false;
      if (data.data) {
        //this.loginAction();
        this.userSettingsModelv3.privacyPolicy = '1';
        //this.functionsService.logToConsole(this.userSettingsModelv3);
        this.doctorService
          .updateUserSettingsV3(this.userSettingsModelv3)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe();
        this.loginV3();
      }
    });
    return await modal.present();
  }
  /*V3 App*/
  async updatePasswordV3() {
    ////this.functionsService.logToConsole(this.resultJson.data);

    const modal = await this.modalController.create({
      component: ChhAppChangePasswordPage,
      componentProps: {
        old_password: this.postData.password,
        backdropDismiss: true,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data == 'Success') {
        //this.hashedPassword = data.data;
        // this.postData.password = data.role;
        this.postData.password = '';
        this.modalUpdateV3(
          this.constants.UI_COMPONENT_TEXT_VALUE_PASSWORD_SUCCESS_TITLE,
          this.constants.UI_COMPONENT_TEXT_VALUE_UPDATE_PASSWORD_SUCCESS_BODY,
          true
        );
        this.btnDisable = false;
      } else if (data.data == 'False') {
        this.btnDisable = false;
        this.modalUpdateV3(
          this.constants.UI_COMPONENT_TEXT_VALUE_PASSWORD_FAILED_TITLE,
          this.constants.UI_COMPONENT_TEXT_VALUE_UPDATE_PASSWORD_FAILED_BODY,
          false
        );
      } else if (data.data == 'None') {
        this.btnDisable = false;
        //console.log('none');
      } else {
        this.btnDisable = false;
        this.modalUpdateV3(
          this.constants.UI_COMPONENT_TEXT_VALUE_PASSWORD_FAILED_TITLE,
          data.data,
          false
        );
      }
    });
    return await modal.present();
  }
  /*V3 App*/
  async modalUpdateV3(header, message, data) {
    this.btnDisable = false;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            if (data) {
              this.getUserSettingsV3();
            }
          },
        },
      ],
    });
    await alert.present();
  }
  /*V3 App*/
  loginV3() {
    // let data = JSON.stringify(this.loginResponseModel);
    // data = '[' + data + ']';
    // this.logindata = JSON.parse(data);
    /*//this.functionsService.logToConsole(this.loginResponseModel);
    //this.functionsService.logToConsole(JSON.stringify(this.loginResponseModel));*/

    this.storageService.store(AuthConstants.AUTH, this.loginResponseModelv3);
    localStorage.setItem('isIdle', '1');
    localStorage.setItem('username', btoa(this.postData.username));
    localStorage.setItem('modaled', '0');
    this.router.navigate(['/menu/in-patients']).then(() => {
      window.location.reload();
    });
    /*this.router.navigate(['/menu/dashboard']).then(() => {
      window.location.reload();
    });*/
  }

  async forgotpassword() {
    const modal = await this.modalController.create({
      component: ChhAppForgotPasswordComponent,

      componentProps: {
        backdropDismiss: true,
      },
    });
    modal.onDidDismiss().then((data) => {
      //this.functionsService.logToConsole(data);
    });
    return await modal.present();
  }

  /*async ngAfterViewInit() {
   const rectangle = document.querySelector('.rectangle');
     
    const options1: GestureConfig = {
      el: rectangle,
      threshold: 0,
      gestureName: 'slide-drawer-swipe',
    onStart: (ev) => { 

      this.zone.run(() =>{
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
        this.isEyeOnOff = (this.isEyeOnOff==true)?false:true;
      })

    },onEnd: ()=>{
      this.zone.run(() =>{
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
        this.isEyeOnOff = (this.isEyeOnOff==true)?false:true;
      })

    }
    };
    const gesture1 = await this.gestureCtrl.create(options1);
    gesture1.enable();
  }*/

  loginv2() {
    this.loginModel = new LoginModel();
    this.loginModel.mode = Consta.mode;
    this.changePasswordModel = new ChangePasswordModel();
    this.loginModel.appCode = Consta.appCode;
    this.loginModel.username = this.postData.username;
    this.loginModel.password = this.postData.password;
    localStorage.setItem('username', btoa(this.postData.username));

    this.loginModelv3 = new LoginModelv3();
    this.loginModelv3.userNameOrEmail = this.postData.username;
    this.loginModelv3.password = this.postData.password;
    //this.functionsService.logToConsole(this.loginModelv3);

    this.patientService
      .loginv2(this.loginModelv3)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.loginResponseModelv3 = <LoginResponseModelv3>res;
          //this.resultJson = res;

          if (this.loginResponseModelv3.jwt != null) {
            localStorage.setItem('id_token', this.loginResponseModelv3.jwt);
          }
        },
        (error) => {
          //this.functionsService.logToConsole(error);
        },
        () => {
          //this.functionsService.logToConsole(this.loginResponseModelv3);
          //this.functionsService.logToConsole(this.loginResponseModelv3.isDefaultPasswordChanged);
          if (this.loginResponseModelv3.isDefaultPasswordChanged) {
            this.checkPrivacyPolicyV2();
          } else {
            //this.updatePassword();
          }
          /*
        if (!(typeof this.resultJson.ErrorCode !== 'undefined')) {
          if (this.resultJson.hl <= 7) {
            this.updatePassword();
          } else {
            this.checkPrivacyPolicyV2();
          } 
        } else {
          this.btnDisable = false;
          this.functionsService.alert(this.resultJson.ErrorDescription, 'Okay');
        }*/

          /*this.changePasswordModel.appCode = 'DPP';
                  this.changePasswordModel.mode = 'T';
                  this.changePasswordModel.newPassword = '@Dell150790';
                  this.changePasswordModel.oldPassword = '1234abcd';
                  this.changePasswordModel.username = 'PGALBO';
                  this.patientService.changePasswordV2(this.changePasswordModel).subscribe(
                    (res: any) => {
                     //this.functionsService.logToConsole(res);
                     
                    },
                    (error) => {
                    //this.functionsService.logToConsole(error);
                    },
                    () => {
                 
                    }
                  );*/
        }
      );
  }
  onDarkModeEnable() {
    this.renderer.setAttribute(document.body, 'color-theme', 'light');
  }
  async timerExpired() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logged out',
      message:
        "For you and your patients' security, we logged you out. Please log in again.",
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            localStorage.removeItem('promptLogout');
          },
        },
      ],
    });
    await alert.present();
  }

  async testdbalert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Admins Only',
      // inputs: [{type: 'text', placeholder: 'Confirmation code', id: 'code'}],
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
        },
      ],
      buttons: [
        {
          text: 'Confirm',
          handler: (blah) => {
            if (blah.password == '0013969') {
              this.checkTestDB();
            } else {
              this.testDB = !this.testDB;
            }
          },
        },
        {
          text: 'Cancel',
          handler: (blah) => {
            this.testDB = !this.testDB;
          },
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }
  checkTestDB() {
    if (this.testDB) {
      localStorage.setItem('testdb', '1');
    } else {
      localStorage.setItem('testdb', '0');
    }
    window.location.reload();
  }

  async modalUpdate(header, message, data) {
    this.btnDisable = false;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            if (data) {
              //this.loginAction();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async updatePassword() {
    ////this.functionsService.logToConsole(this.resultJson.data);

    const modal = await this.modalController.create({
      component: ChhAppChangePasswordPage,
      componentProps: {
        old_password: this.resultJson.data,
        backdropDismiss: true,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (
        typeof data.data !== 'undefined' &&
        typeof data.role !== 'undefined'
      ) {
        //this.hashedPassword = data.data;
        // this.postData.password = data.role;
        this.postData.password = '';
        this.modalUpdate(
          this.constants.UI_COMPONENT_TEXT_VALUE_PASSWORD_SUCCESS_TITLE,
          this.constants.UI_COMPONENT_TEXT_VALUE_UPDATE_PASSWORD_SUCCESS_BODY,
          true
        );
        this.btnDisable = false;
      } else if (data.data == 'Error') {
        this.btnDisable = false;
        this.modalUpdate(
          this.constants.UI_COMPONENT_TEXT_VALUE_PASSWORD_FAILED_TITLE,
          this.constants.UI_COMPONENT_TEXT_VALUE_UPDATE_PASSWORD_FAILED_BODY,
          false
        );
      } else {
        this.btnDisable = false;
      }
    });
    return await modal.present();
  }

  /*
  checkbcrypt() {
    let json =
      '{"appCode": "DPP","username": "' + this.postData.username + '"}';
    this.patientService.commonLoginGet(json).subscribe(
      (res: any) => {
        this.resultJson = res;
      },
      (error) => {
        this.btnDisable = false;
        this.functionsService.sorryDoc();
      },
      () => {
        if (!(typeof this.resultJson.ErrorCode !== 'undefined')) {
          if (this.resultJson.data.length <= 10) {
            if (this.postData.password == this.resultJson.data) {
              localStorage.setItem('username', btoa(this.postData.username));
              this.updatePassword();
            } else {
              this.functionsService.alert('Invalid Password', 'Okay');
              this.btnDisable = false;
            }
          } else {
            localStorage.setItem('username', btoa(this.postData.username));
            this.hashedPassword = this.resultJson.data;
            //this.loginUser();
            //this.btnDisable = false;
          }
        } else {
          this.btnDisable = false;
          this.functionsService.alert(this.resultJson.ErrorDescription, 'Okay');
        }
      }
    );
  }*/
  /*
  loginUser() {
    bcrypt
      .compare(this.postData.password, this.hashedPassword)
      .then((result) => {
        if (result) {
          let json =
            '{"appCode": "DPP","username": "' +
            this.postData.username +
            '","password": "' +
            this.hashedPassword +
            '"}';
          this.patientService.commonLoginGet(json).subscribe(
            (res: any) => {
              this.loginresponse = res;
            },
            (error) => {
              this.btnDisable = false;
            },
            () => {
          
              if (typeof this.loginresponse.ErrorCode !== 'undefined') {
                this.functionsService.alert(
                  this.loginresponse.ErrorDescription,
                  'Okay'
                );
              } else {
                this.btnDisable = true;
                this.logindata = <LoginData>this.loginresponse;
                this.checkPrivacyPolicyV2();
              }
            }
          );
        } else {
          this.btnDisable = false;
          this.functionsService.alert('Invalid Password', 'Okay');
        }
      });
  }
*/
  /*
  checkUser(){
   
      let x:boolean=false;
      this.authService.doctorsPortalHISLogin(this.postData.username, this.postData.password).subscribe(
        (res: any) => {
          this.loginresponse = res; 
        },(error) => {
          this.btnDisable = false;
          this.functionsService.alert(
            "Sorry, Dok. We cannot log you in at the moment. Please try again.",
            "Okay"
          );
        },
        () => {
          this.btnDisable=false
          if(typeof this.loginresponse.ErrorCode !== 'undefined'){
              this.functionsService.alert(this.loginresponse.ErrorDescription,"Okay");
            }else{
              this.logindata = <LoginData>this.loginresponse;
              this.checkPrivacyPolicy();
            }
        }
      );



  }*/

  checkPrivacyPolicyV2() {
    /* get user settings,
      if user settings is empty, promt the privacy policy modal

      if user accepts privacy policy

      go to login and add privacy policy on API

    */

    let rsmJson;
    let y = 0;
    this.patientService
      .getUserSettingsV2(this.postData.username)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          rsmJson = res;
          //this.functionsService.logToConsole(res);
        },
        (error) => {
          this.functionsService.sorryDoc();
        },
        () => {
          if (Object.keys(rsmJson).length >= 1) {
            let data = JSON.stringify(rsmJson);
            data = '[' + data + ']';
            let adat = JSON.parse(data);
            adat.forEach((el) => {
              if (typeof el.privacyPolicy !== 'undefined') {
                if (el.privacyPolicy.accepted == 1) {
                  this.isSetPrivacyPolicy = true;
                  this.isPrivacyPolicy = true;
                } else {
                  this.isSetPrivacyPolicy = true;
                  this.isPrivacyPolicy = false;
                }
              } else {
                this.isSetPrivacyPolicy = false;
              }
            });
          } else {
            this.isSetPrivacyPolicy = false;
          }
          if (
            this.isSetPrivacyPolicy == false ||
            this.isPrivacyPolicy == false
          ) {
            this.showPrivacyPolicy();
          } else {
            this.loginAction();
          }
        }
      );
  }
  ionViewWillLeave() {
    this.btnDisable = false;
  }
  async showPrivacyPolicy() {
    const modal = await this.modalController.create({
      component: ChhAppPrivacyPolicyPage,
      componentProps: { backdropDismiss: true, origin: 'login' },
    });
    modal.onDidDismiss().then((data) => {
      //this.functionsService.logToConsole(data);

      if (data.data) {
        this.loginAction();
      } else {
        this.isSetPrivacyPolicy = false;
        this.isPrivacyPolicy = false;
      }
    });
    return await modal.present();
  }

  loginAction() {
    //this.functionsService.logToConsole('loginaction');

    if (this.isSetPrivacyPolicy == false) {
      this.patientService
        .getAppSettingV2()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res: any) => {
            Object.keys(res).forEach((key) => {
              var value = res[key];
              Object.keys(value).forEach((lock) => {
                var valuex = value[lock];
                if (key != 'appCode') {
                  if (key == 'privacyPolicy' && lock == 'accepted') {
                    valuex = 1;
                  }
                  if (key == 'billingContact') {
                    ////this.functionsService.logToConsole(lock);
                  }

                  let tempJson1 = new InserUSerSettingsModel();
                  tempJson1.username = this.postData.username;
                  tempJson1.userReference = this.loginResponseModel.dr_code;
                  tempJson1.appCode = Consta.appCode;
                  tempJson1.mode = Consta.mode;
                  tempJson1.setting = key;
                  tempJson1.property = lock;
                  tempJson1.value = valuex;
                  //this.functionsService.logToConsole('tempJson1 :');
                  //this.functionsService.logToConsole(JSON.stringify(tempJson1));

                  this.patientService
                    .insertUserSettingsV2(tempJson1)
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((res2: any) => {
                      //this.functionsService.logToConsole(res2);
                    });
                }
              });
            });
          },
          (error) => {},
          () => {
            this.loginaction1();
          }
        );
    } else if (this.isSetPrivacyPolicy == true) {
      let smpJSON1 = new InserUSerSettingsModel();
      smpJSON1.username = this.postData.username;
      smpJSON1.userReference = this.loginResponseModel.dr_code;
      smpJSON1.appCode = Consta.appCode;
      smpJSON1.mode = Consta.mode;
      smpJSON1.setting = 'privacyPolicy';
      smpJSON1.property = 'accepted';
      smpJSON1.value = '1';
      if (!this.isPrivacyPolicy) {
        this.patientService
          .updateUserSettings(smpJSON1)

          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((res1: any) => {
            this.loginaction1();
          });
      } else {
        this.loginaction1();
      }
    }
  }
  loginaction1() {
    // let data = JSON.stringify(this.loginResponseModel);
    // data = '[' + data + ']';
    // this.logindata = JSON.parse(data);
    /*//this.functionsService.logToConsole(this.loginResponseModel);
    //this.functionsService.logToConsole(JSON.stringify(this.loginResponseModel));*/

    this.storageService.store(AuthConstants.AUTH, this.loginResponseModel);
    localStorage.setItem('isIdle', '1');
    localStorage.setItem('username', btoa(this.postData.username));
    this.router.navigate(['/menu/dashboard']).then(() => {
      window.location.reload();
    });
  }
  /*
    this.authService.doctorsPortalLogin(this.postData.username, this.postData.password).subscribe(
        (res: any) => {
          this.loginresponse = res;
        },(error) => {
          this.btnDisable = false;
          this.functionsService.alert(
            "Sorry, Dok. We cannot log you in at the moment. Please try again.",
            "Okay"
          );
        },
        () => {
          if (this.loginresponse.length != "0") {
            if(this.isSetPrivacyPolicy == false){
              this.patientService.getAppSetting('DPP').subscribe(
                (res: any) => {
                  Object.keys(res).forEach((key) => {
                    var value = res[key];
                    Object.keys(value).forEach((lock) => {
                      var valuex = value[lock];
                      if(key != 'appCode'){
                        ////this.functionsService.logToConsole(key + ':' + lock + ':' + valuex);
                        if(key == 'privacyPolicy' && lock == 'accepted'){
                          valuex = 1;
                        }
                        let tempJson = '{"username": "'+this.postData.username+'","appCode": "DPP","setting": "'+key+'","property": "'+lock+'","value": "'+valuex+'"}';
                          
                        this.patientService.insertUserSettings(tempJson).subscribe((res2: any) => {});   
                      }
                    });
                  });
              });
            }else if(this.isSetPrivacyPolicy == true){
              let smpJSON = '{"username": "'+this.postData.username+'","appCode": "DPP","setting": "privacyPolicy","property": "accepted","value": "1"}';
           
              if(!this.isPrivacyPolicy){
                this.patientService.updateUserSettings(smpJSON).subscribe((res1: any) => {});
              }
            }
            if (this.loginresponse.Message) {
              this.functionsService.alert(this.loginresponse.Message, "Okay");
            } else {
              this.logindata = <LoginData>this.loginresponse;
              this.storageService.store(AuthConstants.AUTH, this.logindata);
              this.router.navigate(["/menu/dashboard"]);
            }
          } else {
            this.functionsService.alert(
              "Oops! You might have entered a different username or password. Please try again.",
              "Okay"
            );
          }
          this.btnDisable = false;
        }
      );
*/

  /*
        if (this.validateInputs()) {
          this.authService.logintest(this.postData.username, this.postData.password).subscribe(
            (res: any) => {
              if (res == "true:D") {
                this.doctorService.retrieveUserDetails(this.postData.username).subscribe(
                  (result:any)=>{
                    //this.functionsService.logToConsole("result.last_name --> "+result.last_name);
                    localStorage.setItem('dr_code',result.last_name);
                    this.doctorService.getDoctorName(result.last_name).subscribe(
                      (doctordetail:any)=>{
                        //this.functionsService.logToConsole("doctordetail --> "+JSON.stringify(doctordetail));
                          this.storageService.store(AuthConstants.AUTH, doctordetail);
                          this.router.navigate(['/menu/tab1']);
                      }
                    );
                  }
                );
              } else {
                this.toast.presentToast('incorrect password.');
              }
            },(error: any) => {
            }
          );
        } else {
        }
      */
  /**Working COPY DO NOT DELETE */
  /*For Doctors Portal

        /*For Doctors Portal */
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
