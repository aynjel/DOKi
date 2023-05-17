import { Component, OnInit, Renderer2, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { ScreenSizeService } from "src/app/services/screen-size/screen-size.service";
import { FunctionsService } from "src/app/shared/functions/functions.service";
import { ProgressnotesHistoryComponent } from "src/app/chh-web-components/progressnotes-history/progressnotes-history.component";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ResiService } from "src/app/services/resi/resi.service";
import { Consta } from "src/app/config/auth-constants";
import {
  InpatientDetails,
  InpatientModelInpatients,
  LoginResponseModelv3,
  PatientDetail,
  UserSettingsModelv3,
} from "src/app/models/doctor";
import { AuthService } from "src/app/services/auth/auth.service";
import {
  InPatientData,
  ProfessionalFeeModelv3,
} from "src/app/models/in-patient.model";
import { ExecutiveService } from "src/app/services/executive/executive.service";
import { Subscription } from "rxjs";
import { Location } from "@angular/common";

@Component({
  selector: "app-progress-notes",
  templateUrl: "./progress-notes.page.html",
  styleUrls: ["./progress-notes.page.scss"],
})
export class ProgressNotesPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isDesktop: boolean;
  patient_id: any;
  patientId: any;
  patientInfo: any;
  progessNotes: any = [];
  progessNotesTemp: any = [];
  progressNotesIsEmpty: boolean = false;
  progressNotesIsNotReady: boolean = false;
  activeDays: any = [];
  accountNo: any;
  patientInfor;
  dateAdmitted;
  data = [];
  @Input() account_no;
  paramsSub: Subscription;
  constructor(
    private screensizeService: ScreenSizeService,
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
    private functionService: FunctionsService,
    public modalController: ModalController,
    private functionsService: FunctionsService,
    private renderer: Renderer2,
    private router: Router,
    private residentService: ResiService,
    private navCtrl: NavController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private executiveService: ExecutiveService,
    private alertController: AlertController,

    private loc: NavController
  ) {
    this.screensizeService
      .isDesktopView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  dischargeNotice;
  is_philhealth_membership;
  is_pwd;
  is_senior;
  admission_status;
  patientDetailfromApi_to;
  patientDetailfromApi_from;

  routerLinkBack;
  data1;
  dr_name;
  dr_code;
  inpatientModelInpatients = new InpatientModelInpatients();
  postData: InPatientData = new InPatientData();
  professionalFeeModelv3: ProfessionalFeeModelv3 = new ProfessionalFeeModelv3();
  userSettingsModelv3: UserSettingsModelv3 = new UserSettingsModelv3();
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  patientName;
  opd_code;
  admissionstatus;
  patient_name;
  checkmark;
  location;
  inpatientDetails: InpatientDetails = new InpatientDetails();
  pnSelected;
  mdCode;
  ngOnInit() {
    //console.log("ngOnInit");
    //console.log(localStorage.getItem("doctor_Status_code"));
    this.paramsSub = this.activatedRoute.params.subscribe((val) => {
      // Handle param values here
    });

    this.ngUnsubscribe = new Subject();
    this.loginResponseModelv3 = new LoginResponseModelv3();
    this.inpatientDetails = new InpatientDetails();
    this.patient_id = this.activatedRoute.snapshot.params.id;
    this.routerLinkBack = "/menu/in-patients/";
    this.loginResponseModelv3 = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    this.userSettingsModelv3 = new UserSettingsModelv3();
    this.userSettingsModelv3 = JSON.parse(
      "[" + atob(localStorage.getItem("user_settings")) + "]"
    );

    let x = JSON.parse(
      unescape(atob(localStorage.getItem("_cap_userDataKey")))
    );

    this.mdCode = x.doctorCode;
    this.loginResponseModelv3 = x;
    this.dr_name = this.loginResponseModelv3.lastName;
    this.dr_code = this.loginResponseModelv3.doctorCode;
    this.inpatientModelInpatients.drCode = this.dr_code;
    this.inpatientModelInpatients.mode = Consta.mode;
    this.postData.DoctorMobileNumber = this.loginResponseModelv3.mobileNo;
    this.professionalFeeModelv3.doctor_mobile_no =
      this.loginResponseModelv3.mobileNo;
    this.professionalFeeModelv3.smsGatewayCHH =
      this.userSettingsModelv3[0].smsGatewayCHH;
    this.professionalFeeModelv3.smsGatewaySmart =
      this.userSettingsModelv3[0].smsGatewaySmart;

    let ppatientdata = new PatientDetail();
    ppatientdata.admissionNo = this.patient_id;
    ppatientdata.doctorCode = this.dr_code;

    this.data = [];
    //this.presentLoading();
    ////////////console.log('123');
    this.pnSelected = JSON.parse(localStorage.getItem("pnSelected"));
    //////console.log(this.pnSelected.doctor_Status_code);
    /*******************************************/

    /*this.executiveService
      .getPatientDetail(ppatientdata)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          localStorage.setItem("doctor_Status_code", res.doctor_Status_code);
          this.admission_status = res.admission_status;
          this.patientDetailfromApi_from = this.functionService.cdateampm(
            res.manage_from
          );
          if (res.manage_to == null) {
            this.patientDetailfromApi_to = "";
          } else {
            this.patientDetailfromApi_to = this.functionService.cdateampm(
              res.manage_to
            );
          }

          localStorage.setItem("admission_status", btoa(this.admission_status));
          localStorage.setItem(
            "Api_from",
            btoa(this.patientDetailfromApi_from)
          );
          localStorage.setItem("Api_to", btoa(this.patientDetailfromApi_to));
          //convertDatetoMMDDYYYYHHMMSS;
          if (res == null) {
            this.back();
          } else {
            this.patientName = res.last_name + ", " + res.first_name;
            this.data1 = JSON.parse("[" + JSON.stringify(res) + "]");
            localStorage.setItem(
              "patientData",
              btoa(JSON.stringify(this.data1))
            );
          }
        },
        (error) => {
          this.dismissLoading();
        },
        () => {
          this.dismissLoading();
          if (this.data1 != "") {
            this.data1.forEach((element) => {
              this.opd_code = element.admission_no;
              this.inpatientModelInpatients.accountNo = this.opd_code;
              this.inpatientDetails.admission_no = this.opd_code;
              this.data.push(element);
              localStorage.setItem(
                "selectedPatient",
                btoa(JSON.stringify(this.data))
              );
              this.admissionstatus = element.admission_status;
              this.patient_name = element.first_name + " " + element.last_name;
              this.patient_name =
                this.functionsService.convertAllFirstLetterToUpperCase(
                  this.patient_name
                );
              if (element.payvenue != null) {
                this.checkmark = true;
              }
            });
            let n = this.data[0].admission_no.indexOf("IPC");
            //this.functionsService.logToConsole(n);

            if (n >= 0) {
              this.location = true;
            } else {
              this.location = false;
            }
            this.start();
          } else {
            this.alert("No Data Available", "Okay");
          }
          //////////////console.log(this.data1);
          //////////////console.log(this.data[0].philhealth_membership);
          this.is_philhealth_membership = this.data[0].philhealth_membership;
          this.is_pwd = this.data1[0].is_pwd;
          this.is_senior = this.data1[0].is_senior;
          //////////////console.log(this.is_pwd, this.is_senior);
        }
      );*/ this.start();
  }
  start() {
    ////////console.log('ngOnInit');
    this.checkAppearance();
    this.ngUnsubscribe = new Subject();
    this.patient_id = this.activatedRoute.snapshot.params.id;
    this.getProgressNote();
    this.data = JSON.parse("[" + localStorage.getItem("pnSelected") + "]");
    //////console.log(this.data);

    this.dateAdmitted = this.data[0].admission_date;
    this.checkAppearance();
    this.dateAdmitted = this.data[0].admission_date;
    this.dischargeNotice = this.data[0].forDischargeDateTime;
    ////////////console.log(this.data[0].philhealth_membership);
    this.is_philhealth_membership = this.data[0].philhealth_membership;
    this.is_pwd = this.data[0].is_pwd;
    this.is_senior = this.data[0].is_senior;
    this.admission_status = atob(localStorage.getItem("admission_status"));
    this.patientDetailfromApi_from = atob(localStorage.getItem("Api_from"));
    this.patientDetailfromApi_to = atob(localStorage.getItem("Api_to"));
  }
  checkAppearance() {
    this.functionsService.logToConsole("checkAppearance");
    var values = JSON.parse(
      "[" + atob(localStorage.getItem("user_settings")) + "]"
    );
    let dr_username = atob(localStorage.getItem("username"));
    values.forEach((element) => {
      this.functionsService.logToConsole(element.darkmode);
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, "color-theme", "dark");
      } else {
        this.renderer.setAttribute(document.body, "color-theme", "light");
      }
    });
  }
  getProgressNote() {
    this.progessNotes = [];
    this.progessNotesTemp = [];
    this.progressNotesIsNotReady = true;
    let perAdmission = {
      account_no: "",
    };
    perAdmission.account_no = this.patient_id;
    this.residentService
      .getPatientProgressNotesPerAdmission(perAdmission)
      .subscribe(
        (res: any) => {
          res.sort(function (a, b) {
            let dateA: any = new Date(a.event_date),
              dateB: any = new Date(b.event_date);
            return dateB - dateA;
          });

          this.progessNotesTemp = res;
        },
        (error) => {},
        () => {
          ////////////console.log(this.progessNotesTemp);

          this.activeDays = [];
          this.progessNotesTemp.forEach((el) => {
            //////console.log(el.resi_notes);
            let counter = 0;
            let approvedCounter = 0;

            let doctor_Status_code = localStorage.getItem("doctor_Status_code");

            if (doctor_Status_code == "AP") {
              el.resi_notes.forEach((elemensssst) => {
                counter += elemensssst.number_of_notes;
                approvedCounter += elemensssst.number_of_ap_approved_notes;
              });
            } else {
              el.resi_notes.forEach((elemensssst) => {
                if (elemensssst.dr_code == this.mdCode) {
                  counter += elemensssst.number_of_notes;
                  approvedCounter += elemensssst.number_of_approved_notes;
                }
              });
            }

            //////console.log(counter, approvedCounter);
            el.pnCounter = counter;
            el.ApperovedpnCounter = approvedCounter;
            let x = 0;
            let xdateadmitted = this.dateAdmitted.substring(0, 11);

            x = this.functionsService.countDays(xdateadmitted, el.event_date);

            this.activeDays.push(el.notes_id);
            el.dateCreateConverted =
              this.functionsService.convertDatetoMMDDYYYY(el.event_date);

            if (
              this.functionsService.convertDatetoMMDDYYYY(this.dateAdmitted) ==
              el.dateCreateConverted
            ) {
              x = 0;
            }

            el.day = x;
            el.dateCreateTimeConverted = this.functionsService.getTime(
              el.event_date
            );

            el.dateUpdateConverted =
              this.functionsService.convertDatetoMMDDYYYY(el.date_updated);
            el.dateUpdateTimeConverted = this.functionsService.getTime(
              el.date_updated
            );
            if (el.date_updated == "0001-01-01T00:00:00") {
              el.dateUpdateConverted = "";
            }
            el.notessmall = this.functionsService.truncateChar(el.notes, 300);
            /*if (el.notes.length > 200) {
              el.noteslength = true;
            } else {
              el.noteslength = false;
            }*/
            this.progessNotes.push(el);
          });
          ////////////console.log(this.progessNotes);

          if (this.progessNotes.length <= 0) {
            this.progressNotesIsEmpty = true;
          } else {
            this.progressNotesIsEmpty = false;
          }
          this.progressNotesIsNotReady = false;
          //this.scrolltotop();
        }
      );
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  async options(data) {
    const options = {
      component: ProgressnotesHistoryComponent,
      cssClass: "ion5modalviewedithistory",
      swipeToClose: true,
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 1,
      backdropDismiss: false,
      componentProps: { data: data },
    };
    const modal = await this.modalController.create(options);
    await modal.present();
    // const {data} = await modal.onWillDismiss();
  }
  async viewhistory(data, day) {
    /*
    const modal = await this.modalController.create({
      component: ProgressnotesHistoryComponent,
      backdropDismiss: false,
      componentProps: { data: data, day: day },
    });
    modal.onDidDismiss().then((data) => {
      ////////console.log(data);
    });
    return await modal.present();*/
    const options = {
      component: ProgressnotesHistoryComponent,
      cssClass: "ion5modalviewedithistory",
      swipeToClose: true,
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 1,
      backdropDismiss: false,
      componentProps: { data: data, day: day },
    };
    const modal = await this.modalController.create(options);
    await modal.present();
    // const {data} = await modal.onWillDismiss();
  }

  gotoPerday(date, dayselected) {
    localStorage.setItem("dayselected", dayselected);
    let day = this.functionService.convertDatedash(date);
    this.ngOnDestroy();
    this.router.navigate([
      "/menu/in-patients/" + this.patient_id + "/progressnotes/" + day,
    ]);
  }

  checkNumberofNotes(data) {
    if (data >= 1) {
      return "mango";
    } else {
      return "";
    }
  }
  back() {
    console.log(localStorage.getItem("fromurl"));
    if (localStorage.getItem("fromurl") == "PatientHistory") {
      this.router.navigate(["/menu/patient-history"]);
    } else {
      this.router.navigate([
        "/menu/in-patients/" + localStorage.getItem("fromurl"),
      ]);
    }
    //
    // this.loc.back();
  }
  loading;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    ////////////////////////////console.log('Loading dismissed!');
  }
  public async dismissLoading(): Promise<void> {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  async alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
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
  closemodal() {
    this.router.navigate(["/menu/patient-history/"]);
  }

  ngOnDestroy() {
    ////console.log("ngOnDestroy");

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    // Prevent memory leaks
    this.paramsSub.unsubscribe();
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
