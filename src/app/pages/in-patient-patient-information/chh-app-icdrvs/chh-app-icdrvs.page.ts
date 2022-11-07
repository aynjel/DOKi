import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer2,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalController, AlertController } from '@ionic/angular';
import { ChhAppFeePage } from '../../../chh-web-components/chh-app-fee/chh-app-fee.page';
import { from } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { timeStamp } from 'console';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
//import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginData } from '../../../models/login-data.model';
import { FunctionsService } from '../../../shared/functions/functions.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { logWarnings } from 'protractor/built/driverProviders';
import { ChemistryPage } from '../../../chh-web-components/chh-app-test/chh-app-chemistry/chemistry.page';
import { ChhAppBasePage } from '../../../chh-web-components/chh-app-test/chh-app-base/chh-app-base.page';
import { Messages } from '../../../shared/messages';
import { ScreenSizeService } from '../../../services/screen-size/screen-size.service';
import { ChhAppTestChemistryComponent } from '../../../chh-web-components/chh-app-test/chh-app-test-chemistry/chh-app-test-chemistry.component';
import { ChhAppTestFecalysisComponent } from '../../../chh-web-components/chh-app-test/chh-app-test-fecalysis/chh-app-test-fecalysis.component';
import { ChhAppTestSerologyComponent } from '../../../chh-web-components/chh-app-test/chh-app-test-serology/chh-app-test-serology.component';
import { StorageService } from '../../../services/storage/storage.service';
import { AuthConstants } from '../../../config/auth-constants';
import { executionAsyncResource } from 'async_hooks';
import { Constants } from 'src/app/shared/constants';
import {
  UserSettingsModelv3,
  LoginResponseModelv3,
} from 'src/app/models/doctor';
import {
  InPatientData,
  ProfessionalFeeModelv3,
} from 'src/app/models/in-patient.model';
@Component({
  selector: 'app-chh-app-icdrvs',
  templateUrl: './chh-app-icdrvs.page.html',
  styleUrls: ['./chh-app-icdrvs.page.scss'],
})
export class ChhAppIcdrvsPage implements OnInit {
  isDesktop: any;
  routerLinkBack1: any;
  routerLinkBack2: any;
  method: any;
  id: any;
  dr_name: any;

  public logindata: LoginResponseModelv3;
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  dr_code: any;
  patient_id: any;
  data: any;
  patient_name: any;
  dateAdmitted: any;
  caseData: any = '1stcase';
  postData = {
    AdmisisonNo: 'string',
    DoctorCode: 'string',
    DoctorStatusCode: 'string',
    ProfFee: 0,
    DateCreated: '2020-07-01T05:14:48.712Z',
    site: 'string',
    CreatedBy: 'string',
    Remarks: 'string',
    DoctorMobileNumber: 'string',
    BillingMobileNumber: 'string',
    RoomNumber: 'string',
    SmsGateWay: [],
    OldProfFee: 'string',
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
    //protected $gaService: GoogleAnalyticsService,
    private authService: AuthService,
    public functionsService: FunctionsService,
    private patientService: PatientService,
    private screensizeService: ScreenSizeService,
    public messages: Messages,
    public storageService: StorageService,
    public constants: Constants,
    private renderer: Renderer2
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });

    console.log('constructor');
  }

  ngOnInit() {
    /*this.id = this.activatedRoute.snapshot.params.id;
    this.method = this.activatedRoute.snapshot.params.method;
    this.method = this.functionsService.convertAllFirstLetterToUpperCase(this.method);
    this.routerLinkBack1 = "/menu/in-patients/"+this.id;
    this.routerLinkBack2 = "/menu/in-patients/"+this.id+"/professional-fee";*/
  }
  ionViewWillEnter() {
    /* let logindata = <LoginData>this.authService.userData$.getValue();
     console.log(logindata);
     let dr_name = logindata[0].last_name;
     this.dr_code = logindata[0].dr_code;*/

    let logindata = <LoginResponseModelv3>this.authService.userData$.getValue();
    console.log(logindata);

    this.dr_name = logindata.lastName;
    this.dr_code = logindata.doctorCode;
    this.postData.DoctorMobileNumber = logindata[0].mobile_no;
    this.data = [];
    this.checkAppearance();
    /*
     this.doctorService.getInPatient(this.dr_code).subscribe(
       (res: any) => {
         console.log(res);
         
         res.forEach(element => {
             if(element.patient_no == this.activatedRoute.snapshot.params.id){
               this.data.push(element);
               this.patient_name = element.first_name + ' ' + element.last_name;
               this.patient_name = this.functionsService.convertAllFirstLetterToUpperCase(this.patient_name);
             }
         });
       },(error) => {
         console.log(error);
         
       },
       ()=>{
        let d = new Date(this.data[0].admission_date);
        this.dateAdmitted = d.toUTCString();
        console.log(this.dateAdmitted);
         this.checkAppearance();
        // this.initialize(this.method);
       });*/
  }
  checkAppearance() {
    let dr_username = atob(localStorage.getItem('username'));
    this.patientService
      .getUserSettings('DPP', dr_username)
      .subscribe((res: any) => {
        if (Object.keys(res).length >= 1) {
          let data = JSON.stringify(res);
          data = '[' + data + ']';
          let adat = JSON.parse(data);
          adat.forEach((el) => {
            if (typeof el.appearance !== 'undefined') {
              if (el.appearance.darkmode == 1) {
                this.renderer.setAttribute(
                  document.body,
                  'color-theme',
                  'dark'
                );
              } else {
                this.renderer.setAttribute(
                  document.body,
                  'color-theme',
                  'light'
                );
              }
            } else {
              this.renderer.setAttribute(document.body, 'color-theme', 'light');
            }
          });
        }
      });
  }

  segmentChanged(e) {
    console.log(e);
  }
}
