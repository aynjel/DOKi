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

@Component({
  selector: 'app-laboratory-test-modal',
  templateUrl: './laboratory-test-modal.page.html',
  styleUrls: ['./laboratory-test-modal.page.scss'],
})
export class LaboratoryTestModalPage implements OnInit {
  @Input() patient_no: string;
  dr_name: any;
  dr_code: any;
  data: any;
  searchBar: any;
  isDesktop: boolean;
  ClickedRow: any;
  currentExamList: any;
  currentExamList_filtered: any = [];
  ExamData: any = '';
  HighlightRow: number;
  hospitalSite: any;
  serology: boolean = false;
  chemistry: boolean = false;
  fecalysis: boolean = false;
  cbc: boolean = false;
  urinalysis: boolean = false;
  refresher: boolean = true;
  examListSkeleton: boolean = false;
  patient_name: any;
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
    //protected $gaService: GoogleAnalyticsService,
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
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    };
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.checkAppearance();
    let logindata = <LoginResponseModelv3>this.authService.userData$.getValue();
    this.dr_name = logindata.lastName;
    this.dr_code = logindata.doctorCode;

    this.data = [];
    this.doctorService.getInPatient(this.dr_code).subscribe(
      (res: any) => {
        res.forEach((element) => {
          if (element.patient_no == this.patient_no) {
            this.data.push(element);
            this.patient_name = element.first_name + ' ' + element.last_name;
          }
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.getExamList(this.data[0].patient_no);
      }
    );
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
  filterList() {
    this.currentExamList_filtered = [];
    let temp_testname;
    let temp_examtype;
    let temp_exam;
    let temp_searcbar;

    this.currentExamList.forEach((element) => {
      temp_testname = element.Test_Name.toLowerCase();
      temp_examtype = element.Exam.toLowerCase();
      temp_exam = element.ExamType.toLowerCase();
      temp_searcbar = this.searchBar.toLowerCase();
      if (
        temp_testname.search(temp_searcbar) >= 0 ||
        temp_examtype.search(temp_searcbar) >= 0 ||
        temp_exam.search(temp_searcbar) >= 0
      ) {
        this.currentExamList_filtered.push(element);
      }
    });
  }
  async examDetails(data: any, site: any, i) {
    this.HighlightRow = i;
    this.ExamData = data;
    this.hospitalSite = site;

    if (!this.isDesktop) {
      const modal = await this._modalController.create({
        component: ChhAppBasePage,
        componentProps: { ExamDetails: data, Site: site },
        cssClass: 'my-custom-modal-inpatient-css',
      });
      modal.present();
      return await modal.onDidDismiss().then((data: any) => {});
    } else {
      if (this.ExamData.Exam == 'Serology') {
        this.chemistry = false;
        this.serology = true;
        this.fecalysis = false;
        this.urinalysis = false;
        this.cbc = false;
      } else if (this.ExamData.Exam == 'Chemistry') {
        this.chemistry = true;
        this.serology = false;
        this.fecalysis = false;
        this.urinalysis = false;
        this.cbc = false;
      } else if (this.ExamData.Exam == 'Fecalysis') {
        this.chemistry = false;
        this.serology = false;
        this.fecalysis = true;
        this.urinalysis = false;
        this.cbc = false;
      } else if (this.ExamData.Exam == 'Urinalysis') {
        this.chemistry = false;
        this.serology = false;
        this.fecalysis = false;
        this.urinalysis = true;
        this.cbc = false;
      } else if (
        this.ExamData.Exam == 'Hematology' &&
        this.ExamData.ExamType == 'CBC'
      ) {
        this.chemistry = false;
        this.serology = false;
        this.fecalysis = false;
        this.urinalysis = false;
        this.cbc = true;
      }

      this.updateDisplay(true);
      this.updateDisplay(false);
      // this.loadComponents();
    }
  }
  updateDisplay(data: boolean) {
    if (data) {
      this.refresher = !this.refresher;
    } else {
      setTimeout(() => (this.refresher = true), 50);
    }
  }
  getExamList(data) {
    console.log(data);

    //this.ionSkeleton = true;
    var date1 = new Date(this.data[0].admission_date);
    var seconds1 = date1.getTime() / 1000; //1440516958
    this.currentExamList = [];
    this.examListSkeleton = true;
    this.patientService.getCebuExamList(data).subscribe(
      (res: any) => {
        res.forEach((element) => {
          var date = new Date(element.RequestDateTime);
          var seconds = date.getTime() / 1000; //1440516958
          if (seconds >= seconds1) {
            element.RequestDateTime = new Date(
              element.RequestDateTime
            ).toLocaleDateString();
            element.Exam = this.functionsService.convertToCamelCase(
              element.Exam
            );
            this.currentExamList.push(element);
            this.currentExamList_filtered.push(element);
            // console.log(element.Test_Name + ' | '+new Date(element.RequestDateTime));
            //console.log(new Date(element.RequestDateTime));
          }
        });
        //console.log(this.currentExamList);
      },
      (error) => {
        this.examListSkeleton = false;
      },
      () => {
        this.examListSkeleton = false;
      }
    );
  }
}
