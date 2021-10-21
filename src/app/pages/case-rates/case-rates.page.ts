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
import { AuthConstants, Consta} from "../../config/auth-constants";
import { executionAsyncResource } from "async_hooks";
import { Constants  } from "src/app/shared/constants";
import { CaseRates } from "../../models/case-rates-search";
import {UserSettingsModelv3,LoginResponseModelv3} from 'src/app/models/doctor';
@Component({
  selector: 'app-case-rates',
  templateUrl: './case-rates.page.html',
  styleUrls: ['./case-rates.page.scss'],
})
export class CaseRatesPage implements OnInit {
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
  public logindata: LoginResponseModelv3;
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
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
    let logindata = <LoginResponseModelv3>this.authService.userData$.getValue() ;
    this.dr_name = logindata.lastName;
    this.dr_code = logindata.doctorCode;

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
    
    let logindata = <LoginResponseModelv3>this.authService.userData$.getValue();
    this.dr_code = logindata.doctorCode;
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
