import { Component, OnInit, Input,ViewChild, ViewContainerRef,  ComponentFactoryResolver, Renderer2 } from "@angular/core";
import { Router, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import { ModalController, AlertController } from "@ionic/angular";
import { ChhAppFeePage } from "../../../chh-web-components/chh-app-fee/chh-app-fee.page";
import { from } from "rxjs";
import { PopoverController } from "@ionic/angular";
import { timeStamp } from "console";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { AuthService } from "src/app/services/auth/auth.service";
import { LoginData } from "../../../models/login-data.model";
import { FunctionsService } from "../../../shared/functions/functions.service";
import { PatientService } from "src/app/services/patient/patient.service";
import { logWarnings } from "protractor/built/driverProviders";
import { ChemistryPage } from "../../../chh-web-components/chh-app-test/chh-app-chemistry/chemistry.page";
import { ChhAppBasePage } from "../../../chh-web-components/chh-app-test/chh-app-base/chh-app-base.page";
import { Messages } from "../../../shared/messages";
import { ScreenSizeService } from "../../../services/screen-size/screen-size.service";
import { ChhAppTestChemistryComponent } from "../../../chh-web-components/chh-app-test/chh-app-test-chemistry/chh-app-test-chemistry.component";
import { ChhAppTestFecalysisComponent } from "../../../chh-web-components/chh-app-test/chh-app-test-fecalysis/chh-app-test-fecalysis.component";
import { ChhAppTestSerologyComponent } from "../../../chh-web-components/chh-app-test/chh-app-test-serology/chh-app-test-serology.component";
import { StorageService } from "../../../services/storage/storage.service";
import { AuthConstants } from "../../../config/auth-constants";
import { executionAsyncResource } from "async_hooks";
import { Constants } from "src/app/shared/constants";
import { CaseRatesPage } from "../../case-rates/case-rates.page";
import {InPatientData} from "src/app/models/in-patient.model";
@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.page.html',
  styleUrls: ['./transaction-summary.page.scss'],
})
export class TransactionSummaryPage implements OnInit {

  isDesktop:any;
  routerLinkBack:any;
  routerLinkBack1:any;
  routerLinkBack2:any;
  routerLinkBack3:any;
  method:any = "";
  method1:any;
  id:any;
  dr_name:any;
  postData : InPatientData = new InPatientData();
  public logindata: LoginData;
  dr_code:any;
  patient_id  :any;
  data:any;
  patient_name:any;
  dateAdmitted:any;
  isPatientSeen : any = "o";
  InsurancePF:number;
  InsuranceShowVat:boolean = false;
  InsuranceVat:boolean = false;

  PhilhealthPF:number;
  PhilhealthShowValue:boolean = true;
  IsPhilhealthOnly:boolean = false;
  progressStatus:any = 0.75;
  summary:any;
  summaryHeader:any;
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
    private renderer: Renderer2) {

      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });

      console.log('constructor');
    }

  ngOnInit() {
    console.log("IM AT TRANSACTION SUMMARTY");
      
      this.postData = JSON.parse(atob(sessionStorage.getItem("postData"))) as InPatientData;
      console.log("!!!!!!!!!!!!!");
      console.log((this.postData));
      console.log(JSON.stringify(this.postData));
    this.id = this.activatedRoute.snapshot.params.id;
    this.method = this.method1 = this.activatedRoute.snapshot.params.method;
    this.summary = this.activatedRoute.snapshot.params.summary;
    console.log(this.method);
    if(this.method != null){
      this.method = this.functionsService.convertAllFirstLetterToUpperCase(this.method);
      this.summaryHeader = this.method + ' - ' +this.functionsService.convertAllFirstLetterToUpperCase(this.summary);
    }else{
      this.summaryHeader = "Transaction Summary";
    }
  
    this.routerLinkBack1 = "/menu/in-patients/"+this.id;
    this.routerLinkBack2 = "/menu/in-patients/"+this.id+"/professional-fee";
    this.routerLinkBack3 = "/menu/in-patients/"+this.id+"/professional-fee/"+this.method1;
    if(this.summary != 'summary'){
      this.routerLinkBack = this.routerLinkBack2;
    }else{
      this.routerLinkBack = this.routerLinkBack3;
    }


  }
  ionViewWillEnter(){
    sessionStorage.removeItem('pfIsPatientSeen');
    sessionStorage.removeItem('pfInsCoor');
    this.checkAppearance();
    let logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_name = logindata[0].last_name;
    this.dr_code = logindata[0].dr_code;
    this.postData.DoctorMobileNumber = logindata[0].mobile_no;
    this.data =[];
    this.data = JSON.parse(atob(sessionStorage.getItem("patientData")));

 
    
  }
  checkAppearance(){

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

}
