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
} from "src/app/models/doctor";

import { LaboratoryTestModalPage } from "../laboratory-test-modal/laboratory-test-modal.page";
import {
  InpatientModelInpatients,
  InpatientDetails,
} from "../../../models/doctor";
import { AESEncryptDecryptServiceService } from "src/app/services/encryption/aesencrypt-decrypt-service.service";
import { ExecutiveService } from "src/app/services/executive/executive.service";
import { takeUntil } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";
import { AfterViewInit, ElementRef, ViewChild } from "@angular/core";

import { ResiService } from "src/app/services/resi/resi.service";
@Component({
  selector: "app-in-patient-detail",
  templateUrl: "./in-patient-detail.page.html",
  styleUrls: ["./in-patient-detail.page.scss"],
})
export class InPatientDetailPage {
  inpatientModelInpatients = new InpatientModelInpatients();
  private ngUnsubscribe = new Subject();
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
  truncating = false;
  truncating1 = true;
  daysOfManage: any;
  dateAdmitted: any;
  dischargeNotice: any;
  ionSkeleton: boolean = false;
  currentExamList: any;
  currentExamList_filtered: any = [];
  isDesktop: boolean;
  examListSkeleton: boolean = false;
  ExamData: any = "";
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
  progNot_InitDisplay: any;
  progNot_account_no: any = "";

  patientId: any;
  patientInfo: any;

