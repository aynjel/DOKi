import { Component, Renderer2 } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import {
  ModalController,
  AlertController,
  NavController,
  LoadingController,
} from "@ionic/angular";
import { ChhAppFeePage } from "../../../chh-web-components/chh-app-fee/chh-app-fee.page";
import { PopoverController } from "@ionic/angular";
import { DoctorService } from "src/app/services/doctor/doctor.service";
//import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AuthService } from "src/app/services/auth/auth.service";

import { FunctionsService } from "../../../shared/functions/functions.service";
import { PatientService } from "src/app/services/patient/patient.service";
import { ChhAppBasePage } from "../../../chh-web-components/chh-app-test/chh-app-base/chh-app-base.page";
import { Messages } from "../../../shared/messages";
import { ScreenSizeService } from "../../../services/screen-size/screen-size.service";
import { StorageService } from "../../../services/storage/storage.service";
import { Consta } from "../../../config/auth-constants";

import { Constants } from "src/app/shared/constants";

import {
  InPatientData,
  ProfessionalFeeModelv3,
} from "src/app/models/in-patient.model";

import {
  UserSettingsModelv3,
  LoginResponseModelv3,
  PatientDetail,
  ErpatientDetails,
  ErpatientModelInpatients,
} from "src/app/models/doctor";

