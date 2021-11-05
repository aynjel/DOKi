import { Component, Renderer2 } from "@angular/core";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
//import { SignalRService } from '../services/signal-r.service';
import { StorageService } from "../services/storage/storage.service";
import { AuthConstants } from "../config/auth-constants";
import { Constants } from "../shared/constants";
import { CookieService } from "../shared/cookie.service"; 
import { FunctionsService } from "../shared/functions/functions.service"
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient/patient.service';
import { AuthService } from '../services/auth/auth.service';
import { LoginData } from "../models/login-data.model";
import {UserSettingsModelv3,LoginResponseModelv3,RevokeTokenV3} from 'src/app/models/doctor';
import { InPatientData,ProfessionalFeeModelv3 } from 'src/app/models/in-patient.model';
import { BehaviorSubject } from 'rxjs';
import { DoctorService } from "../services/doctor/doctor.service";


@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  public logindata: LoginResponseModelv3;
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  userData$ = new BehaviorSubject<any>([]);
  badgecount = 0;
  isDesktop: boolean;
  signalList: any = [];
  dr_code;
  dr_username;
  public revokeTokenV3: RevokeTokenV3; 
  constructor(
    private screensizeService: ScreenSizeService,
    private storageService: StorageService,
    private renderer: Renderer2,
    public constants: Constants,
    public cookieService:CookieService,
    public functionsService: FunctionsService,
    public router:Router,
    private patientService:PatientService,
    private authService: AuthService,
    private doctorService: DoctorService
  ) {

    localStorage.setItem("modaled","0");
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        //window.location.reload();
      }

      this.isDesktop = isDesktop;
    });
    /*this.signalRService.signalReceived.subscribe((signal: any) => {
      this.functionsService.logToConsole("-->" + signal.msg);
      this.badgecount = signal.msg;
      this.signalList.push(signal);
    });*/
  }

  ionViewWillEnter() {
    /*
    if (localStorage.getItem("darkmode") == null) {
      localStorage.setItem("darkmode", "false");
    }
    if (localStorage.getItem("darkmode") == "true") {
      //this.functionsService.logToConsole("true");
      this.functionsService.logToConsole("true");
      this.renderer.setAttribute(document.body, "color-theme", "dark");
    } else {
      this.functionsService.logToConsole("false");
      this.renderer.setAttribute(document.body, "color-theme", "light");
    }*/
    console.log('checkAppearance');
    
    this.logindata = <LoginResponseModelv3>this.authService.userData$.getValue();
    this.dr_code = this.logindata.doctorCode;
    this.dr_username = atob(localStorage.getItem("username"));
/*
    this.patientService.getUserSettingsV2(this.dr_username).subscribe(
      (res: any) => {       
        console.log(res);
        
        if(Object.keys(res).length >= 1){
          let data = JSON.stringify(res);data = '['+data+']';let adat = JSON.parse(data);
          adat.forEach(el => {
            if(typeof el.appearance !== 'undefined'){
              if(el.appearance.darkmode == 1){
                this.renderer.setAttribute(document.body, "color-theme", "dark");
              }else{
                this.renderer.setAttribute(document.body, "color-theme", "light");
              }
            }else{
              this.renderer.setAttribute(document.body, "color-theme", "light");
            }
          });
        }
      },
      (error)=>{
      },() =>{
      });
      */
  }

  logout() {
    this.revokeTokenV3 = new RevokeTokenV3();
    this.revokeTokenV3.jwt = "";
    //this.revokeTokenV3 = new RevokeTokenV3();
    //this.revokeTokenV3.jwt = localStorage.getItem("id_token");
    console.log('Logging out -- 1');
    
    console.log(this.functionsService.get('refreshToken'));
    console.log('Logging out -- 2');
    console.log(this.cookieService.getCookie('refreshToken'));
    

    const _name = 'refreshToken';
    let value = `; ${document.cookie}`.match(`;\\s*${_name}=([^;]+)`);

    console.log(value);
    

    this.doctorService.revokeTokenV3(this.revokeTokenV3).subscribe((res: any) => {
      console.log(res);
    });
    

 
    this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
      this.userData$.next('');
      localStorage.removeItem('_cap_userDataKey');
      localStorage.removeItem('username');
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('hasloggedin', '1');

      this.router.navigate(['/login']);
    });

  }
}
