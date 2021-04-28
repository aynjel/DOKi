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
import { GoogleAnalyticsService } from 'ngx-google-analytics';
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
import { CaseRatesPage } from '../../case-rates/case-rates.page';
import { TransactionSummaryPage } from '../transaction-summary/transaction-summary.page';

import { InPatientData } from 'src/app/models/in-patient.model';
@Component({
  selector: 'app-chh-app-professional-fee-summary',
  templateUrl: './chh-app-professional-fee-summary.page.html',
  styleUrls: ['./chh-app-professional-fee-summary.page.scss'],
})
export class ChhAppProfessionalFeeSummaryPage implements OnInit {
  isDesktop: any;
  routerLinkBack: any;
  routerLinkBack1: any;
  routerLinkBack2: any;
  routerLinkBack3: any;
  method: any;
  method1: any;
  id: any;
  dr_name: any;
  postData: InPatientData = new InPatientData();
  public logindata: LoginData;
  dr_code: any;
  patient_id: any;
  data: any;
  patient_name: any;
  dateAdmitted: any;
  isPatientSeen: any = 'o';
  InsurancePF: number;
  InsuranceShowVat: boolean = false;
  InsuranceVat: boolean = true;
  PhilhealthShowVat: boolean = false;
  PersonalPhilhealthShowVat: boolean = false;
  PhilhealthVat: boolean = true;
  PersonalPhilhealthVat: boolean = true;
  PhilhealthPF: number;
  PersonalPhilhealthPF: number;
  PhilhealthShowValue: boolean = true;
  IsPhilhealthOnly: boolean = true;
  progressStatus: any = 0.75;
  nxtBtn: boolean = false;
  summary: any = '';
  txtInsurancePF: boolean = true;
  txtInsuranceVAT: boolean = true;
  txtPhilHealthPF: boolean = true;
  txtPhilHealthVAT: boolean = true;
  txtPersonalPhilHealthVAT: boolean = true;
  headerMethod: any;
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
    private renderer: Renderer2
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });

    //console.log('constructor');
  }

  ngOnInit() {
    //this.postData = JSON.parse(atob(sessionStorage.getItem("postData"))) as InPatientData;
    this.postData = JSON.parse(
      atob(localStorage.getItem('postData'))
    ) as InPatientData;
    this.headerMethod = this.postData.SelectedPayVenue;

    //console.log(this.postData);
    this.id = this.activatedRoute.snapshot.params.id;
    this.method = this.method1 = this.activatedRoute.snapshot.params.method;
    this.summary = this.activatedRoute.snapshot.params.summary;

    if (this.method == 'philhealth') {
      this.nxtBtn = true;
    } else {
      this.nxtBtn = false;
    }

    if (this.IsPhilhealthOnly) {
      this.nxtBtn = false;
      this.PhilhealthShowVat = false;
      this.PhilhealthShowValue = false;
      this.PhilhealthPF;
      this.txtPhilHealthPF = true;
      this.txtPhilHealthVAT = false;
      //this.txtPhilHealthVAT = true;
    } else {
      this.nxtBtn = true;
      // this.PhilhealthShowVat = true;
      this.PhilhealthShowValue = true;
    }
    
    this.method = this.functionsService.convertAllFirstLetterToUpperCase(
      this.method
    );

    this.routerLinkBack1 = '/menu/in-patients/' + this.id;
    this.routerLinkBack2 = '/menu/in-patients/' + this.id + '/professional-fee';
    this.routerLinkBack3 =
      '/menu/in-patients/' + this.id + '/professional-fee/' + this.method1;
    if (this.summary != 'summary') {
      this.routerLinkBack = this.routerLinkBack2;
    } else {
      this.routerLinkBack = this.routerLinkBack3;
    }
  }

  ionViewWillEnter() {
    /* let logindata = <LoginData>this.authService.userData$.getValue();
    console.log(logindata);
    let dr_name = logindata[0].last_name;
    this.dr_code = logindata[0].dr_code;*/

    let logindata = <LoginData>this.authService.userData$.getValue();

    this.dr_name = logindata[0].last_name;
    this.dr_code = logindata[0].dr_code;

    // this.data =[];
    // this.data = JSON.parse(atob(sessionStorage.getItem("patientData")));
    this.data = JSON.parse(atob(localStorage.getItem('patientData')));

    this.patient_name = this.data[0].first_name + ' ' + this.data[0].last_name;
    //console.log(this.data);

    this.patient_name = this.functionsService.convertAllFirstLetterToUpperCase(
      this.patient_name
    );
    this.checkAppearance();
    this.initialize(this.method);
    /*
    this.doctorService.getInPatient(this.dr_code).subscribe(
      (res: any) => {
        
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
        this.checkAppearance();
        this.initialize(this.method);
      });*/
  }

  checkAppearance() {
    let d = new Date(this.data[0].admission_date);
    this.dateAdmitted = d.toUTCString();
    //console.log(this.dateAdmitted);

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

  initialize(data) {}

  segmentChanged(e) {}

  async presentCaseRatesModal() {
    const modal = await this.modalController.create({
      component: CaseRatesPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  isurancePF() {
    if (this.InsurancePF > 0) {

      this.InsurancePF = (this.InsurancePF / this.InsurancePF) * this.InsurancePF;
      
      this.InsuranceShowVat = true;
    } else {
      this.InsuranceShowVat = false;
      this.InsurancePF = 0;
    }
    if (this.InsurancePF > 0) {
      this.txtInsurancePF = false;
    } else {
      this.txtInsurancePF = true;
    }




  }

  insuranceVat() {
    this.txtInsuranceVAT = this.InsuranceVat;
  }

  isPhilhealthOnly() {
    //this.IsPhilhealthOnly = !this.IsPhilhealthOnly;
    if (this.IsPhilhealthOnly) {
      this.nxtBtn = false;
      this.PhilhealthShowVat = false;
      this.PhilhealthShowValue = false;
      this.PhilhealthPF;
      this.txtPhilHealthPF = true;
      this.txtPhilHealthVAT = false;
      //this.txtPhilHealthVAT = true;
    } else {
      this.nxtBtn = true;
      // this.PhilhealthShowVat = true;
      this.PhilhealthShowValue = true;
    }
    //console.log(this.PhilhealthShowVat);
  }
  txtPersonalPhilHealthPF:boolean = true;
  personalPhilhealth() {
   
    if (this.PersonalPhilhealthPF > 0) {
      this.PersonalPhilhealthShowVat = true;
      this.txtPersonalPhilHealthPF = false;
    } else {
      this.PersonalPhilhealthShowVat = false;
      this.txtPersonalPhilHealthPF = true;
    }
  }

  philhealthPF() {
    if (this.PhilhealthPF > 0) {
      this.nxtBtn = false;
    } else {
      this.nxtBtn = true;
    }
    if (this.PhilhealthPF == 0 || this.PhilhealthPF == null) {
      this.PhilhealthShowVat = false;
      this.txtPhilHealthPF = true;
    } else {
      this.PhilhealthShowVat = true;
      this.txtPhilHealthPF = false;
    }
  }

  philhealthVat() {
    this.txtPhilHealthVAT = this.PhilhealthVat;
  }

  personalPhilhealthVat() {
    this.txtPersonalPhilHealthVAT = this.PersonalPhilhealthVat;
  }

  finishTransaction() {


    console.log(this.method);
    
    
    if (this.method == 'Insurance') {
      console.log(this.InsurancePF);
      
      if (this.InsurancePF <= 0 || this.InsurancePF == null) {

        
        this.postData.ProfFee = 0;
        this.postData.IsVAT = 'N';
        this.postData.PayVenue = 'X';
      } else {
        console.log("no");
        this.postData.ProfFee = this.InsurancePF;
        if (this.InsuranceVat) {
          this.postData.IsVAT = 'Y';
          this.postData.PayVenue = 'X';
        } else {
          this.postData.IsVAT = 'N';
          this.postData.PayVenue = 'X';
        }
      }
    } else if (this.method == 'Personal-philhealth') {
      if (this.PersonalPhilhealthPF <= 0 || this.PersonalPhilhealthPF == null) {
        this.postData.ProfFee = 0;
        this.postData.IsVAT = 'N';
        this.postData.PayVenue = 'W';
        this.postData.SelectedPayVenue = 'PhilHealth';
      } else {
        this.postData.ProfFee = this.PersonalPhilhealthPF;
        this.postData.SelectedPayVenue = 'Personal + PhilHealth';
        if (this.PersonalPhilhealthVat) {
          this.postData.IsVAT = 'Y';
          this.postData.PayVenue = 'H';
        } else {
          this.postData.IsVAT = 'N';
          this.postData.PayVenue = 'H';
        }
      }
    } else if (this.method == 'Philhealth') {
      if (this.IsPhilhealthOnly) {
        this.postData.ProfFee = 0;
        this.postData.IsVAT = 'N';
        this.postData.PayVenue = 'W';
      } else {
        if (this.PhilhealthPF != 0) {
          this.postData.ProfFee = this.PhilhealthPF;
          if (this.PhilhealthVat) {
            this.postData.IsVAT = 'Y';
            this.postData.PayVenue = 'H';
          } else {
            this.postData.IsVAT = 'N';
            this.postData.PayVenue = 'H';
          }
        }
      }
    } else if (this.method == 'Charity') {
      this.postData.ProfFee = 0;
      this.postData.IsVAT = 'N';
      this.postData.PayVenue = 'W';
    }


    localStorage.setItem('postData', btoa(JSON.stringify(this.postData)));
    if (!this.isDesktop) {
      this.router.navigate([this.router.url + '/summary']);
    } else {
      this.presentSummary();
    }
  }

  async presentSummary() {
    const modal = await this.modalController.create({
      component: TransactionSummaryPage,
      cssClass: 'modal-30',
    });
    return await modal.present();
  }

  goToBottom() {
    window.scrollTo(document.body.scrollHeight, document.body.scrollHeight);
    //window.scrollY(document.body.scrollHeight);
  }
}