import { AESEncryptDecryptServiceService } from "src/app/services/encryption/aesencrypt-decrypt-service.service";
import { ExecutiveService } from "src/app/services/executive/executive.service";
import { takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";

import { ResiService } from "src/app/services/resi/resi.service";
@Component({
  selector: "app-er-patient-detail",
  templateUrl: "./er-patient-detail.page.html",
  styleUrls: ["./er-patient-detail.page.scss"],
})
export class ErPatientDetailPage {
  inpatientModelInpatients = new ErpatientModelInpatients();
  private ngUnsubscribe = new Subject();
  data: any = [];
  data1: any;
  site: any;
  date: any;
  professionalFee: any;
  remarks: any;
  method: any;
  isFetchDone = false;
  objecthandler = false;
  coDoctors: any;
  finalDiagnosis: any;
  finalDiagnosis1: any;
  finalDiagnosis2: any;
  admittingDiagnosis: any;
  admittingDiagnosis1: any;
  admittingDiagnosis2: any;
  text: string;
  checkmark = false;
  limit = 40;
  truncating = false;
  truncating1 = true;
  daysOfManage: any;
  dateAdmitted: any;
  dischargeNotice: any;
  ionSkeleton = false;
  currentExamList: any;
  currentExamList_filtered: any = [];
  isDesktop;
  examListSkeleton = false;
  ExamData: any = "";
  hospitalSite: any;
  serology = false;
  chemistry = false;
  fecalysis = false;
  cbc = false;
  urinalysis = false;
  refresher = true;
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

  inpatientDetails: ErpatientDetails = new ErpatientDetails();
  location;
  patient_id: any;
  opd_code: any;
  admissionstatus: any;
  progNot_InitDisplay: any;
  progNot_account_no: any = "";

  patientId: any;
  patientInfo: any;

  progessNotes: any = [];
  progessNotesTemp: any = [];
  progressNotesIsEmpty = false;
  progressNotesIsNotReady = false;
  dateToday: any;
  user_created: any;
  activeDays: any = [];
  birthday: any;
  age: any;
  pdfSrc = "";
  is_senior;
  is_pwd;
  philhealth_membership;
  isCancelFinalDiagnosisApproval;
  finalDiagnosisApproval;
  patientName;
  is_philhealth_membership;
  admissionNo;
  dischargeNo;
chiefComplaint: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    public modalController: ModalController,
    public _modalController: ModalController,
    public popover: PopoverController,
    private doctorService: DoctorService,
    public alertController: AlertController,

    private authService: AuthService,
    public functionsService: FunctionsService,
    private patientService: PatientService,
    private screensizeService: ScreenSizeService,
    public messages: Messages,
    public storageService: StorageService,
    public constants: Constants,
    private renderer: Renderer2,
    public nav: NavController,
    public aes: AESEncryptDecryptServiceService,
    public executiveService: ExecutiveService,
    public loadingController: LoadingController,
    private functionService: FunctionsService,
    private resiServ: ResiService
  ) {
    localStorage.setItem("modaled", "0");
    this.screensizeService
      .isDesktopView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });
    this.ClickedRow = function (index) {
      this.HighlightRow = index;
    };
  }
  patientDetailfromApi_from;
  patientDetailfromApi_to;
  admission_status;
  admission_no = this.activatedRoute.snapshot.params.id;
  ionViewWillEnter() {
    this.ngUnsubscribe = new Subject();
    this.loginResponseModelv3 = new LoginResponseModelv3();
    this.inpatientDetails = new ErpatientDetails();
    this.patient_id = this.activatedRoute.snapshot.params.id;
    localStorage.setItem("fromurl", this.patient_id);
    this.routerLinkBack = "/menu/er-patients/";
    
    this.loginResponseModelv3 = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    this.userSettingsModelv3 = new UserSettingsModelv3();
    this.userSettingsModelv3 = JSON.parse(
      "[" + atob(localStorage.getItem("user_settings")) + "]"
    );

    this.loginResponseModelv3 = this.authService.userData$.getValue();
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

    const ppatientdata = new PatientDetail();
    ppatientdata.admissionNo = this.patient_id;
    this.data = [];
    this.presentLoading();
    
    this.doctorService
      .getErPatientV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (data: any) => {
          this.data = data.filter((element) => element.admission_no == this.admission_no);
          this.patient_name = this.data[0].first_name + " " + this.data[0].last_name;
          localStorage.setItem("selectedPatient", btoa(JSON.stringify(this.data)));
          localStorage.setItem("patientData", btoa(JSON.stringify(this.data)));
        },
        error: (error) => {
          this.dismissLoading();
        },
        complete: () => {
          this.operate();
        }
      });
  }

  loading: any;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    //////////////////////////console.log('Loading dismissed!');
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
            this.router.navigate(["/menu/er-patients/"]);
          },
        },
      ],
    });
    await alert.present();
  }

  isAP = false;
  isTC = false;
  iHaveTC = false;
  isVerify;
  isAPVerifyTCstatus = false;
  operate() {
    console.log(this.data);
    this.chiefComplaint = this.data[0].chief_complaint;
    this.inpatientDetails.admission_no = this.data[0].admission_no;
    this.dateAdmitted = this.data[0].admission_date;
    this.dischargeNotice = this.data[0].forDischargeDateTime;

    this.patient_no = this.data[0].patient_no;
    this.postData.IsVAT = "";
    this.postData.PayVenue = "";
    this.postData.Remarks = "";
    this.postData.ProfFee = 0;
    this.postData.OldProfFee = 0;

    this.professionalFeeModelv3.is_vat = "";
    this.professionalFeeModelv3.payvenue = "";
    this.professionalFeeModelv3.remarks = "";
    this.professionalFeeModelv3.doctor_prof_fee = 0;
    this.professionalFeeModelv3.old_prof_fee = 0;

    if (this.data[0].site == "C") {
      this.site = "CHHC";
      this.postData.BillingMobileNumber = atob(localStorage.getItem("C"));
      this.professionalFeeModelv3.billing_mobile_no =
        this.userSettingsModelv3[0].billingContactCebu;
    } else {
      this.site = "CHHM";
      this.postData.BillingMobileNumber = atob(localStorage.getItem("M"));
      this.professionalFeeModelv3.billing_mobile_no =
        this.userSettingsModelv3[0].billingContactMandaue;
    }

    this.postData.RoomNumber = this.data[0].room_no;
    this.professionalFeeModelv3.room_no = this.data[0].room_no;
    this.professionalFee = this.data[0].doctor_prof_fee;
    this.remarks = this.data[0].remarks;

    if (this.data[0].doctor_prof_fee == null) {
      this.method = "POST";
    } else {
      this.method = "";
    }
    this.postData.AdmisisonNo = this.data[0].admission_no;
    this.professionalFeeModelv3.admission_no = this.data[0].admission_no;
    this.postData.DoctorCode = this.data[0].dr_code;

    this.postData.DoctorStatusCode = this.data[0].Doctor_Status_code;
    this.professionalFeeModelv3.doctor_status_code =
      this.data[0].doctor_Status_code;

    this.postData.site = this.data[0].site;
    this.professionalFeeModelv3.site = this.data[0].site;

    this.postData.CreatedBy = this.data[0].dr_code;
    this.isFetchDone = false;

    this.doctorService
      .getCoDoctorsV3(this.inpatientDetails)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          const matchingElement = res.find(
            (element) => element.dr_code === this.data[0].dr_code
          );
          if (matchingElement) {
            this.daysOfManage = matchingElement.no_of_days_manage ?? 0;
            localStorage.setItem("daysManaged", btoa(this.daysOfManage));
          }

          if (res.length) {
            this.objecthandler = true;
          } else {
            this.objecthandler = false;
          }
          const coDoctors1 = res.filter(
            (element) => element.status === "Primary Attending Physician"
          );
          const coDoctors2 = res.filter(
            (element) => element.status === "Co-Manage"
          );
          const coDoctors3 = res.filter(
            (element) =>
              element.status !== "Primary Attending Physician" &&
              element.status !== "Co-Manage"
          );

          this.coDoctors = coDoctors1.concat(coDoctors2).concat(coDoctors3);
        },
        (error) => {
          this.isFetchDone = true;
        },
        () => {
          this.isFetchDone = true;
          this.coDoctors.forEach((element) => {
            if (
              element.dr_code == this.dr_code &&
              element.status_code == "AP" &&
              this.isAP == false
            ) {
              localStorage.setItem("doctor_Status_code", "AP");
              this.isAP = true;
            }

            if (
              element.dr_code == this.dr_code &&
              element.status_code == "TC" &&
              this.isTC == false
            ) {
              this.isTC = true;
            }
            if (
              element.status_code == "AP" &&
              element.status_code == "TC" &&
              this.iHaveTC == false
            ) {
              this.iHaveTC = true;
            }
            if (element.status_code == "TC") {
              const datxyz = { admission_no: "", dr_code: "" };
              datxyz.admission_no = element.admission_no;
              datxyz.dr_code = element.dr_code;
              this.resiServ
                .post("/gw/doki/inpatients/verifytransfertocover", datxyz)
                .subscribe({
                  complete: () => {
                    //
                  },
                  error: (error) => {
                    //
                  },
                  next: (data: any) => {
                    if (data == true) {
                      this.isAPVerifyTCstatus = true;
                    }
                  },
                });
            }
          });

          if (this.isTC) {
            const datxyz = { admission_no: "", dr_code: "" };
            datxyz.admission_no = this.patient_id;
            datxyz.dr_code = this.dr_code;
            this.resiServ
              .post("/gw/doki/inpatients/verifytransfertocover", datxyz)
              .subscribe({
                complete: () => {
                  //
                },
                error: (error) => {
                  //
                },
                next: (data: any) => {
                  this.isVerify = data;
                },
              });
          }
        }
      );
    this.postData.DateCreated = this.functionsService.getSystemDateTime();
    localStorage.setItem(
      "postData1",
      btoa(JSON.stringify(this.professionalFeeModelv3))
    );
  }

  ngOnInit() {
    this.checkAppearance();
  }

  updateDisplay(data) {
    if (data) {
      this.refresher = !this.refresher;
    } else {
      setTimeout(() => (this.refresher = true), 50);
    }
  }

  async modalUpdate(header, message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: header,
      message: message,
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.modalController.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }

  async examDetails(data: any, site: any, i) {
    this.HighlightRow = i;
    this.ExamData = data;
    this.hospitalSite = site;

    if (!this.isDesktop) {
      const modal = await this._modalController.create({
        component: ChhAppBasePage,
        componentProps: { ExamDetails: data, Site: this.hospitalSite },
        cssClass: "my-custom-modal-inpatient-css",
      });
      modal.present();
      return await modal.onDidDismiss();
    } else {
      if (this.ExamData.Exam == "Serology") {
        this.chemistry = false;
        this.serology = true;
        this.fecalysis = false;
        this.urinalysis = false;
        this.cbc = false;
      } else if (this.ExamData.Exam == "Chemistry") {
        this.chemistry = true;
        this.serology = false;
        this.fecalysis = false;
        this.urinalysis = false;
        this.cbc = false;
      } else if (this.ExamData.Exam == "Fecalysis") {
        this.chemistry = false;
        this.serology = false;
        this.fecalysis = true;
        this.urinalysis = false;
        this.cbc = false;
      } else if (this.ExamData.Exam == "Urinalysis") {
        this.chemistry = false;
        this.serology = false;
        this.fecalysis = false;
        this.urinalysis = true;
        this.cbc = false;
      } else if (
        this.ExamData.Exam == "Hematology" &&
        this.ExamData.ExamType == "CBC"
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

  getExamList(data) {
    //this.functionsService.logToConsole(this.data[0].admission_no);

    this.ionSkeleton = true;
    const date1 = new Date(this.data[0].admission_date);
    const seconds1 = date1.getTime() / 1000; //1440516958
    this.currentExamList = [];
    this.examListSkeleton = true;

    this.patientService
      .getExamList(this.location, data)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          res.forEach((element) => {
            const date = new Date(element.RequestDateTime);
            const seconds = date.getTime() / 1000; //1440516958
            if (seconds >= seconds1) {
              element.RequestDateTime = new Date(
                element.RequestDateTime
              ).toLocaleDateString();
              element.Exam = this.functionsService.convertToCamelCase(
                element.Exam
              );
              this.currentExamList.push(element);
              this.currentExamList_filtered.push(element);
            }
          });
        },
        (error) => {
          this.examListSkeleton = false;
        },
        () => {
          this.examListSkeleton = false;
        }
      );
  }

  // Prof Fee Pop Over
  async detail(data: any) {
    if (this.data[0].doctor_prof_fee == null) {
      this.method = "POST";
    } else {
      this.method = "";
    }
    const popover = await this.popover.create({
      component: ChhAppFeePage,
      showBackdrop: true,
      translucent: true,
      componentProps: {
        professionalFee: this.professionalFee,
        remarks: this.remarks,
        method: this.method,
      },
    });
    popover.present();
    return popover.onDidDismiss().then((data: any) => {
      if (data) {
        this.professionalFee = data.data.professionalFee;
        this.remarks = data.data.remarks;
        this.postData.Remarks = data.data.remarks;
        this.postData.DateCreated = this.functionsService.getSystemDateTime();
        const x = data.data.method;
        this.postData.ProfFee = data.data.professionalFee;
        if (x == "POST") {
          this.doctorService
            .insertPF(this.postData)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((res: any) => {
              if (res == true) {
                this.professionalFee = data.data.professionalFee;
                this.remarks = data.data.remarks;
                this.postData.ProfFee = data.data.professionalFee;
                this.postData.Remarks = data.data.remarks;
                this.postData.DateCreated =
                  this.functionsService.getSystemDateTime();
                this.data[0].doctor_prof_fee = data.data.professionalFee;
                this.modalUpdate(
                  "SUCCESS",
                  "Thank you, Dok! You have successfully SAVED your Professional Fee."
                );
              } else {
                this.functionsService.alert(
                  "SAVING of Professional Fee was unsuccessful. Please try again.",
                  "Okay"
                );
              }
            });
        } else if (x == "PUT") {
          this.postData.OldProfFee = this.data[0].doctor_prof_fee;
          this.doctorService
            .updatePF(this.postData)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((res: any) => {
              if (res == true) {
                this.professionalFee = data.data.professionalFee;
                this.remarks = data.data.remarks;
                this.postData.ProfFee = data.data.professionalFee;
                this.postData.Remarks = data.data.remarks;
                this.postData.DateCreated =
                  this.functionsService.getSystemDateTime();
                this.data[0].doctor_prof_fee = data.data.professionalFee;
                this.modalUpdate(
                  "SUCCESS",
                  "Successfully UPDATED your Professional Fee."
                );
              } else {
                this.functionsService.alert(
                  "UPDATING of Professional Fee was Unsuccessful",
                  "Okay"
                );
              }
            });
        } else if (x == "DELETE") {
          this.functionsService.logToConsole("DELETE: " + this.postData);
          this.doctorService
            .DeletePf(
              this.postData.AdmisisonNo,
              this.postData.DoctorStatusCode,
              this.postData.DoctorCode
            )
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((res: any) => {
              if (res == true) {
                this.professionalFee = data.data.professionalFee;
                this.remarks = data.data.remarks;
                this.professionalFee = data.data.professionalFee;
                this.remarks = data.data.remarks;
                this.postData.ProfFee = data.data.professionalFee;
                this.postData.Remarks = data.data.remarks;
                this.postData.DateCreated =
                  this.functionsService.getSystemDateTime();
                this.data[0].doctor_prof_fee = data.data.professionalFee;
                this.modalUpdate(
                  "SUCCESS",
                  "Successfully DELETED your Professional Fee."
                );
              } else {
                this.functionsService.alert(
                  "DELETING of Professional Fee was Unsuccessful",
                  "Okay"
                );
              }
            });
        }
      }
    });
  }

  redirecttoPF() {
    this.nav.navigateForward(
      "menu/er-patients/" +
        this.activatedRoute.snapshot.params.id +
        "/professional-fee",
      {
        state: {},
      }
    );
  }

  checkAppearance() {
    this.functionsService.logToConsole("checkAppearance");
    const values = JSON.parse(
      "[" + atob(localStorage.getItem("user_settings")) + "]"
    );
    const dr_username = atob(localStorage.getItem("username"));
    values.forEach((element) => {
      this.functionsService.logToConsole(element.darkmode);
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, "color-theme", "dark");
      } else {
        this.renderer.setAttribute(document.body, "color-theme", "light");
      }
    });
  }

  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  gotoDiagnistic() {
    const patient_id = this.activatedRoute.snapshot.params.id;
    this.router.navigate([
      "/menu/er-patients/" + patient_id + "/diagnostic-results/",
    ]);
  }
  testtrigger(data) {
    this.ionViewWillEnter();
  }
}
