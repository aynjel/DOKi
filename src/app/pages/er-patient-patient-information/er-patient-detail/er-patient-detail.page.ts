import { Component, Renderer2, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ModalController,
  AlertController,
  NavController,
  LoadingController,
} from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { AuthService } from "src/app/services/auth/auth.service";

import { FunctionsService } from "../../../shared/functions/functions.service";
import { PatientService } from "src/app/services/patient/patient.service";
import { Messages } from "../../../shared/messages";
import { ScreenSizeService } from "../../../services/screen-size/screen-size.service";
import { StorageService } from "../../../services/storage/storage.service";
import { Consta } from "../../../config/auth-constants";

import { Constants } from "src/app/shared/constants";

import {
  ErPatientData,
  ProfessionalFeeModelv3,
} from "src/app/models/er-patient.model";

import {
  UserSettingsModelv3,
  LoginResponseModelv3,
  PatientDetail,
} from "src/app/models/doctor";

import {
  ErpatientModelInpatients,
  ErpatientDetails,
} from "../../../models/doctor";
import { AESEncryptDecryptServiceService } from "src/app/services/encryption/aesencrypt-decrypt-service.service";
import { ExecutiveService } from "src/app/services/executive/executive.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ResiService } from "src/app/services/resi/resi.service";


@Component({
  selector: 'app-er-patient-detail',
  templateUrl: './er-patient-detail.page.html',
  styleUrls: ['./er-patient-detail.page.scss'],
})
export class ErPatientDetailPage implements OnInit {
  erpatientModelInpatients = new ErpatientModelInpatients();
  private ngUnsubscribe = new Subject();

  submitted = "Registered";

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
  isDesktop: boolean;
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

  postData: ErPatientData = new ErPatientData();
  professionalFeeModelv3: ProfessionalFeeModelv3 = new ProfessionalFeeModelv3();
  userSettingsModelv3: UserSettingsModelv3 = new UserSettingsModelv3();
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();

  erpatientDetails: ErpatientDetails = new ErpatientDetails();
  location: boolean;
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
  patient_n;
  is_philhealth_membership;
  admissionNo;
  dischargeNo;

  patientDetailfromApi_from;
  patientDetailfromApi_to;
  admission_status;

  isAP = false;
  isTC = false;
  iHaveTC = false;
  isVerify;
  isAPVerifyTCstatus = false;

  approvedDate: any;
  chiefComplaint: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

  ngOnInit() {
    //
  }

