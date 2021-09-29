import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants, Consta } from '../../config/auth-constants';
import { DoctorConstants } from '../../config/auth-constants';
import { AuthService } from '../../services/auth/auth.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { PatientService } from '../../services/patient/patient.service';
import { StorageService } from '../../services/storage/storage.service';
import { ToastService } from '../../services/toast/toast.service';
import { BehaviorSubject } from 'rxjs';
import { DoctorInfoGlobal } from '../../shared/doctor-info-global';
import { LoginData } from '../../models/login-data.model';
import { LoginModel,ChangePasswordModel,LoginResponseModel,InserUSerSettingsModel } from '../../models/patient';


import { FunctionsService } from '../../shared/functions/functions.service'; //"@ionic/angular";
import { GoogleAnalyticsService } from 'ngx-google-analytics';
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
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public logindata: LoginData;
  public loginModel: LoginModel;
  public loginResponseModel: LoginResponseModel;
  public changePasswordModel: ChangePasswordModel; 
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
    protected $gaService: GoogleAnalyticsService,
    public constants: Constants,
    private gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2,
    private zone: NgZone,
    private modalController: ModalController,
    private patientService: PatientService,
    public alertController: AlertController
  ) { 


  }
  isSetPrivacyPolicy: boolean = false;
  isPrivacyPolicy: boolean = false;
  loginresponse: any;
  hashedPassword: any;

  showPassword() {
    this.isActiveToggleTextPassword =
      this.isActiveToggleTextPassword == true ? false : true;
    this.isEyeOnOff = this.isEyeOnOff == true ? false : true;
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
  };

  btnDisable: boolean = false;

  ngOnInit() {
    this.loginResponseModel = new LoginResponseModel;
    this.$gaService.pageView('/login', 'Login Page');
    if (localStorage.getItem('promptLogout') == '1') {
      this.timerExpired();
    }


    if (localStorage.getItem('testdb') == '1') {
      this.testDB = true;
    } else {
      this.testDB = false;
    }

  }







  loginv2(){
    this.loginModel = new LoginModel();
    this.loginModel.mode = Consta.mode;
    this.changePasswordModel = new ChangePasswordModel();
    this.loginModel.appCode = Consta.appCode;
    this.loginModel.username = this.postData.username;
    this.loginModel.password = this.postData.password;
    localStorage.setItem('username', btoa(this.postData.username));
    this.patientService.loginv2(this.loginModel).subscribe((res: any) => {
        this.loginResponseModel = <LoginResponseModel>res;
        this.resultJson = res;
        if(this.loginResponseModel.jwt.length > 100){
          localStorage.setItem("id_token",this.loginResponseModel.jwt);
        }
      },(error) => {
       console.log(error);
      },() => {
        if (!(typeof this.resultJson.ErrorCode !== 'undefined')) {
          if (this.resultJson.hl <= 10) {
              this.updatePassword();
          } else {
            this.checkPrivacyPolicyV2();
            /*localStorage.setItem('username', btoa(this.postData.username));
            this.hashedPassword = this.resultJson.data;
            this.loginUser();*/
          } 
        } else {
          this.btnDisable = false;
          this.functionsService.alert(this.resultJson.ErrorDescription, 'Okay');
        }

       
     


                  /*this.changePasswordModel.appCode = 'DPP';
                  this.changePasswordModel.mode = 'T';
                  this.changePasswordModel.newPassword = '@Dell150790';
                  this.changePasswordModel.oldPassword = '1234abcd';
                  this.changePasswordModel.username = 'PGALBO';
                  this.patientService.changePasswordV2(this.changePasswordModel).subscribe(
                    (res: any) => {
                     console.log(res);
                     
                    },
                    (error) => {
                    console.log(error);
                    },
                    () => {
                 
                    }
                  );*/

      }
    );
    

  }


































  async timerExpired() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: 'Logged out',
      message: "For you and your patients' security, we logged you out. Please log in again.",
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            localStorage.removeItem('promptLogout');
          }
        }
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
          type: 'password'
        }
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
          }
        },
        {
          text: 'Cancel',
          handler: (blah) => {
            this.testDB = !this.testDB;
          }, role: 'cancel'
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
  checkInput() {
    this.btnDisable = true;
    if (this.postData.username == '' || this.postData.password == '') {
      this.functionsService.sorryDoc();
      this.btnDisable = false;
    } else {
      //this.checkbcrypt();
      this.loginv2();
    }
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
    //console.log(this.resultJson.data);

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
        this.postData.password = "";
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
    this.patientService.commonValidate(json).subscribe(
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
    this.patientService.getUserSettingsV2(this.postData.username).subscribe(
      (res: any) => {
          rsmJson = res;
      },(error) => {
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
    console.log('loginaction');


      if (this.isSetPrivacyPolicy == false) {
        this.patientService.getAppSettingV2().subscribe((res: any) => {
          Object.keys(res).forEach((key) => {
            var value = res[key];
            Object.keys(value).forEach((lock) => {
              var valuex = value[lock];
              if (key != 'appCode') {
                if (key == 'privacyPolicy' && lock == 'accepted') {
                  valuex = 1;
                }
                if (key == 'billingContact') {
                  //console.log(lock);
                }

                let tempJson1 = new InserUSerSettingsModel;
                tempJson1.username = this.postData.username;
                tempJson1.userReference = this.loginResponseModel.dr_code;
                tempJson1.appCode = Consta.appCode;
                tempJson1.mode = Consta.mode;
                tempJson1.setting = key;
                tempJson1.property = lock;
                tempJson1.value= valuex;


                this.patientService
                  .insertUserSettingsV2(tempJson1)
                  .subscribe((res2: any) => {this.loginaction1(); });
              }
            });
          });
        });
      } else if (this.isSetPrivacyPolicy == true) {
          let smpJSON1 = new InserUSerSettingsModel;
          smpJSON1.username = this.postData.username;
          smpJSON1.userReference = this.loginResponseModel.dr_code;
          smpJSON1.appCode = Consta.appCode;
          smpJSON1.mode = Consta.mode;
          smpJSON1.setting = "privacyPolicy";
          smpJSON1.property = "accepted";
          smpJSON1.value= "1";
        if (!this.isPrivacyPolicy) {
          this.patientService
            .updateUserSettings(smpJSON1)
            .subscribe((res1: any) => { this.loginaction1();});
        }else{
          this.loginaction1();
        }
      }


  
  }
  loginaction1(){
    // let data = JSON.stringify(this.loginResponseModel);
    // data = '[' + data + ']';
    // this.logindata = JSON.parse(data);
    console.log(this.loginResponseModel);
    console.log(JSON.stringify(this.loginResponseModel));
    
    
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
                        //console.log(key + ':' + lock + ':' + valuex);
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
                    this.functionsService.logToConsole("result.last_name --> "+result.last_name);
                    localStorage.setItem('dr_code',result.last_name);
                    this.doctorService.getDoctorName(result.last_name).subscribe(
                      (doctordetail:any)=>{
                        this.functionsService.logToConsole("doctordetail --> "+JSON.stringify(doctordetail));
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
  
}
