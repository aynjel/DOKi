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
import { ChhAppFeePage } from '../../../../chh-web-components/chh-app-fee/chh-app-fee.page';
import { from } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { timeStamp } from 'console';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AuthService } from 'src/app/services/auth/auth.service';

import { FunctionsService } from '../../../../shared/functions/functions.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { logWarnings } from 'protractor/built/driverProviders';
//import { ChemistryPage } from "../../../../chh-web-components/chh-app-test/chemistry/chemistry.page";
import { ChhAppBasePage } from '../../../../chh-web-components/chh-app-test/chh-app-base/chh-app-base.page';
import { Messages } from '../../../../shared/messages';
import { ScreenSizeService } from '../../../../services/screen-size/screen-size.service';
import { ChhAppTestChemistryComponent } from '../../../../chh-web-components/chh-app-test/chh-app-test-chemistry/chh-app-test-chemistry.component';
import { ChhAppTestFecalysisComponent } from '../../../../chh-web-components/chh-app-test/chh-app-test-fecalysis/chh-app-test-fecalysis.component';
import { ChhAppTestSerologyComponent } from '../../../../chh-web-components/chh-app-test/chh-app-test-serology/chh-app-test-serology.component';
import { StorageService } from '../../../../services/storage/storage.service';
import { AuthConstants, Consta } from '../../../../config/auth-constants';
import { executionAsyncResource } from 'async_hooks';
import { Constants } from 'src/app/shared/constants';

import {
  InPatientData,
  ProfessionalFeeModelv3,
} from 'src/app/models/in-patient.model';

import {
  UserSettingsModelv3,
  LoginResponseModelv3,
  PatientDetail,
} from 'src/app/models/doctor';

import {
  InpatientModelInpatients,
  InpatientDetails,
} from '../../../../models/doctor';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.page.html',
  styleUrls: ['./patient-detail.page.scss'],
})
export class PatientDetailPage implements OnInit {
  private ngUnsubscribe = new Subject();
  @Input() patientdetail: any;
  inpatientModelInpatients = new InpatientModelInpatients();

  data: any = [];
  data1: any;
  site: any;
  date: any;
  professionalFee: any;
  remarks: any;
  method: any;
  isFetchDone: boolean = false;
  objecthandler: boolean = false;
  coDoctors: any;
  finalDiagnosis: any;
  finalDiagnosis1: any;
  finalDiagnosis2: any;
  admittingDiagnosis: any;
  admittingDiagnosis1: any;
  admittingDiagnosis2: any;
  text: string;
  checkmark: boolean = false;
  limit: number = 40;
  truncating = true;
  truncating1 = true;
  daysOfManage: any;
  dateAdmitted: any;
  ionSkeleton: boolean = false;
  currentExamList: any;
  currentExamList_filtered: any = [];
  isDesktop: boolean;
  examListSkeleton: boolean = false;
  ExamData: any = '';
  hospitalSite: any;
  serology: boolean = false;
  chemistry: boolean = false;
  fecalysis: boolean = false;
  cbc: boolean = false;
  urinalysis: boolean = false;
  refresher: boolean = true;
  searchBar: any;
  routerLinkBack: any;
  HighlightRow: number;
  ClickedRow: any;
  dr_code: any;
  dr_name: any;
  patient_name: any;
  patient_no: any;
  postData: InPatientData = new InPatientData();
  professionalFeeModelv3: ProfessionalFeeModelv3 = new ProfessionalFeeModelv3();
  userSettingsModelv3: UserSettingsModelv3 = new UserSettingsModelv3();
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();

  inpatientDetails: InpatientDetails = new InpatientDetails();
  location: boolean;
  patient_id: any;
  opd_code: any;
  admissionstatus: any;
  id: any;
  method1: any;
  back: any;
  patientid: any;
  patientDetail;
  is_pwd;
  is_senior;
  dischargeNotice;
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
    public nav: NavController,

