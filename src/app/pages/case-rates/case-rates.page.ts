import { Component, OnInit, Input,ViewChild, ViewContainerRef,  ComponentFactoryResolver, Renderer2 } from "@angular/core";
import { Router, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import { ModalController, AlertController, NavController } from "@ionic/angular";
import { ChhAppFeePage } from "../../chh-web-components/chh-app-fee/chh-app-fee.page";
import { from } from "rxjs";
import { PopoverController } from "@ionic/angular";
import { timeStamp } from "console";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { AuthService } from "src/app/services/auth/auth.service";
import { LoginData } from "../../models/login-data.model";
import { FunctionsService } from "../../shared/functions/functions.service";
import { PatientService } from "src/app/services/patient/patient.service";
import { logWarnings } from "protractor/built/driverProviders";
import { ChemistryPage } from "../../chh-web-components/chh-app-test/chh-app-chemistry/chemistry.page";
import { ChhAppBasePage } from "../../chh-web-components/chh-app-test/chh-app-base/chh-app-base.page";
import { Messages } from "../../shared/messages";
import { ScreenSizeService } from "../../services/screen-size/screen-size.service";
import { ChhAppTestChemistryComponent } from "../../chh-web-components/chh-app-test/chh-app-test-chemistry/chh-app-test-chemistry.component";
import { ChhAppTestFecalysisComponent } from "../../chh-web-components/chh-app-test/chh-app-test-fecalysis/chh-app-test-fecalysis.component";
import { ChhAppTestSerologyComponent } from "../../chh-web-components/chh-app-test/chh-app-test-serology/chh-app-test-serology.component";
import { StorageService } from "../../services/storage/storage.service";
import { AuthConstants } from "../../config/auth-constants";
import { executionAsyncResource } from "async_hooks";
import { Constants } from "src/app/shared/constants";
import { CaseRates } from "../../models/case-rates-search";
@Component({
  selector: 'app-case-rates',
  templateUrl: './case-rates.page.html',
  styleUrls: ['./case-rates.page.scss'],
})
export class CaseRatesPage implements OnInit {
  isDesktop:any;
  dr_name:any;
  dr_code:any;
  caseRateData  = new CaseRates();
  caseSelect:boolean = true;
  ionSkeleton : boolean = false;
  ionNoData : boolean = false;
  caseRateResponse:any;
  case_class : any;
  case_search_code : any;
  case_search_desc : any;
  activedescription:boolean = false;
  case :any = "(first)";
  ionStart:boolean = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    public modalController: ModalController,
    public _modalController: ModalController,
    public popover: PopoverController,
    private doctorService: DoctorService,
    public alertController: AlertController,
    protected $gaService: GoogleAnalyticsService,
    private authService: AuthService,
    public functionsService: FunctionsService,
    private patientService: PatientService,
    private screensizeService: ScreenSizeService,
    public messages: Messages,
    public storageService: StorageService,
    public constants: Constants,
    private renderer: Renderer2,
    public nav:NavController) {
 
      this.caseRateData.CaseClass = "first";
      this.caseRateData.CaseSearchCode ="";
      this.caseRateData.CaseSearchDesc="";
      console.log( this.caseRateData);
      
      sessionStorage.setItem('caseRateData', JSON.stringify(this.caseRateData)); 
      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });

      console.log('constructor');
  }
  ngOnInit() {
  }
  ionViewWillEnter(){
    let  user = <CaseRates>JSON.parse(sessionStorage.getItem("caseRateData")) ; 
    let logindata = <LoginData>this.authService.userData$.getValue() ;
    this.dr_name = logindata[0].last_name;
    this.dr_code = logindata[0].dr_code;

    this.checkAppearance();

  }
  segmentChanged(e){
    console.log(e.detail.value);
    this.caseSelect = !this.caseSelect;
    this.caseRateData.CaseClass = e.detail.value;
    // this.caseRateResponse = '123';
    this.case = "("+e.detail.value+")";
    this.search();
   
  }
  search(){
  
    if(this.caseRateData.CaseSearchDesc != ""){
      this.ionStart= false;
      this.caseRateResponse=[];
      this.ionSkeleton = true;
      this.ionNoData = false;
      this.activedescription = false;
      this.doctorService.searchCaseRates(this.caseRateData.CaseClass,this.caseRateData.CaseSearchCode,this.caseRateData.CaseSearchDesc).subscribe(
        (res: any) => {
          console.log(res);
          
          this.caseRateResponse = res;
        },(error) =>{
          this.ionNoData = true;
        },() => {
          this.ionSkeleton = false;
          if(this.functionsService.isEmptyObject(this.caseRateResponse)){
            this.ionNoData = true;
          }else{
            this.ionNoData = false;
          }
        }
      );
    }else{
        this.activedescription = true;
    }

  }


  checkAppearance(){
    
    let logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_code = logindata[0].dr_code;
    let dr_username = atob(localStorage.getItem("username"));
    this.patientService.getUserSettings('DPP',dr_username).subscribe(
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
