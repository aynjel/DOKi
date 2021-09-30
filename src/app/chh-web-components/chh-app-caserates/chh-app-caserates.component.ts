import { Component, OnInit, Renderer2 } from '@angular/core';
import { CaseRates } from "../../models/case-rates-search";
import { AuthConstants, Consta} from "../../config/auth-constants";
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginData } from "../../models/login-data.model";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-chh-app-caserates',
  templateUrl: './chh-app-caserates.component.html',
  styleUrls: ['./chh-app-caserates.component.scss'],
})
export class ChhAppCaseratesComponent implements OnInit {
  isDesktop:any;
  dr_name:any;
  dr_code:any;
  caseRateData :any;
  caseSelect:boolean = true;
  ionSkeleton : boolean = false;
  ionSkeleton1 : boolean = false;
  ionNoData : boolean = false;
  ionNoData1 : boolean = false;
  caseRateResponse_first:any;
  caseRateResponse_second:any;
  case_class : any;
  case_search_code : any;
  case_search_desc : any;
  activedescription:boolean = false;
  activedescription1:boolean = false;
  case :any = "(first)";
  ionStart:boolean = true;
  ionStart1:boolean = true;
  CaseSearchDesc:any;
  CaseSearchCode:any;
  ccCase:any;
  constructor(
    private screensizeService: ScreenSizeService,
    private authService: AuthService,
    private doctorService: DoctorService,
    public functionsService: FunctionsService,
    private patientService: PatientService,
    private renderer: Renderer2,
    public modalController: ModalController) { 
    this.caseRateData  = new CaseRates();
    this.caseRateData.CaseClass = "first";
    //this.caseRateData.CaseSearchCode ="";
    //this.caseRateData.CaseSearchDesc="";
    this.caseRateData.Mode = Consta.mode;
    
    sessionStorage.setItem('caseRateData', JSON.stringify(this.caseRateData)); 
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });

    this.caseRateResponse_first=[];
    this.caseRateResponse_second=[];
    this.ccCase = 'first';
  }

  ngOnInit() {
    // this.caseRateData  = new CaseRates();
    console.log(this.caseRateData);
    
   }
   ionViewWillEnter(){
     console.log(this.caseRateData);
     let  user = <CaseRates>JSON.parse(sessionStorage.getItem("caseRateData")) ; 
     let logindata = <LoginData>this.authService.userData$.getValue() ;
     this.dr_name = logindata.last_name;
     this.dr_code = logindata.dr_code;
 
     this.checkAppearance();
 
   }
   segmentChanged(e){
     this.ccCase = e.detail.value;
     this.caseSelect = !this.caseSelect;
     this.caseRateData.CaseClass = e.detail.value;
     this.case = "("+e.detail.value+")";
    
   }
   search(){
 
 
 
 
     this.caseRateData.CaseSearchCode= (<HTMLInputElement>(
       document.getElementById("input-code")
     )).value;
 
     this.caseRateData.CaseSearchDesc = (<HTMLInputElement>(
       document.getElementById("input-searchdesc")
     )).value;
     console.log(this.caseRateData);
 
     if(this.caseRateData.CaseSearchDesc != ""){
 
       if(this.ccCase == 'first'){
         console.log('ccCase');
         
         this.ionStart= false;
         this.ionSkeleton = true;
         this.ionNoData = false;
         this.activedescription = false;
         this.doctorService.searchCaseRatesV2(this.caseRateData.CaseClass,this.caseRateData.CaseSearchCode,this.caseRateData.CaseSearchDesc,this.caseRateData.Mode).subscribe(
           (res: any) => {
             console.log(res);
             
             this.caseRateResponse_first = res;
           },(error) =>{
             this.ionNoData = true;
           },() => {
             this.ionSkeleton = false;
             if(this.functionsService.isEmptyObject(this.caseRateResponse_first)){
               this.ionNoData = true;
             }else{
               this.ionNoData = false;
             }
 
             console.log('first');
 
             console.log(this.caseRateResponse_first );
             let x = JSON.stringify(this.caseRateResponse_first);
             console.log(x);
             
           }
         );
       }else{
         this.ionStart1= false;
         this.ionSkeleton1 = true;
         this.ionNoData1 = false;
         this.activedescription1 = false;
         this.doctorService.searchCaseRatesV2(this.caseRateData.CaseClass,this.caseRateData.CaseSearchCode,this.caseRateData.CaseSearchDesc,this.caseRateData.Mode).subscribe(
           (res: any) => {
             this.caseRateResponse_second = res;
           },(error) =>{
             this.ionNoData1 = true;
           },() => {
             this.ionSkeleton1 = false;
             if(this.functionsService.isEmptyObject(this.caseRateResponse_second)){
               this.ionNoData1 = true;
             }else{
               this.ionNoData1 = false;
             }
           }
         );
       }
 
 
 
 
 
 
 
 
 
     }else{
         this.activedescription = true;
     }
 
   }
 
 
   checkAppearance(){
     
     let logindata = <LoginData>this.authService.userData$.getValue();
     this.dr_code = logindata.dr_code;
     let dr_username = atob(localStorage.getItem("username"));
     this.patientService.getUserSettingsV2(dr_username).subscribe(
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
       });
   }
   dismiss() {
     // using the injected ModalController this page
     // can "dismiss" itself and optionally pass back data
     this.modalController.dismiss({
       'dismissed': true
     });
   }
}
