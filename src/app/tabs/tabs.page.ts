import { Component, Renderer2 } from "@angular/core";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
//import { SignalRService } from '../services/signal-r.service';
import { StorageService } from "../services/storage/storage.service";
import { AuthConstants } from "../config/auth-constants";
import { Constants } from "../shared/constants";
import { FunctionsService } from "../shared/functions/functions.service"
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient/patient.service';
import { AuthService } from '../services/auth/auth.service';
import { LoginData } from "../models/login-data.model";
@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  public logindata: LoginData;
  badgecount = 0;
  isDesktop: boolean;
  signalList: any = [];
  dr_code;
  dr_username;
  constructor(
    private screensizeService: ScreenSizeService,
    private storageService: StorageService,
    private renderer: Renderer2,
    public constants: Constants,
    public functionsService: FunctionsService,
    public router:Router,
    private patientService:PatientService,
    private authService: AuthService
  ) {
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

    this.logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_code = this.logindata[0].dr_code;
    this.dr_username = atob(localStorage.getItem("username"));
    this.patientService.getUserSettings('DPP',this.dr_username).subscribe(
      (res: any) => {       
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
       // this.functionsService.sorryDoc();
      },() =>{
      });
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
      localStorage.clear();
      localStorage.setItem('hasloggedin', '1');
      //window.location.reload();
      this.router.navigate(['/login']).then(()=>{
        window.location.reload();
      });
    });
  }
}
