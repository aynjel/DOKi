import { Component, OnInit, Input, HostListener } from '@angular/core';
import {
  ModalController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { FunctionsService } from '../../../../shared/functions/functions.service';
import {
  InPatientData,
  ProfessionalFeeModelv3,
} from 'src/app/models/in-patient.model';

import {
  UserSettingsModelv3,
  LoginResponseModelv3,
} from 'src/app/models/doctor';

import {
  InpatientModelInpatients,
  InpatientDetails,
} from '../../../../models/doctor';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import { DoctordetailComponent } from '../../components/doctordetail/doctordetail.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-patientdetail',
  templateUrl: './patientdetail.component.html',
  styleUrls: ['./patientdetail.component.scss'],
})
export class PatientdetailComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Input() patientdetail: any;
  @Input() drcode: any;
  @Input() fromPatientList: any = false;
  @Input() doctorDetail: any;
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
  dischargeNotice: any;
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
  admstat: any = '';
  is_senior;
  is_pwd;
  philhealth_membership;
  constructor(
    public modalController: ModalController,
    public executiveService: ExecutiveService,
    public functionsService: FunctionsService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    console.log('patientdetail', this.patientdetail);

    this.ngUnsubscribe = new Subject();
    const modalState = {
      modal: true,
      desc: 'fake state for our modal',
    };
    history.pushState(modalState, null);
    if (this.fromPatientList) {
      this.presentLoading();
      let responsebe = [];
      console.log(this.patientdetail);

      this.executiveService
        .getPatientDetail(this.patientdetail)
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
              console.log(res1);

              this.dismissLoading();
              this.processData(res1);
            }
          }
        );
    } else {
      let stack = '[' + JSON.stringify(this.patientdetail) + ']';
      this.data = JSON.parse(stack);
      this.processData(this.data);
    }
  }

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

  async closemodal() {
    this.modalController.dismiss({
      dismissed: true,
    });
    console.log(this.doctorDetail);

    if (this.doctorDetail != undefined) {
      console.log('show popup');

      const modal = await this.modalController.create({
        component: DoctordetailComponent,
        cssClass: 'my-custom-modal',
        componentProps: {
          patientdetail: this.doctorDetail,
          drcode: this.drcode,
          doctorDetail: this.doctorDetail,
        },
        animated: false,
      });
      return await modal.present();
    }
  }
  moreOrLess: boolean = false;
  moreorless(data) {
    this.moreOrLess = data;
  }
  loading: any;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    //////////console.log('Loading dismissed!');
  }
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
  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalController.dismiss();
  }
  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