  ionViewWillEnter(): void {
    this.ngUnsubscribe = new Subject();
    this.loginResponseModelv3 = new LoginResponseModelv3();
    this.erpatientDetails = new ErpatientDetails();
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
    this.erpatientModelInpatients.drCode = this.dr_code;
    this.erpatientModelInpatients.mode = Consta.mode;
    this.postData.DoctorMobileNumber = this.loginResponseModelv3.mobileNo;
    this.professionalFeeModelv3.doctor_mobile_no =
      this.loginResponseModelv3.mobileNo;
    this.professionalFeeModelv3.smsGatewayCHH =
      this.userSettingsModelv3[0].smsGatewayCHH;
    this.professionalFeeModelv3.smsGatewaySmart =
      this.userSettingsModelv3[0].smsGatewaySmart;

    const ppatientdata = {
      dr_code: atob(localStorage.getItem("userId"))
    }
    console.log('ER List ppatientdata', ppatientdata);
    this.data = [];
    this.presentLoading();
    this.executiveService
      .getErPatientDetail(ppatientdata)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.executiveService.dokiErList$.subscribe({
          next: (data) => {
            this.data = data.filter(
              (e) => e.admission_no === this.patient_id
            );
            this.data1 = data.filter(
              (e) => e.admission_no === this.patient_id
            );
            console.log('ER List data details', this.data);
            localStorage.setItem(
              "selectedPatient",
              btoa(JSON.stringify(this.data))
            );
            localStorage.setItem("admission_status", btoa(this.admission_status));
            localStorage.setItem(
              "Api_from",
              btoa(this.patientDetailfromApi_from)
            );
            localStorage.setItem("Api_to", btoa(this.patientDetailfromApi_to));
            if (this.data == null || this.data == undefined) {
              this.back();
            } else {
              this.patientName = this.data[0].last_name + ", " + this.data[0].first_name;
              this.patient_n = this.data[0].last_name + ", " + this.data[0].first_name;
              // this.room 
              this.data1 = JSON.parse("[" + JSON.stringify(this.data[0]) + "]");
              localStorage.setItem(
                "patientData",
                btoa(JSON.stringify(this.data1))
              );
            }
            this.operate();
            this.dismissLoading();
          },
          error: (error) => {
            console.log(error);
            this.dismissLoading();
          },
        });
      });
  }

  async alert(data1: any, data2: any): Promise<void> {
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

  closemodal(): void {
    this.router.navigate(["/menu/er-patients/"]);
  }

  redirecttoPF(): void {
    this.nav.navigateForward(
      "menu/er-patients/" +
        this.activatedRoute.snapshot.params.id +
        "/professional-fee",
      {
        state: {},
      }
    );
  }

  operate(): void {
    this.dateAdmitted = this.data[0].admission_date;
    this.dischargeNotice = this.data[0].forDischargeDateTime;
    this.chiefComplaint = this.data[0].chief_complaint;

    this.patient_no = this.data[0].patient_no;
    //this.getExamList(this.data[0].patient_no);
    //populate empty feild
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
      //this.postData.PatientSite = "CEBU";
      this.postData.BillingMobileNumber = atob(localStorage.getItem("C"));
      this.professionalFeeModelv3.billing_mobile_no =
        this.userSettingsModelv3[0].billingContactCebu;
    } else {
      this.site = "CHHM";
      //this.postData.PatientSite = "MANDAUE";
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

    //this.postData.DoctorCode = this.data.dr_code;
    this.postData.DoctorStatusCode = this.data[0].Doctor_Status_code;
    this.professionalFeeModelv3.doctor_status_code =
      this.data[0].doctor_Status_code;

    this.postData.site = this.data[0].site;
    this.professionalFeeModelv3.site = this.data[0].site;

    this.postData.CreatedBy = this.data[0].dr_code;
    this.isFetchDone = false;
    this.doctorService
      .getErCoDoctorsV3(this.patient_id)
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
          console.log(error);
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
                    console.log("complete");
                  },
                  error: (error) => {
                    console.log(error);
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
                  console.log("complete");
                },
                error: (error) => {
                  console.log(error);
                },
                next: (data: any) => {
                  console.log(data);
                  this.isVerify = data;
                },
              });
          }
        }
      );

      this.doctorService
      .getAdmittingDiagnosisV3(this.erpatientDetails)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if(res === null || res === undefined){
          return console.log("no admitting diagnosis found");
        }
        this.admittingDiagnosis = res.admitting_diagnosis2.replace(
          /(\r\n|\n|\r)/gm,
          "<br />"
        );
        this.admittingDiagnosis1 = this.functionsService.truncateChar(
          res.admitting_diagnosis2,
          100
        );
        this.admittingDiagnosis1 = this.admittingDiagnosis1.replace(
          /(\r\n|\n|\r)/gm,
          "<br />"
        );
        this.admittingDiagnosis2 = this.admittingDiagnosis.replace(
          /(,)/gm,
          ",<br />"
        );
      },
      (error) => {
        this.isFetchDone = true;
        this.functionsService.logToConsole(error);
      },
      () => {
        this.isFetchDone = true;
      }
    );
    if (this.data[0].admission_status == "DN") {
      this.doctorService
        .getFinalDiagnosisV3(this.erpatientDetails)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res: any) => {
            if (!Object.keys(res).length) {
              console.log("no data found");
            } else {
              this.finalDiagnosis = res.final_diagnosis;
              this.finalDiagnosis1 = this.functionsService.truncateChar(
                this.finalDiagnosis,
                50
              );
              this.finalDiagnosis2 = this.finalDiagnosis
                .replace(/(\r\n|\n|\r)/gm, "")
                .split(".)");
              this.finalDiagnosis2.shift();
              for (let i = 0; i < this.finalDiagnosis2.length - 1; i++) {
                this.finalDiagnosis2[i] = this.finalDiagnosis2[i].substring(
                  0,
                  this.finalDiagnosis2[i].length - 1
                );
                this.functionsService.logToConsole(this.finalDiagnosis2[i]);
              }
              for (let i = 0; i < this.finalDiagnosis2.length; i++) {
                this.finalDiagnosis2[i] =
                  i + 1 + ".) " + this.finalDiagnosis2[i];
              }
            }
          },
          (error) => {
            this.isFetchDone = true;
            console.log(error);
          },
          () => {
            this.isFetchDone = true;
          }
        );
    }

    this.postData.DateCreated = this.functionsService.getSystemDateTime();
    localStorage.setItem(
      "postData1",
      btoa(JSON.stringify(this.professionalFeeModelv3))
    );
  }

  back(): void {
    this.nav.back();
  }

  public async dismissLoading(): Promise<void> {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  gotoDiagnistic(): void {
    const patient_id = this.activatedRoute.snapshot.params.id;
    this.router.navigate([
      "/menu/er-patients/" + patient_id + "/diagnostic-results/",
    ]);
  }

  loading: any;
  async presentLoading(): Promise<void> {
    this.loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 2000,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
  }

  testtrigger(): void {
    this.ionViewWillEnter();
  }

  cancelApproval(data1: any): void {
    const cancel = {
      discharge_no: data1,
    };
    this.doctorService
      .cancelApprovedFinalDiagnosis(cancel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          console.log(res);
          this.ionViewWillEnter();
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.ionViewWillEnter();
        }
      );
  }

}
