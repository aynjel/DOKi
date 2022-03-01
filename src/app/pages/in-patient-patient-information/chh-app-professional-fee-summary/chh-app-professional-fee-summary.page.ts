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

import { ChhAppCaseratesComponent } from '../../../chh-web-components/chh-app-caserates/chh-app-caserates.component';

import { TransactionSummaryPage } from '../transaction-summary/transaction-summary.page';

import {
  UserSettingsModelv3,
  LoginResponseModelv3,
} from 'src/app/models/doctor';
import {
  InPatientData,
  ProfessionalFeeModelv3,
} from 'src/app/models/in-patient.model';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
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
  professionalFeeModelv3: ProfessionalFeeModelv3 = new ProfessionalFeeModelv3();
  userSettingsModelv3: UserSettingsModelv3 = new UserSettingsModelv3();
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  form: FormGroup = new FormGroup({});
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
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
    private fb: FormBuilder
  ) {
    localStorage.setItem('modaled', '0');
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
    this.form = fb.group({
      InsurancePF: [
        '0',
        [Validators.required, Validators.pattern(this.numRegex)],
      ],
      PersonalPhilhealthPF: [
        '0',
        [Validators.required, Validators.pattern(this.numRegex)],
      ],
    });
    //this.functionsService.logToConsole('constructor');
  }
  /*get f() {
    return this.form.controls;
  }*/

  ngOnInit() {
    this.form.setValue({
      InsurancePF: 0,
      PersonalPhilhealthPF: 0,
    });
    this.checkAppearance();
    //this.postData = JSON.parse(atob(sessionStorage.getItem("postData"))) as InPatientData;
    // this.postData = JSON.parse(atob(localStorage.getItem('postData'))) as InPatientData;
    this.professionalFeeModelv3 = JSON.parse(
      atob(localStorage.getItem('postData1'))
    );
    this.headerMethod = this.professionalFeeModelv3.selected_payvenue;

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
    let logindata = <LoginResponseModelv3>this.authService.userData$.getValue();
    this.dr_name = logindata.lastName;
    this.dr_code = logindata.doctorCode;
    this.data = JSON.parse(atob(localStorage.getItem('patientData')));
    this.dateAdmitted = this.data[0].admission_date;
    this.patient_name = this.data[0].first_name + ' ' + this.data[0].last_name;
    //this.functionsService.logToConsole(this.data);

    this.patient_name = this.functionsService.convertAllFirstLetterToUpperCase(
      this.patient_name
    );

    //this.checkAppearance();

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
        this.functionsService.logToConsole(error);
        
      },
      ()=>{
        this.checkAppearance();
        this.initialize(this.method);
      });*/
  }

  checkAppearance() {
    this.functionsService.logToConsole('checkAppearance');
    var values = JSON.parse(
      '[' + atob(localStorage.getItem('user_settings')) + ']'
    );
    let dr_username = atob(localStorage.getItem('username'));
    values.forEach((element) => {
      this.functionsService.logToConsole(element.darkmode);
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      } else {
        this.renderer.setAttribute(document.body, 'color-theme', 'light');
      }
    });
  }

  initialize(data) {}

  segmentChanged(e) {}

  async presentCaseRatesModal() {
    const modal = await this.modalController.create({
      component: ChhAppCaseratesComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }
  numberString: any = '0123456789.';
  isurancePF(event) {
    //console.log(event);

    if (event.which == 8) {
    } else {
      if (!this.numberString.includes(event.key)) {
        event.stopPropagation();
        return false;
      }
    }
  }
  isurancePFchange() {
    /*
    if (this.InsurancePF > 0) {
      let stringInsurancePF = this.InsurancePF.toString();
      if (stringInsurancePF.includes('-')) {
        this.nxtBtn = true;
      } else {
        this.nxtBtn = false;
      }
      let dotCount = stringInsurancePF.split('.').length - 1;
      if (dotCount >= 2) {
        this.nxtBtn = true;
      } else {
        this.nxtBtn = false;
      }
    }*/

    if (this.InsurancePF > 0) {
      /*this.InsurancePF =
        (this.InsurancePF / this.InsurancePF) * this.InsurancePF;*/
      this.InsuranceShowVat = true;
    } else {
      this.InsuranceShowVat = false;
      //this.InsurancePF = 0;
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
    //this.functionsService.logToConsole(this.PhilhealthShowVat);
  }
  txtPersonalPhilHealthPF: boolean = true;

  personalPhilhealth(event) {
    //console.log(event);

    if (event.keyCode == 8) {
    } else {
      if (!this.numberString.includes(event.key)) {
        event.stopPropagation();
        return false;
      }
    }
  }
  personalPhilhealthChange() {
    /*  let stringPersonalPhilhealthPF = this.PersonalPhilhealthPF.toString();
    //console.log(stringPersonalPhilhealthPF);

    if (stringPersonalPhilhealthPF.includes('-')) {
      this.nxtBtn = true;
    } else {
      this.nxtBtn = false;
    }
    let dotCount = stringPersonalPhilhealthPF.split('.').length - 1;
    if (dotCount >= 2) {
      this.nxtBtn = true;
    } else {
      this.nxtBtn = false;
    }*/

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
    this.functionsService.logToConsole(this.method);

    if (this.method == 'Insurance') {
      this.functionsService.logToConsole(this.InsurancePF);

      if (this.InsurancePF <= 0 || this.InsurancePF == null) {
        /*this.postData.ProfFee = 0;
        this.postData.IsVAT = 'N';
        this.postData.PayVenue = 'X';*/
        this.professionalFeeModelv3.doctor_prof_fee = 0;
        //this.professionalFeeModelv3.old_prof_fee = 0;
        this.professionalFeeModelv3.is_vat = 'N';
        this.professionalFeeModelv3.payvenue = 'X';
      } else {
        this.functionsService.logToConsole('no');
        //this.postData.ProfFee = this.InsurancePF;
        this.professionalFeeModelv3.doctor_prof_fee = this.InsurancePF;
        if (this.InsuranceVat) {
          /*this.postData.IsVAT = 'Y';
          this.postData.PayVenue = 'X';*/
          this.professionalFeeModelv3.is_vat = 'Y';
          this.professionalFeeModelv3.payvenue = 'X';
        } else {
          /*this.postData.IsVAT = 'N';
          this.postData.PayVenue = 'X';*/
          this.professionalFeeModelv3.is_vat = 'N';
          this.professionalFeeModelv3.payvenue = 'X';
        }
      }
    } else if (this.method == 'Personal-philhealth') {
      if (this.PersonalPhilhealthPF <= 0 || this.PersonalPhilhealthPF == null) {
        /*this.postData.ProfFee = 0;
        this.postData.IsVAT = 'N';
        this.postData.PayVenue = 'W';
        this.postData.SelectedPayVenue = 'PhilHealth';*/
        this.professionalFeeModelv3.doctor_prof_fee = 0;
        this.professionalFeeModelv3.is_vat = 'N';
        this.professionalFeeModelv3.payvenue = 'W';
        this.professionalFeeModelv3.selected_payvenue = 'PhilHealth';
      } else {
        /*this.postData.ProfFee = this.PersonalPhilhealthPF;
        this.postData.SelectedPayVenue = 'Personal + PhilHealth';*/
        this.professionalFeeModelv3.doctor_prof_fee = this.PersonalPhilhealthPF;
        this.professionalFeeModelv3.selected_payvenue = 'Personal + PhilHealth';
        if (this.PersonalPhilhealthVat) {
          /*this.postData.IsVAT = 'Y';
          this.postData.PayVenue = 'H';*/
          this.professionalFeeModelv3.is_vat = 'Y';
          this.professionalFeeModelv3.payvenue = 'H';
        } else {
          /*this.postData.IsVAT = 'N';
          this.postData.PayVenue = 'H';*/
          this.professionalFeeModelv3.is_vat = 'N';
          this.professionalFeeModelv3.payvenue = 'H';
        }
      }
    } else if (this.method == 'Philhealth') {
      if (this.IsPhilhealthOnly) {
        /*this.postData.ProfFee = 0;
        this.postData.IsVAT = 'N';
        this.postData.PayVenue = 'W';*/
        this.professionalFeeModelv3.doctor_prof_fee = 0;
        this.professionalFeeModelv3.is_vat = 'N';
        this.professionalFeeModelv3.payvenue = 'W';
      } else {
        if (this.PhilhealthPF != 0) {
          /*this.postData.ProfFee = this.PhilhealthPF;*/
          this.professionalFeeModelv3.doctor_prof_fee = this.PhilhealthPF;
          if (this.PhilhealthVat) {
            /*this.postData.IsVAT = 'Y';
            this.postData.PayVenue = 'H';*/
            this.professionalFeeModelv3.is_vat = 'Y';
            this.professionalFeeModelv3.payvenue = 'H';
          } else {
            /*this.postData.IsVAT = 'N';
            this.postData.PayVenue = 'H';*/
            this.professionalFeeModelv3.is_vat = 'N';
            this.professionalFeeModelv3.payvenue = 'H';
          }
        }
      }
    } else if (this.method == 'Charity') {
      /*this.postData.ProfFee = 0;
      this.postData.IsVAT = 'N';
      this.postData.PayVenue = 'W';*/
      this.professionalFeeModelv3.doctor_prof_fee = 0;
      this.professionalFeeModelv3.is_vat = 'N';
      this.professionalFeeModelv3.payvenue = 'W';
    }

    /*localStorage.setItem('postData', btoa(JSON.stringify(this.postData)));*/
    localStorage.setItem(
      'postData1',
      btoa(JSON.stringify(this.professionalFeeModelv3))
    );
    if (!this.isDesktop) {
      this.router.navigate([this.router.url + '/summary']);
    } else {
      //this.presentSummary();
      this.router.navigate([this.router.url + '/summary']);
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
