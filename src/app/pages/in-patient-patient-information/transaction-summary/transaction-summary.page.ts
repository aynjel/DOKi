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
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { executionAsyncResource } from 'async_hooks';
import { Constants } from 'src/app/shared/constants';
import { CaseRatesPage } from '../../case-rates/case-rates.page';

import {
  UserSettingsModelv3,
  LoginResponseModelv3,
} from 'src/app/models/doctor';
import {
  InPatientData,
  ProfessionalFeeModelv3,
} from 'src/app/models/in-patient.model';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.page.html',
  styleUrls: ['./transaction-summary.page.scss'],
})
export class TransactionSummaryPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isDesktop: any;
  routerLinkBack: any;
  routerLinkBack1: any;
  routerLinkBack2: any;
  routerLinkBack3: any;
  method: any = '';
  method1: any;
  id: any;
  dr_name: any;
  //postData: InPatientData = new InPatientData();
  public logindata: LoginData;
  dr_code: any;
  patient_id: any;
  data: any;
  data1: any;
  patient_name: any;
  dateAdmitted: any;
  isPatientSeen: any = 'o';
  InsurancePF: number;
  InsuranceShowVat: boolean = false;
  InsuranceVat: boolean = false;

  PhilhealthPF: number;
  PhilhealthShowValue: boolean = true;
  IsPhilhealthOnly: boolean = false;
  progressStatus: any = 0.75;
  summary: any;
  summaryHeader: any;
  withVat: any;
  withVatN: any;
  payvenue: any;
  payvenueN: any;
  daysManaged: any;
  site: any;
  day: any;
  moreOrLess: boolean = false;
  professionalFeeModelv3: ProfessionalFeeModelv3 = new ProfessionalFeeModelv3();
  userSettingsModelv3: UserSettingsModelv3 = new UserSettingsModelv3();
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  btnsubmit = 'btnsubmit';
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
    protected $gaService: GoogleAnalyticsService,
    private authService: AuthService,
    public functionsService: FunctionsService,
    private patientService: PatientService,
    private screensizeService: ScreenSizeService,
    public messages: Messages,
    public storageService: StorageService,
    public constants: Constants,
    private renderer: Renderer2,
    public nav: NavController
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

  ngOnInit() {
    this.checkAppearance();
    if (this.isDesktop) {
      this.moreOrLess = false;
    }
    //this.postData = JSON.parse(atob(localStorage.getItem('postData'))) as InPatientData;
    this.professionalFeeModelv3 = JSON.parse(
      atob(localStorage.getItem('postData1'))
    );

    this.data1 = this.professionalFeeModelv3.doctor_prof_fee;
    this.daysManaged = atob(localStorage.getItem('daysManaged'));
    if (this.daysManaged > 1) {
      this.day = 'Days';
    } else {
      this.day = 'Day';
    }
    this.withVatN = this.professionalFeeModelv3.is_vat;
    if (this.professionalFeeModelv3.is_vat == 'Y') {
      this.withVat = '(+ VAT)';
    } else {
      this.withVat = '(No VAT)';
    }
    this.payvenueN = this.professionalFeeModelv3.payvenue;

    if (this.professionalFeeModelv3.selected_payvenue == 'Charity') {
      this.payvenueN = 'xyz';
    }

    this.functionsService.logToConsole(this.professionalFeeModelv3);

    this.functionsService.logToConsole('data1 :' + this.data1);
    this.functionsService.logToConsole('withVatN :' + this.withVatN);
    this.functionsService.logToConsole('payvenueN :' + this.payvenueN);

    if (this.professionalFeeModelv3.payvenue == 'W') {
      this.payvenue = 'Charity / PhilHealth';
    } else if (this.professionalFeeModelv3.payvenue == 'H') {
      this.payvenue = 'c/o Insurance';
    } else if (this.professionalFeeModelv3.payvenue == 'X') {
      this.payvenue = 'c/o Insurance';
    } else if (this.professionalFeeModelv3.payvenue == 'N') {
      this.payvenue = 'Not Seen ';
    } else if (this.professionalFeeModelv3.payvenue == 'A') {
      this.payvenue = "Coordinator's Fee";
    }
    this.payvenue = this.professionalFeeModelv3.selected_payvenue;

    this.id = this.activatedRoute.snapshot.params.id;
    this.method = this.method1 = this.activatedRoute.snapshot.params.method;
    this.summary = this.activatedRoute.snapshot.params.summary;

    if (this.method != null) {
      this.method = this.functionsService.convertAllFirstLetterToUpperCase(
        this.method
      );
      this.summaryHeader =
        this.method +
        ' - ' +
        this.functionsService.convertAllFirstLetterToUpperCase(this.summary);
    } else {
      this.summaryHeader = 'Transaction Summary';
    }

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
  is_pwd;
  is_senior;
  payvenueTxt;
  ionViewWillEnter() {
    this.ngUnsubscribe = new Subject();
    //sessionStorage.removeItem('pfIsPatientSeen');
    //sessionStorage.removeItem('pfInsCoor');
    //this.checkAppearance();
    let logindata = <LoginResponseModelv3>this.authService.userData$.getValue();

    // this.data = JSON.parse(atob(sessionStorage.getItem("patientData")));
    this.data = JSON.parse(atob(localStorage.getItem('patientData')));
    console.log(this.data);
    this.payvenueTxt = this.data[0].payvenue;
    this.is_pwd = this.data[0].is_pwd;
    this.is_philhealth_membership = this.data[0].philhealth_membership;
    this.is_senior = this.data[0].is_senior;
    this.patient_name = this.data[0].first_name + ' ' + this.data[0].last_name;
    this.patient_name = this.functionsService.convertAllFirstLetterToUpperCase(
      this.patient_name
    );
    if (this.data[0].site == 'C') {
      this.site = 'Chong Hua Hospital';
    } else {
      this.site = 'Chong Hua Hospital Mandaue';
    }
    if (this.id != this.data[0].admission_no) {
      this.nav.back();
    }
    this.dateAdmitted = this.data[0].admission_date;
  }
  disableSubmit: boolean = false;

  postSummary() {
    this.disableSubmit = true;
    //this.postData.Mode = Consta.mode;
    if (
      this.data[0].payvenue == 'W' ||
      this.data[0].payvenue == 'H' ||
      this.data[0].payvenue == 'X' ||
      this.data[0].payvenue == 'N' ||
      this.data[0].payvenue == 'A'
    ) {
      this.professionalFeeModelv3.old_prof_fee = this.data[0].doctor_prof_fee;

      this.functionsService.logToConsole(
        JSON.stringify(this.professionalFeeModelv3)
      );
      this.doctorService
        .updatePFV3(this.professionalFeeModelv3)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res: any) => {
            if (res == true) {
              this.modalUpdate(
                'SUCCESS',
                'Successfully UPDATED your Professional Fee.'
              );
            } else {
              this.functionsService.alert(
                'UPDATING of Professional Fee was unsuccessful. Please try again.',
                'Okay'
              );
              this.disableSubmit = false;
            }
          },
          (error) => {
            this.functionsService.alert(
              'SAVING of Professional Fee was unsuccessful. Please try again.',
              'Okay'
            );
            this.disableSubmit = false;
          },
          () => {}
        );
    } else {
      this.professionalFeeModelv3.old_prof_fee = 0;
      this.functionsService.logToConsole(
        JSON.stringify(this.professionalFeeModelv3)
      );
      this.doctorService
        .insertPFV3(this.professionalFeeModelv3)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res: any) => {
            this.functionsService.logToConsole(res);

            if (res == true) {
              this.modalUpdate(
                'SUCCESS',
                'Thank you, Dok! You have successfully SAVED your Professional Fee.'
              );
            } else {
              this.functionsService.alert(
                'SAVING of Professional Fee was unsuccessful. Please try again.',
                'Okay'
              );
              this.disableSubmit = false;
            }
          },
          (error) => {
            this.functionsService.alert(
              'SAVING of Professional Fee was unsuccessful. Please try again.',
              'Okay'
            );
            this.disableSubmit = false;
          },
          () => {}
        );
    }
  }

  async modalUpdate(header, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.disableSubmit = false;
            this.functionsService.logToConsole(this.isDesktop);

            if (!this.isDesktop) {
              this.alertController.dismiss();
              //this.router.navigate(['menu/in-patients/']);
              this.router.navigate(['menu/in-patients/']).then(() => {
                window.location.reload();
              });
            } else {
              this.alertController.dismiss();
              // using the injected ModalController this page
              // can "dismiss" itself and optionally pass back data
              this.modalController.dismiss({
                dismissed: true,
              });
              //this.router.navigate(['menu/in-patients/']);
              this.router.navigate(['menu/in-patients/']).then(() => {
                window.location.reload();
              });
            }
            //this.nav.navigateBack('menu/in-patients' );
          },
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
  }

  moreorless(data) {
    this.moreOrLess = !data;
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
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