  progessNotes: any = [];
  progessNotesTemp: any = [];
  progressNotesIsEmpty: boolean = false;
  progressNotesIsNotReady: boolean = false;
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
    //this.functionsService.logToConsole('In-patient detail : Constructor');
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
  ionViewWillEnter() {
    ////////console.log('ionViewWillEnter');

    this.ngUnsubscribe = new Subject();
    this.loginResponseModelv3 = new LoginResponseModelv3();
    this.inpatientDetails = new InpatientDetails();
    //this.functionsService.logToConsole();
    this.patient_id = this.activatedRoute.snapshot.params.id;
    localStorage.setItem("fromurl", this.patient_id);
    this.routerLinkBack = "/menu/in-patients/";
    //this.functionsService.logToConsole('In-patient detail : ionViewWillEnter');
    //sessionStorage.removeItem('pfIsPatientSeen');
    // sessionStorage.removeItem('pfInsCoor');

    //this.checkAppearance();

    //let logindata = <LoginData>this.authService.userData$.getValue();
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

    let ppatientdata = new PatientDetail();
    ppatientdata.admissionNo = this.patient_id;
    ppatientdata.doctorCode = this.dr_code;
    this.data = [];
    this.presentLoading();
    //////////console.log('123');

    this.executiveService
      .getPatientDetail(ppatientdata)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////////console.log('res.manage_to', res.manage_to);

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
            this.operate();
          } else {
            this.alert("No Data Available", "Okay");
          }
          ////////////console.log(this.data1);
          ////////////console.log(this.data[0].philhealth_membership);
          this.is_philhealth_membership = this.data[0].philhealth_membership;
          this.is_pwd = this.data1[0].is_pwd;
          this.is_senior = this.data1[0].is_senior;
          ////////////console.log(this.is_pwd, this.is_senior);
        }
      );
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
            this.closemodal();
          },
        },
      ],
    });
    await alert.present();
  }

  closemodal() {
    this.router.navigate(["/menu/in-patients/"]);
  }
  isAP: boolean = false;
  isTC: boolean = false;
  iHaveTC: boolean = false;
  isVerify;
  isAPVerifyTCstatus: boolean = false;
  operate() {
    //////////console.log('operate');

    this.dateAdmitted = this.data[0].admission_date;
    this.dischargeNotice = this.data[0].forDischargeDateTime;

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

    //this.functionsService.logToConsole(this.data[0].site);

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
    /*
    let smsgateway = JSON.parse(localStorage.getItem('smsGateway'));
    let ssms = [];
    Object.keys(smsgateway).forEach((key) => {
      var value = smsgateway[key];
      let sms =
        '{"settings": "smsGateway","property": "' +
        key +
        '","value": "' +
        value +
        '"}';
      ssms.push(JSON.parse(sms));
    });
    this.postData.SmsGateWay = ssms;*/
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
    let coDoctors1 = [];
    let coDoctors2 = [];
    let coDoctors3 = [];
    //"status": "Primary Attending Physician"
    this.isFetchDone = false;
    //   _____   _____   _____        _____   _____        _____   _____   _____   _____   _____   _____
    //  /  ___| | ____| |_   _|      /  ___| /  _  \      |  _  \ /  _  \ /  ___| |_   _| /  _  \ |  _  \
    //  | |     | |__     | |        | |     | | | |      | | | | | | | | | |       | |   | | | | | |_| |
    //  | |  _  |  __|    | |        | |     | | | |      | | | | | | | | | |       | |   | | | | |  _  /
    //  | |_| | | |___    | |        | |___  | |_| |      | |_| | | |_| | | |___    | |   | |_| | | | \ \
    //  \_____/ |_____|   |_|        \_____| \_____/      |_____/ \_____/ \_____|   |_|   \_____/ |_|  \_\
    //////console.log(this.inpatientDetails);

    this.doctorService
      .getCoDoctorsV3(this.inpatientDetails)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          /*res.forEach((element) => {
            if (element.dr_code == this.data[0].dr_code) {
              if (element.no_of_days_manage == null) {
                this.daysOfManage = 0;
              } else {
                this.daysOfManage = element.no_of_days_manage;
              }
              //sessionStorage.setItem('daysManaged', btoa(this.daysOfManage));
              localStorage.setItem("daysManaged", btoa(this.daysOfManage));
            }
            //
          });*/
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
          //this.functionsService.logToConsole(res);
          /*res.forEach((element) => {
            if (element.status == "Primary Attending Physician") {
              coDoctors1.push(element);
            } else if (element.status == "Co-Manage") {
              coDoctors2.push(element);
            } else {
              coDoctors3.push(element);
            }
          });*/
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
          //this.coDoctors.push(coDoctors2);
        },
        (error) => {
          this.isFetchDone = true;
          //this.functionsService.alert('Server Error', 'Okay');
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
              let datxyz = { admission_no: "", dr_code: "" };
              ////console.log(element);
              datxyz.admission_no = element.admission_no;
              datxyz.dr_code = element.dr_code;
              this.resiServ
                .post("/gw/doki/inpatients/verifytransfertocover", datxyz)
                .subscribe({
                  complete: () => {},
                  error: (error) => {},
                  next: (data: any) => {
                    //console.log(data);

                    if (data == true) {
                      this.isAPVerifyTCstatus = true;
                    }
                  },
                });
            }
          });
          //////console.log(this.isAP, this.isTC, this.iHaveTC);

          if (this.isTC) {
            ////console.log("check status");
            let datxyz = { admission_no: "", dr_code: "" };
            datxyz.admission_no = this.patient_id;
            datxyz.dr_code = this.dr_code;
            this.resiServ
              .post("/gw/doki/inpatients/verifytransfertocover", datxyz)
              .subscribe({
                complete: () => {},
                error: (error) => {
                  ////console.log(error);
                },
                next: (data: any) => {
                  ////console.log(data);
                  this.isVerify = data;
                  //////////console.log(data);
                },
              });
          }
        }
      );
    //

    this.doctorService
      .getAdmittingDiagnosisV3(this.inpatientDetails)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (!Object.keys(res).length) {
            //this.functionsService.logToConsole("no data found");
          } else {
            this.admittingDiagnosis = res.admitting_diagnosis2.replace(
              /(\r\n|\n|\r)/gm,
              "<br />"
            );
            //this.functionsService.logToConsole('admittingDiagnosis : ' + this.admittingDiagnosis);
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
            //this.functionsService.logToConsole('admittingDiagnosis2 : ' + this.admittingDiagnosis2);
          }
        },
        (error) => {
          this.isFetchDone = true;
          //this.functionsService.alert('Server Error', 'Okay');
        },
        () => {
          this.isFetchDone = true;
        }
      );
    //final diagnosis
    if (this.data[0].admission_status == "DN") {
      this.doctorService
        .getFinalDiagnosisV3(this.inpatientDetails)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res: any) => {
            if (!Object.keys(res).length) {
              // this.functionsService.logToConsole("no data found");
            } else {
              this.finalDiagnosis = res.final_diagnosis;
              //this.functionsService.logToConsole(this.finalDiagnosis);

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
            //this.functionsService.alert('Server Error', 'Okay');
          },
          () => {
            this.isFetchDone = true;
          }
        );
      //this.getApprovalStatus(this.patient_id);
    }

    this.postData.DateCreated = this.functionsService.getSystemDateTime();
    //sessionStorage.setItem('postData', btoa(JSON.stringify(this.postData)));
    //localStorage.setItem('postData', btoa(JSON.stringify(this.postData)));
    localStorage.setItem(
      "postData1",
      btoa(JSON.stringify(this.professionalFeeModelv3))
    );

    /*this.doctorService.getProgressNotes('test').subscribe(
      (res: any = []) => {
        //////////////console.log(res[0].notes);
        this.progNot_InitDisplay = this.functionsService.truncateChar(
          res[0].notes,
          200
        );
        this.progNot_account_no = res[0].account_no;
      },
      (error) => {
        //////////////console.log(error);
      },
      () => {
        //////////////console.log('call done');
      }
    );*/
    //this.getProgressNotes();
  }
  approvedDate;

  getApprovalStatus(data) {
    //////////console.log('getApprovalStatus');

    let approvalStatus = {
      account_no: data,
    };
    this.doctorService
      .getApprovalStatus(approvalStatus)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res != null) {
            ////////////console.log('approvedDate', res);
            this.admissionNo = res[0].admission_no;
            this.dischargeNo = res[0].discharge_no;
            this.finalDiagnosisApproval = res;
            this.isCancelFinalDiagnosisApproval = res[0].approval_status;
            this.approvedDate = res[0].approve_date;
            ////////////console.log(this.approvedDate);
          } else {
            this.isCancelFinalDiagnosisApproval = "";
          }
        },
        (error) => {},
        () => {}
      );
  }
  cancelApproval(data1) {
    let cancel = {
      discharge_no: data1,
    };
    this.doctorService
      .cancelApprovedFinalDiagnosis(cancel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////////////console.log(res);
          this.ionViewWillEnter();
        },
        (error) => {},
        () => {}
      );
  }
  getProgressNotes() {
    this.progessNotes = [];
    this.progessNotesTemp = [];
    this.progressNotesIsNotReady = true;
    this.doctorService
      .getProgressNotes(this.data1[0].admission_no)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any = []) => {
          //////////////console.log(res);
          this.progessNotesTemp = res;
          if (this.progessNotesTemp.length > 0) {
            this.progNot_InitDisplay = this.functionsService.truncateChar(
              res[0].notes,
              200
            );
            this.progNot_account_no = res[0].account_no;
          } else {
            this.progNot_account_no = "";
          }
        },
        (error) => {},
        () => {
          this.activeDays = [];
          this.progessNotesTemp.forEach((el) => {
            this.activeDays.push(el.notes_id);
            el.dateCreateConverted = this.functionService.convertDatetoMMDDYYYY(
              el.date_created
            );

            el.dateCreateTimeConverted = this.functionService.getTime(
              el.date_created
            );

            el.dateUpdateConverted = this.functionService.convertDatetoMMDDYYYY(
              el.date_updated
            );
            el.dateUpdateTimeConverted = this.functionService.getTime(
              el.date_updated
            );
            if (el.date_updated == "0001-01-01T00:00:00") {
              el.dateUpdateConverted = "";
            }
            el.notessmall = this.functionService.truncateChar(el.notes, 300);
            if (el.notes.length > 200) {
              el.noteslength = true;
            } else {
              el.noteslength = false;
            }
            this.progessNotes.push(el);
          });
          ////////////////console.log(this.activeDays);

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
  showProgressNotes() {
    if (this.isDesktop) {
      this.router.navigate([
        "/menu/in-patients/" + this.patient_id + "/progressnotes/",
      ]);
    } else {
      this.router.navigate([
        "/menu/in-patients/" + this.patient_id + "/progressnotes/",
      ]);
    }
  }

  ngOnInit() {
    this.checkAppearance();
    // this.functionsService.logToConsole('In-patient detail : ngOnInit');
  }

  updateDisplay(data: boolean) {
    if (data) {
      this.refresher = !this.refresher;
    } else {
      setTimeout(() => (this.refresher = true), 50);
    }
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
    //this.functionsService.logToConsole(site);

    this.HighlightRow = i;
    this.ExamData = data;
    this.hospitalSite = site;

    if (!this.isDesktop) {
      //this.functionsService.logToConsole(this.hospitalSite);

      const modal = await this._modalController.create({
        component: ChhAppBasePage,
        componentProps: { ExamDetails: data, Site: this.hospitalSite },
        cssClass: "my-custom-modal-inpatient-css",
      });
      modal.present();
      return await modal.onDidDismiss().then((data: any) => {});
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
    var date1 = new Date(this.data[0].admission_date);
    var seconds1 = date1.getTime() / 1000; //1440516958
    this.currentExamList = [];
    this.examListSkeleton = true;

    this.patientService
      .getExamList(this.location, data)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
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

    // this.patientService.getCebuExamList(data).subscribe(
    //   (res: any) => {
    //     res.forEach((element) => {
    //       var date = new Date(element.RequestDateTime);
    //       var seconds = date.getTime() / 1000; //1440516958
    //       if (seconds >= seconds1) {
    //         element.RequestDateTime = new Date(
    //           element.RequestDateTime
    //         ).toLocaleDateString();
    //         element.Exam = this.functionsService.convertToCamelCase(
    //           element.Exam
    //         );
    //         this.currentExamList.push(element);
    //         this.currentExamList_filtered.push(element);
    //       }
    //     });
    //   },
    //   (error) => {
    //     this.examListSkeleton = false;
    //   },
    //   () => {
    //     this.examListSkeleton = false;
    //   }
    // );
  }

  dateChanged(data1: any) {
    //  this.functionsService.logToConsole("changed data: "+data1);
  }

  // Prof Fee Pop Over
  async detail(data: any) {
    //this.functionsService.logToConsole("Detail : " + this.method);

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
        let x = data.data.method;
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

  /* async closeModal() {
    await this.modalController.dismiss();
  } */

  /* getDateTime() {
    let xx = new Date();
    let H = this.addZeroBefore(xx.getHours());
    let i = this.addZeroBefore(xx.getMinutes());
    let s = this.addZeroBefore(xx.getSeconds());
    let v = xx.getMilliseconds();

    return this.functionsService.getSystemDate() + "T" + H + ":" + i + ":" + s + "." + v + "Z";
  } */

  /*  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? "0" + m : m;
    var dd = d < 10 ? "0" + d : d;
    return "" + y + "-" + mm + "-" + dd;
  } */

  /*  getDoctorStatusCode(data: string) {
    if (data == "Co-Manage") return "CM";
    if (data == "Primary Attending Physician") return "AP";
    if (data == "Consult") return "CO";
    if (data == "HMO") return "HC";
  } */

  /*   addZeroBefore(n) {
    return (n < 10 ? "0" : "") + n;
  } */

  /* explodeDate(data: any) {
    let myarr = data.split("T");
    if (myarr[1]) {
      let myarr2 = myarr[1].split(".");
      return myarr[0] + " | " + myarr2[0];
    }
<<<<<<< HEAD:src/app/components/inpatientmodal/inpatientmodal.page.ts
  }
  truncateChar(text: string, limit:any): string {
    let charlimit = limit;
    if(!text || text.length <= charlimit )
    {
        return text;
    }
    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + "...";
    return shortened;
  }
  camelCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }
=======
  } */

  redirecttoPF() {
    //this.router.navigate(['menu/in-patients/'+this.activatedRoute.snapshot.params.id+'/professional-fee']);
    let datasend = {
      first_name: "string",
      last_name: "string",
      status: "string",
      mobile_no: "string",
      dept_short_desc: "string",
    };

    /*this.router.navigate(['menu/in-patients/' + this.activatedRoute.snapshot.params.id+'/professional-fee',JSON.stringify(datasend)]);*/

    this.nav.navigateForward(
      "menu/in-patients/" +
        this.activatedRoute.snapshot.params.id +
        "/professional-fee",
      {
        state: {},
      }
    );
  }

  back() {
    this.nav.back();
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

  async presentlabtestresult() {
    const modal = await this.modalController.create({
      component: LaboratoryTestModalPage,
      cssClass: "my-custom-modal-css",
      componentProps: {
        patient_no: this.patient_no,
      },
    });
    return await modal.present();
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  /***************SIGNATURE**********************/

  /*
  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl: ElementRef;

  signatureImg: string;

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    //this.resizeCanvas();
  }

  startDrawing(event: Event) {
    ////////////console.log(event);
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    ////////////console.log(base64Data);
  }*/
  gotoDiagnistic() {
    let patient_id = this.activatedRoute.snapshot.params.id;
    this.router.navigate([
      "/menu/in-patients/" + patient_id + "/diagnostic-results/",
    ]);
  }
  testtrigger(data) {
    this.ionViewWillEnter();
  }
}
