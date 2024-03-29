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
import {
  ModalController,
  AlertController,
  NavController,
} from '@ionic/angular';
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
import { PatientNo } from 'src/app/models/in-patient.model';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-chh-app-professional-fee',
  templateUrl: './chh-app-professional-fee.page.html',
  styleUrls: ['./chh-app-professional-fee.page.scss'],
})
export class ChhAppProfessionalFeePage implements OnInit {
  public logindata: LoginData;
  private ngUnsubscribe = new Subject();
  // postData: InPatientData = new InPatientData();
  patientNo: PatientNo = new PatientNo();
  isDesktop: any;
  dr_name: any;
  dr_code: any;
  routerLinkBack: any;
  patient_id: any;
  data: any;
  patient_name: any;
  dateAdmitted: any;
  moreOrLess: boolean = false;
  insCoor: any = 'No';
  showSelection: boolean = false;
  showSeenPatient: boolean = false;
  pfInsCoor: any;
  pfIsPatientSeen: any;

  insurance: boolean = false;
  charity: boolean = false;
  philhealth: boolean = false;
  personalphilhealth: boolean = false;
  isCoordinator: boolean = false;
  isPatientSeen: boolean = true;
  insuranceB: boolean;
  charityB: boolean;
  philhealthB: boolean;
  toPFMbtn: boolean = true;
  btnclose: boolean;
  disabledselection: boolean = false;
  site: any;
  daysManaged: any;
  day: any;
  withVat: any;
  withVatN: any;
  data1: any;
  payvenue: any;
  payvenueN: any;
  payvenueTxt: any;
  ifShowSummary: boolean = false;
  modifybtn: boolean = false;
  professionalFeeModelv3: ProfessionalFeeModelv3 = new ProfessionalFeeModelv3();
  userSettingsModelv3: UserSettingsModelv3 = new UserSettingsModelv3();
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  is_senior;
  is_pwd;
  philhealth_membership;
  insurance_hmo;
  is_philhealth_membership;
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
    private renderer: Renderer2,
    private nav: NavController
  ) {
    localStorage.setItem('modaled', '0');

    this.screensizeService
      .isDesktopView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });
  }
  patientDetailfromApi_from;
  patientDetailfromApi_to;
  admission_status;
  ngOnInit() {
    this.checkAppearance();
    let getValue = this.activatedRoute.snapshot.paramMap.get('state');

    this.initiateSession();
    this.routerLinkBack = '/menu/in-patients/';

    this.patient_id = this.activatedRoute.snapshot.params.id;
    this.routerLinkBack = '/menu/in-patients/' + this.patient_id + '/';
    /*this.postData = JSON.parse(atob(localStorage.getItem('postData'))) as InPatientData;*/
    this.professionalFeeModelv3 = JSON.parse(
      atob(localStorage.getItem('postData1'))
    );
    this.functionsService.logToConsole(this.professionalFeeModelv3);

    this.admission_status = atob(localStorage.getItem('admission_status'));
    this.patientDetailfromApi_from = atob(localStorage.getItem('Api_from'));
    this.patientDetailfromApi_to = atob(localStorage.getItem('Api_to'));
  }
  dischargeNotice;
  ionViewWillEnter() {
    this.ngUnsubscribe = new Subject();
    this.userSettingsModelv3 = JSON.parse(
      '[' + atob(localStorage.getItem('user_settings')) + ']'
    );
    this.loginResponseModelv3 = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    // localStorage.setItem('postData1', (JSON.stringify(this.professionalFeeModelv3)));

    this.dr_name = this.loginResponseModelv3.lastName;
    this.dr_code = this.loginResponseModelv3.doctorCode;
    this.data = JSON.parse(atob(localStorage.getItem('patientData')));
    this.insurance_hmo = this.data[0].insurance_hmo;
    this.is_philhealth_membership = this.data[0].philhealth_membership;
    this.is_pwd = this.data[0].is_pwd;
    this.is_senior = this.data[0].is_senior;
    //console.log(this.is_pwd, this.is_senior);
    this.dateAdmitted = this.data[0].admission_date;
    this.dischargeNotice = this.data[0].forDischargeDateTime;

    //console.log(this.data[0].admission_no);
    if (this.patient_id != this.data[0].admission_no) {
      this.nav.back();
    }
    this.data1 = this.data[0].doctor_prof_fee;
    this.patient_name = this.data[0].first_name + ' ' + this.data[0].last_name;
    this.patient_name = this.functionsService.convertAllFirstLetterToUpperCase(
      this.patient_name
    );
    if (this.data[0].is_posted == 0) {
      this.modifybtn = false;
    } else {
      this.modifybtn = true;
    }
    this.withVatN = this.data[0].is_vat;
    if (this.data[0].is_vat == 'Y') {
      this.withVat = '(+ VAT)';
    } else {
      this.withVat = '(No VAT)';
    }

    if (this.data[0].is_vat == 'Y' && this.data[0].is_posted == '1') {
      this.withVat = '(with VAT)';
    } else if (this.data[0].is_vat == 'N' && this.data[0].is_posted == '1') {
      this.withVat = '(No VAT)';
    }
    this.payvenueN = this.data[0].payvenue;

    if (this.data[0].selected_payvenue == 'Charity') {
      this.payvenueN = 'xyz';
    }

    this.payvenue = this.data[0].payvenue;
    this.payvenueTxt = this.data[0].selected_payvenue;

    if (this.data[0].site == 'C') {
      this.site = 'Chong Hua Hospital';
    } else {
      this.site = 'Chong Hua Hospital Mandaue';
    }
    //this.daysManaged = atob(sessionStorage.getItem("daysManaged"));
    this.daysManaged = atob(localStorage.getItem('daysManaged'));
    if (this.daysManaged > 1) {
      this.day = 'Days';
    } else {
      this.day = 'Day';
    }

    if (this.payvenue == '' || this.payvenue == null) {
      this.btnclose = true;
      this.ifShowSummary = false;
    } else {
      this.btnclose = true;
      this.ifShowSummary = true;
    }

    //this.checkAppearance();

    //this.functionsService.logToConsole(this.data);

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
        this.functionsService.logToConsole('OPERATE');
        this.checkAppearance();
      });
     */
  }

  redirecto() {
    let data;
    //sessionStorage.setItem("postData", btoa(JSON.stringify(this.postData)));
    //localStorage.setItem('postData', btoa(JSON.stringify(this.postData)));
    localStorage.setItem(
      'postData1',
      btoa(JSON.stringify(this.professionalFeeModelv3))
    );
    if (this.insurance) {
      data = 'insurance';
      this.router.navigate([this.router.url + '/' + data]);
    } else if (this.charity) {
      data = 'charity';
      this.router.navigate([this.router.url + '/' + data]);
    } else if (this.philhealth) {
      data = 'philhealth';
      this.router.navigate([this.router.url + '/' + data]);
    } else if (this.personalphilhealth) {
      data = 'personal-philhealth';
      this.router.navigate([this.router.url + '/' + data]);
    } else {
      //this.functionsService.logToConsole("ELSE");

      if (this.isCoordinator) {
        // this.functionsService.logToConsole(this.isCoordinator);
        /*this.postData.ProfFee = 0;
        this.postData.IsVAT = 'N';
        this.postData.PayVenue = 'A';
        this.postData.SelectedPayVenue = 'Insurance Coordinator\'s Fee';*/

        this.professionalFeeModelv3.doctor_prof_fee = 0;
        this.professionalFeeModelv3.is_vat = 'N';
        this.professionalFeeModelv3.payvenue = 'A';
        this.professionalFeeModelv3.selected_payvenue =
          "Insurance Coordinator's Fee";

        //  sessionStorage.setItem('postData', JSON.stringify(this.postData));
        //sessionStorage.setItem("postData", btoa(JSON.stringify(this.postData)));
        /*localStorage.setItem('postData', btoa(JSON.stringify(this.postData)));*/
        localStorage.setItem(
          'postData1',
          btoa(JSON.stringify(this.professionalFeeModelv3))
        );
      } else {
        /*this.postData.SelectedPayVenue = 'Patient NOT SEEN';
        this.postData.ProfFee = 0;
        this.postData.IsVAT = 'N';
        this.postData.PayVenue = 'N';*/
        this.professionalFeeModelv3.selected_payvenue = 'Patient NOT SEEN';
        this.professionalFeeModelv3.doctor_prof_fee = 0;
        this.professionalFeeModelv3.is_vat = 'N';
        this.professionalFeeModelv3.payvenue = 'N';

        //sessionStorage.setItem('postData', JSON.stringify(this.postData));
        //sessionStorage.setItem("postData", btoa(JSON.stringify(this.postData)));
        /*localStorage.setItem('postData', btoa(JSON.stringify(this.postData)));*/
        localStorage.setItem(
          'postData1',
          btoa(JSON.stringify(this.professionalFeeModelv3))
        );
      }
      //this.functionsService.logToConsole("is patient seen :"+this.isPatientSeen);

      if (this.isPatientSeen == false) {
        // this.functionsService.logToConsole("TRANSACTION SUMMARY");
        //this.router.navigate([this.router.url+'/transaction-summary']);
        let usrl =
          '/menu/in-patients/' +
          this.patient_id +
          '/professional-fee-transaction-summary';
        //  this.functionsService.logToConsole(usrl);

        this.router.navigate([usrl]);
      }
    }
  }

  checkAppearance() {
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

  initiateSession() {
    //this.pfInsCoor = sessionStorage.getItem("pfInsCoor");
    // this.pfIsPatientSeen = sessionStorage.getItem("pfIsPatientSeen");
    //this.checkEmitters();
  }

  // checkEmitters(){

  //   if(this.pfInsCoor!=""){
  //     this.showSeenPatient = true;
  //   }else{
  //     this.showSeenPatient = false;
  //   }
  //       if(this.pfIsPatientSeen == "y"){
  //     this.showSelection = true;
  //   }else{
  //     this.showSelection = false;
  //   }
  // }

  // isInsuranceCoordinatorEventEmitter(e){
  //   if(e){
  //     this.patientNo.pfInsCoor = "y";
  //     this.pfInsCoor = "y";
  //   }else{
  //     this.patientNo.pfInsCoor = "n";
  //     this.pfInsCoor = "n";
  //   }
  //   this.patientNo.pfIsPatientSeen="";
  //   sessionStorage.setItem('pfInsCoor', this.pfInsCoor);
  //   sessionStorage.setItem(this.activatedRoute.snapshot.params.id,JSON.stringify(this.patientNo));
  //   this.showSeenPatient = true;

  // }
  // isPatientSeenEventEmitter(e){
  //   if(e){
  //     this.pfIsPatientSeen = "y";
  //     this.patientNo.pfIsPatientSeen = "y";
  //   }else{
  //     this.pfIsPatientSeen = "n";
  //     this.patientNo.pfIsPatientSeen = "y";
  //   }
  //   sessionStorage.setItem('pfIsPatientSeen', this.pfIsPatientSeen);
  //   sessionStorage.setItem(this.activatedRoute.snapshot.params.id,JSON.stringify(this.patientNo));
  //   if(e){
  //     this.showSelection = true;
  //   }else{
  //     this.showSelection = false;
  //   }

  // }

  isPatientSeenf(f, e) {
    this.areyouaninsurancecoordinator = true;
    if (f == 'isPatientSeen' && e == false) {
      this.toPFMbtn = true;
      // this.functionsService.logToConsole("11111111111111");
      this.disabledselection = false;
    } else if (f == 'isPatientSeen' && e == true) {
      this.personalphilhealth =
        this.insurance =
        this.charity =
        this.philhealth =
          false;
      this.toPFMbtn = false;
      //this.functionsService.logToConsole("2222222222222");
      this.disabledselection = true;
    }
  }

  areyouaninsurancecoordinator: boolean = true;

  buttonclick(f, e) {
    if (f == 'insurance') {
      //this.postData.SelectedPayVenue = 'Insurance + PhilHealth';
      this.professionalFeeModelv3.selected_payvenue = 'Insurance + PhilHealth';
      this.areyouaninsurancecoordinator = true;
    } else if (f == 'philhealth') {
      //this.postData.SelectedPayVenue = 'PhilHealth Only';
      this.professionalFeeModelv3.selected_payvenue = 'PhilHealth Only';
      this.areyouaninsurancecoordinator = true;
    } else if (f == 'charity') {
      //this.postData.SelectedPayVenue = 'Charity';
      this.professionalFeeModelv3.selected_payvenue = 'Charity';
      this.areyouaninsurancecoordinator = e;
      this.isCoordinator = false;
    } else if (f == 'Personalphilhealth') {
      //this.postData.SelectedPayVenue = 'Personal + PhilHealth';
      this.professionalFeeModelv3.selected_payvenue = 'Personal + PhilHealth';
      this.areyouaninsurancecoordinator = true;
    }

    if (f == 'insurance' && e == true) {
      this.personalphilhealth = this.charity = this.philhealth = false;
    } else if (f == 'insurance' && e == false) {
      this.personalphilhealth =
        this.insurance =
        this.charity =
        this.philhealth =
          false;
    }
    if (f == 'charity' && e == true) {
      this.personalphilhealth = this.insurance = this.philhealth = false;
    } else if (f == 'charity' && e == false) {
      this.personalphilhealth =
        this.insurance =
        this.charity =
        this.philhealth =
          false;
    }
    if (f == 'philhealth' && e == true) {
      this.personalphilhealth = this.charity = this.insurance = false;
    } else if (f == 'philhealth' && e == false) {
      this.personalphilhealth =
        this.insurance =
        this.charity =
        this.philhealth =
          false;
    }
    if (f == 'Personalphilhealth' && e == true) {
      this.philhealth = this.charity = this.insurance = false;
    } else if (f == 'Personalphilhealth' && e == false) {
      this.personalphilhealth =
        this.insurance =
        this.charity =
        this.philhealth =
          false;
    }

    if (
      this.insurance == true ||
      this.charity == true ||
      this.philhealth == true ||
      this.personalphilhealth == true
    ) {
      this.toPFMbtn = true;
    } else {
      this.toPFMbtn = false;
    }
  }

  modifyProfFee() {
    this.btnclose = false;
    this.ifShowSummary = false;
  }

  modifyProfFeeClose() {
    this.btnclose = true;
    this.ifShowSummary = true;
  }

  moreorless(data) {
    this.moreOrLess = !data;
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