    public executiveService: ExecutiveService,
    public navCtrl: NavController
  ) {
    //this.functionsService.logToConsole('In-patient detail : Constructor');
    localStorage.setItem('modaled', '0');
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ionViewWillEnter() {}
  drcode: any;
  moreOrLess: boolean = true;
  moreorless(data) {
    this.moreOrLess = data;
  }
  closemodal() {
    this.navCtrl.back();
  }

  ngOnInit() {
    console.log('YAHOO');
    this.patientDetail = new PatientDetail();
    console.log(this.activatedRoute.snapshot.params.admissionNo);
    let x = this.activatedRoute.snapshot.params.admissionNo;
    console.log(this.activatedRoute.snapshot.params.doctorCode);
    let y = this.activatedRoute.snapshot.params.doctorCode;
    this.patientDetail.admissionNo = x;
    this.patientDetail.doctorCode = y;

    let responsebe;
    console.log(this.patientDetail);

    this.executiveService
      .getPatientDetail(this.patientDetail)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          responsebe = res;
        },
        (error) => {
          this.dismissLoading();
        },
        () => {
          if (responsebe == null) {
            this.dismissLoading();
            this.alert('No Data Available', 'Okay');
          } else {
            let res1 = [];
            res1 = JSON.parse('[' + JSON.stringify(responsebe) + ']');
            this.dismissLoading();
            this.patientDetail = res1;
            this.processData(res1);
          }
        }
      );
    /*
    console.log();
    
    
    this.data = JSON.parse('['+atob(localStorage.getItem('patientdetails'))+']');
    this.dateAdmitted = this.data[0].admission_date;
    this.admissionstatus = this.data[0].admission_status;
    this.inpatientDetails.admission_no = this.data[0].admission_no;



    this.executiveService.getAdmittingDiagnosis(this.inpatientDetails).subscribe(
      (res: any) => {   
        console.log(res);
        
        if(!Object.keys(res).length){
          //this.functionsService.logToConsole("no data found");
        }else{
          this.admittingDiagnosis = res.admitting_diagnosis2.replace(
            /(\r\n|\n|\r)/gm,
            '<br />'
          );
          //this.functionsService.logToConsole('admittingDiagnosis : ' + this.admittingDiagnosis);
          this.admittingDiagnosis1 = this.functionsService.truncateChar(
            res.admitting_diagnosis2,
            100
          );
          this.admittingDiagnosis1 = this.admittingDiagnosis1.replace(
            /(\r\n|\n|\r)/gm,
            '<br />'
          );
          this.admittingDiagnosis2 = this.admittingDiagnosis.replace(
            /(,)/gm,
            ',<br />'
          );
          //this.functionsService.logToConsole('admittingDiagnosis2 : ' + this.admittingDiagnosis2);
      }

     
      },
      (error) => {},
      () => {

      }
    );
    
    this.executiveService.getFinalDiagnosis(this.inpatientDetails).subscribe(
      (res: any) => {   
        console.log(res);
        
        if(!Object.keys(res).length){
          // this.functionsService.logToConsole("no data found");
         }else{
           this.finalDiagnosis = res.final_diagnosis;
           //this.functionsService.logToConsole(this.finalDiagnosis);
           
           this.finalDiagnosis1 = this.functionsService.truncateChar(
             this.finalDiagnosis,
             50
           );
           this.finalDiagnosis2 = this.finalDiagnosis
             .replace(/(\r\n|\n|\r)/gm, '')
             .split('.)');
           this.finalDiagnosis2.shift();
           for (let i = 0; i < this.finalDiagnosis2.length - 1; i++) {
             this.finalDiagnosis2[i] = this.finalDiagnosis2[i].substring(
               0,
               this.finalDiagnosis2[i].length - 1
             );
             this.functionsService.logToConsole(this.finalDiagnosis2[i]);
           }
           for (let i = 0; i < this.finalDiagnosis2.length; i++) {
             this.finalDiagnosis2[i] = i + 1 + '.) ' + this.finalDiagnosis2[i];
           }
         }
      },
      (error) => {},
      () => {

      }
    );
    let coDoctors1 = [];
    let coDoctors2 = [];
    let coDoctors3 = [];
    this.executiveService.getCoDoctors(this.inpatientDetails).subscribe(
      (res: any) => {
        res.forEach((element) => {
          if (element.dr_code == this.data[0].dr_code) {
            if (element.no_of_days_manage == null) {
              this.daysOfManage = 0;
            } else {
              this.daysOfManage = element.no_of_days_manage;
            }
            //sessionStorage.setItem('daysManaged', btoa(this.daysOfManage));
            localStorage.setItem('daysManaged', btoa(this.daysOfManage));
          }
          //
        });
        if (res.length) {
          this.objecthandler = true;
        } else {
          this.objecthandler = false;
        }
        //this.functionsService.logToConsole(res);
        res.forEach((element) => {
          if (element.status == 'Primary Attending Physician') {
            coDoctors1.push(element);
          } else if (element.status == 'Co-Manage') {
            coDoctors2.push(element);
          } else {
            coDoctors3.push(element);
          }
        });

        this.coDoctors = coDoctors1.concat(coDoctors2).concat(coDoctors3);
        console.log(this.coDoctors);
        
        //this.coDoctors.push(coDoctors2);
      },
      (error) => {
        this.isFetchDone = true;
        //this.functionsService.alert('Server Error', 'Okay');
      },
      () => {
        this.isFetchDone = true;
      }
    );*/
  }
  admstat;
  processData(responsebe) {
    //let stack = '['+JSON.stringify(responsebe)+']';
    //this.data = JSON.parse(stack);

    this.data = responsebe;
    //////console.log(this.data);

    //this.data = this.patientdetail;
    //////////console.log(this.data);
    //////////console.log(this.data);
    //this.dateAdmitted = this.data[0].admission_date;

    this.dateAdmitted = this.data[0].admission_date;

    //this.dischargeNotice =
    //console.log(this.data);

    this.admissionstatus = this.data[0].admission_status;
    this.admstat = this.functionsService.getAdmissionStatus(
      this.data[0].admission_status
    );
    //////console.log(this.admstat);

    this.inpatientDetails.admission_no = this.data[0].admission_no;

    //this.drcode =
    this.executiveService
      .getAdmittingDiagnosis(this.inpatientDetails)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////////////console.log(res);

          if (!Object.keys(res).length) {
            ////this.functionsService.logToConsole("no data found");
          } else {
            this.admittingDiagnosis = res.admitting_diagnosis2.replace(
              /(\r\n|\n|\r)/gm,
              '<br />'
            );
            ////this.functionsService.logToConsole('admittingDiagnosis : ' + this.admittingDiagnosis);
            this.admittingDiagnosis1 = this.functionsService.truncateChar(
              res.admitting_diagnosis2,
              100
            );
            this.admittingDiagnosis1 = this.admittingDiagnosis1.replace(
              /(\r\n|\n|\r)/gm,
              '<br />'
            );
            this.admittingDiagnosis2 = this.admittingDiagnosis.replace(
              /(,)/gm,
              ',<br />'
            );
            ////this.functionsService.logToConsole('admittingDiagnosis2 : ' + this.admittingDiagnosis2);
          }
        },
        (error) => {},
        () => {
          this.admstat = this.functionsService.getAdmissionStatus(
            this.data[0].admission_status
          );
          //////console.log(this.admstat);
        }
      );

    this.executiveService
      .getFinalDiagnosis(this.inpatientDetails)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////////////console.log(res);
          if (res != null) {
            if (!Object.keys(res).length) {
              // //this.functionsService.logToConsole("no data found");
            } else {
              this.finalDiagnosis = res.final_diagnosis;
              ////this.functionsService.logToConsole(this.finalDiagnosis);

              this.finalDiagnosis1 = this.functionsService.truncateChar(
                this.finalDiagnosis,
                50
              );
              this.finalDiagnosis2 = this.finalDiagnosis
                .replace(/(\r\n|\n|\r)/gm, '')
                .split('.)');
              this.finalDiagnosis2.shift();
              for (let i = 0; i < this.finalDiagnosis2.length - 1; i++) {
                this.finalDiagnosis2[i] = this.finalDiagnosis2[i].substring(
                  0,
                  this.finalDiagnosis2[i].length - 1
                );
                //this.functionsService.logToConsole(this.finalDiagnosis2[i]);
              }
              for (let i = 0; i < this.finalDiagnosis2.length; i++) {
                this.finalDiagnosis2[i] =
                  i + 1 + '.) ' + this.finalDiagnosis2[i];
              }
            }
          }
        },
        (error) => {},
        () => {}
      );
    let coDoctors1 = [];
    let coDoctors2 = [];
    let coDoctors3 = [];
    this.executiveService
      .getCoDoctors(this.inpatientDetails)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          res.forEach((element) => {
            if (element.dr_code == this.data[0].dr_code) {
              if (element.no_of_days_manage == null) {
                this.daysOfManage = 0;
              } else {
                this.daysOfManage = element.no_of_days_manage;
              }
              //sessionStorage.setItem('daysManaged', btoa(this.daysOfManage));
              localStorage.setItem('daysManaged', btoa(this.daysOfManage));
            }
            //
          });
          if (res.length) {
            this.objecthandler = true;
          } else {
            this.objecthandler = false;
          }
          ////this.functionsService.logToConsole(res);
          res.forEach((element) => {
            if (element.status == 'Primary Attending Physician') {
              coDoctors1.push(element);
            } else if (element.status == 'Co-Manage') {
              coDoctors2.push(element);
            } else {
              coDoctors3.push(element);
            }
          });

          this.coDoctors = coDoctors1.concat(coDoctors2).concat(coDoctors3);
          ////////////console.log(this.coDoctors);

          //this.coDoctors.push(coDoctors2);
        },
        (error) => {
          this.isFetchDone = true;
          //this.functionsService.alert('Server Error', 'Okay');
        },
        () => {
          this.isFetchDone = true;
        }
      );
  }

  loading: any;
  public async dismissLoading(): Promise<void> {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  async alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: data1,
      backdropDismiss: false,
      buttons: [
        {
          text: data2,
          handler: () => {
            this.closemodal();
          },
        },
      ],
    });
    await alert.present();
  }
}
