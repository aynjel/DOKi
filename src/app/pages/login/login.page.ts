import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthConstants } from "../../config/auth-constants";
import { DoctorConstants } from "../../config/auth-constants";
import { AuthService } from "../../services/auth/auth.service";
import { DoctorService } from "../../services/doctor/doctor.service";
import { StorageService } from "../../services/storage/storage.service";
import { ToastService } from "../../services/toast/toast.service";
import { BehaviorSubject } from "rxjs";
import { DoctorInfoGlobal } from "../../shared/doctor-info-global";
import { LoginData } from "../../models/login-data.model";
import { FunctionsService } from "../../shared/functions/functions.service"; //"@ionic/angular";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { Constants } from "../../shared/constants";

import {  AfterViewInit, ElementRef, Renderer2, Input, NgZone } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Gesture, GestureConfig } from '@ionic/core';
import { ViewChildren, QueryList } from "@angular/core";
import {  IonGrid, IonContent,IonRow } from "@ionic/angular";


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
    private zone:NgZone
  ) {}







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

  loginAction() {
    this.btnDisable = true;
    this.authService
      .doctorsPortalLogin(this.postData.username, this.postData.password)
      .subscribe(
        (res: any) => {
          /*this.functionsService.logToConsole("res :");
          this.functionsService.logToConsole(res);*/
          if (res.length != "0") {
            if (res.Message) {
              this.functionsService.alert(res.Message, "Okay");
            } else {
              this.logindata = <LoginData>res;
              this.storageService.store(AuthConstants.AUTH, this.logindata);
              this.router.navigate(["/menu/dashboard"]);
            }
          } else {
            this.functionsService.alert(
              "Oops! You might have entered a different username or password. Please try again.",
              "Okay"
            );
            //this.toast.presentToast('Incorrect Authentication Details.');
          }
        },
        (error) => {
          this.btnDisable = false;
          this.functionsService.alert(
            "Sorry, Doc. We cannot log you in at the moment. Please try again.",
            "Okay"
          );
          // this.toast.presentToast('Server Error');
        },
        () => {
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
