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
import { ChemistryPage } from "../../chh-web-components/chh-app-test/chemistry/chemistry.page";
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
  caseRateData : CaseRates;
  caseSelect:boolean = true;

  caseRates:any;
  case_class : any;
  case_search_code : any;
  case_search_desc : any;
  jsonData = '[{"case_code":"10060","case_desc":"Incisionanddrainageofabscess(e.g.,carbuncle,suppurativehidradenitis,cutaneousorsubcutaneo","case_type":"Procedure","case_group":"","case_hb":2800,"case_pf":840,"case_total":3640,"case_status":"AC"},{"case_code":"10080","case_desc":"Incisionanddrainageofpilonidalcyst","case_type":"Procedure","case_group":"","case_hb":2800,"case_pf":840,"case_total":3640,"case_status":"AC"},{"case_code":"10120","case_desc":"Incisionandremovalofforeignbody,subcutaneoustissues","case_type":"Procedure","case_group":"","case_hb":2800,"case_pf":840,"case_total":3640,"case_status":"AC"}]';


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
      this.caseRateData = new CaseRates();
      this.caseRateData.case_class = "first";
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
    //let asdasd = "asdklajsdlkajslkd";
    // this.asdasdasdas.case_class = asdasd.toString();





    let logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_name = logindata[0].last_name;
    this.dr_code = logindata[0].dr_code;

  }
  segmentChanged(e){
    console.log(e.detail.value);
    this.caseSelect = !this.caseSelect;
    this.caseRateData.case_class = e.detail.value;
  }
  search(){

    console.log(this.caseRateData);
    
    this.doctorService.searchCaseRates(this.caseRateData).subscribe(
      (res: any) => {
        this.caseRates = res;
      }
    );
  }
}
