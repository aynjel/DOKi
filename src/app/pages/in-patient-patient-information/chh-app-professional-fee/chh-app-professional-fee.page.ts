import { Component, OnInit, Input,ViewChild, ViewContainerRef,  ComponentFactoryResolver } from "@angular/core";
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
import { ChemistryPage } from "../../../chh-web-components/chh-app-test/chemistry/chemistry.page";
import { ChhAppBasePage } from "../../../chh-web-components/chh-app-test/chh-app-base/chh-app-base.page";
import { Messages } from "../../../shared/messages";
import { ScreenSizeService } from "../../../services/screen-size/screen-size.service";
import { ChhAppTestChemistryComponent } from "../../../chh-web-components/chh-app-test/chh-app-test-chemistry/chh-app-test-chemistry.component";
import { ChhAppTestFecalysisComponent } from "../../../chh-web-components/chh-app-test/chh-app-test-fecalysis/chh-app-test-fecalysis.component";
import { ChhAppTestSerologyComponent } from "../../../chh-web-components/chh-app-test/chh-app-test-serology/chh-app-test-serology.component";
import { StorageService } from "../../../services/storage/storage.service";
import { AuthConstants } from "../../../config/auth-constants";
import { executionAsyncResource } from "async_hooks";


@Component({
  selector: 'app-chh-app-professional-fee',
  templateUrl: './chh-app-professional-fee.page.html',
  styleUrls: ['./chh-app-professional-fee.page.scss'],
})
export class ChhAppProfessionalFeePage implements OnInit {
  isDesktop:any;
  dr_name:any;
  dr_code:any;
  postData = {
    AdmisisonNo: "string",
    DoctorCode: "string",
    DoctorStatusCode: "string",
    ProfFee: 0,
    DateCreated: "2020-07-01T05:14:48.712Z",
    site: "string",
    CreatedBy: "string",
    Remarks: "string",
    DoctorMobileNumber: "string",
    BillingMobileNumber: "string",
    RoomNumber: "string",
    SmsGateWay: [],
    OldProfFee: "string",
  };
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
    public storageService: StorageService) {

      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });

      console.log('constructor');
    }

  ngOnInit() {

    console.log(this.activatedRoute.snapshot.params.id);
    
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');

   /* let logindata = <LoginData>this.authService.userData$.getValue();
    console.log(logindata);
    let dr_name = logindata[0].last_name;
    this.dr_code = logindata[0].dr_code;*/

    let logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_name = logindata[0].last_name;
    this.dr_code = logindata[0].dr_code;
    this.postData.DoctorMobileNumber = logindata[0].mobile_no;
    console.log( this.dr_code );
    
  }

}
