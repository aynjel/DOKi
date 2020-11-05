import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthConstants } from "../../config/auth-constants";
import { DoctorConstants } from "../../config/auth-constants";
import { AuthService } from "../../services/auth/auth.service";
import { DoctorService } from "../../services/doctor/doctor.service";
import { PatientService } from "../../services/patient/patient.service";
import { StorageService } from "../../services/storage/storage.service";
import { ToastService } from "../../services/toast/toast.service";
import { BehaviorSubject } from "rxjs";
import { DoctorInfoGlobal } from "../../shared/doctor-info-global";
import { LoginData } from "../../models/login-data.model";
import { FunctionsService } from "../../shared/functions/functions.service"; //"@ionic/angular";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { Constants } from "../../shared/constants";

import {  AfterViewInit, ElementRef, Renderer2, Input, NgZone } from '@angular/core';
import { GestureController, ModalController } from '@ionic/angular';
import { Gesture, GestureConfig } from '@ionic/core';
import { ViewChildren, QueryList } from "@angular/core";
import {  IonGrid, IonContent,IonRow } from "@ionic/angular";
import { ChhAppPrivacyPolicyPage } from "./../../chh-web-components/chh-app-privacy-policy/chh-app-privacy-policy.page"

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements AfterViewInit {
  public logindata: LoginData;

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
    private zone:NgZone,
    private modalController: ModalController,
    private patientService:PatientService
  ) {}
    isSetPrivacyPolicy:boolean = false;
    isPrivacyPolicy:boolean = false;






  async ngAfterViewInit() {
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
    username: "",
    password: "",
  };

  btnDisable: boolean = false;

  ngOnInit() {
    this.$gaService.pageView("/login", "Login Page");
  }

  checkPrivacyPolicy(){

    /* get user settings,
      if user settings is empty, promt the privacy policy modal

      if user accepts privacy policy

      go to login and add privacy policy on API

    */

   let y=0;

    
    this.patientService.getUserSettings('DPP',this.postData.username).subscribe(
        (res: any) => {       
         
          if(Object.keys(res).length >= 1){
            let data = JSON.stringify(res);data = '['+data+']';let adat = JSON.parse(data);
            adat.forEach(el => {
              if(typeof el.privacyPolicy !== 'undefined'){
                if(el.privacyPolicy.accepted == 1){
                  this.isSetPrivacyPolicy = true;this.isPrivacyPolicy = true;
                }else{
                  this.isSetPrivacyPolicy = true;this.isPrivacyPolicy = false;
                }
              }else{
                this.isSetPrivacyPolicy = false;
              }
            });
          }else{this.isSetPrivacyPolicy = false;}
        },
        (error)=>{
          this.functionsService.alert(
            "Sorry, Doc. We cannot log you in at the moment. Please try again.",
            "Okay"
          );
        },() =>{
            if(this.isSetPrivacyPolicy == false || this.isPrivacyPolicy == false){
              this.privacyPolicy();
            }else{this.loginAction();}
        });
  }
  async privacyPolicy(){
    const modal = await this.modalController.create({
      component: ChhAppPrivacyPolicyPage,
      componentProps: {
        backdropDismiss: true,
        'origin': 'login'
      },
    });
    modal.onDidDismiss().then((data) => {
      if(data.data){this.loginAction();}
      else{this.isSetPrivacyPolicy = false;this.isPrivacyPolicy = false;}
    });
    return await modal.present();
  }


  loginAction() {
    let loginresponse;
    this.btnDisable = true;
    this.authService
      .doctorsPortalLogin(this.postData.username, this.postData.password).subscribe(
        (res: any) => {
          loginresponse = res;
        },(error) => {
          this.btnDisable = false;
          this.functionsService.alert(
            "Sorry, Doc. We cannot log you in at the moment. Please try again.",
            "Okay"
          );
        },
        () => {
          if (loginresponse.length != "0") {
            /* check if privacy policy is true or false*/
            if(this.isSetPrivacyPolicy == false){
              this.patientService.getAppSetting('DPP').subscribe(
                (res: any) => {
                  Object.keys(res).forEach((key) => {
                    var value = res[key];
                    Object.keys(value).forEach((lock) => {
                      var valuex = value[lock];
                      if(key != 'appcode'){
                        //console.log(key + ':' + lock + ':' + valuex);
                        if(key == 'privacyPolicy' && lock == 'accepted'){
                          valuex = 1;
                        }
                        let tempJson = '{"username": "'+this.postData.username+'","appcode": "DPP","setting": "'+key+'","property": "'+lock+'","value": "'+valuex+'"}';
                          
                        this.patientService.insertUserSettings(tempJson).subscribe((res2: any) => {});   
                      }
                    });
                  });
              });
            }else if(this.isSetPrivacyPolicy == true){
              let smpJSON = '{"username": "'+this.postData.username+'","appcode": "DPP","setting": "privacyPolicy","property": "accepted","value": "1"}';
           
              if(!this.isPrivacyPolicy){
                this.patientService.updateUserSettings(smpJSON).subscribe((res1: any) => {});
              }
            }
            if (loginresponse.Message) {
              this.functionsService.alert(loginresponse.Message, "Okay");
            } else {
              this.logindata = <LoginData>loginresponse;
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


}
