import { Component, OnInit } from "@angular/core";
import { ScreenSizeService } from "src/app/services/screen-size/screen-size.service";
import { takeUntil } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";
import { Consta } from "src/app/config/auth-constants";
import {
  InPatientData,
  ProfessionalFeeModelv3,
} from "src/app/models/in-patient.model";
import {
  InpatientDetails,
  InpatientModelInpatients,
  LoginResponseModelv3,
  PatientDetail,
  UserSettingsModelv3,
} from "src/app/models/doctor";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import {
  AlertController,
  LoadingController,
  NavController,
} from "@ionic/angular";
import { ExecutiveService } from "src/app/services/executive/executive.service";
import { FunctionsService } from "src/app/shared/functions/functions.service";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { ResiService } from "src/app/services/resi/resi.service";

@Component({
  selector: "app-patient-history-patient-detail",
  templateUrl: "./patient-history-patient-detail.page.html",
  styleUrls: ["./patient-history-patient-detail.page.scss"],
})
export class PatientHistoryPatientDetailPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isDesktop: boolean;
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
  inpatientModelInpatients = new InpatientModelInpatients();
  constructor(
    private screensizeService: ScreenSizeService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private loadingController: LoadingController,
    private executiveService: ExecutiveService,
    private functionService: FunctionsService,
    private nav: NavController,
    private functionsService: FunctionsService,
    private alertController: AlertController,
    private router: Router,
    private doctorService: DoctorService,
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
  }
  admission_status;
  patientDetailfromApi_from;
  patientDetailfromApi_to;
  ngOnInit() {}
  ionViewWillEnter() {
    ////console.log('ionViewWillEnter');

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
    //////console.log('123');

    this.executiveService
      .getPatientDetail(ppatientdata)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////console.log('res.manage_to', res.manage_to);

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
          ////////console.log(this.data1);
          ////////console.log(this.data[0].philhealth_membership);
          this.is_philhealth_membership = this.data[0].philhealth_membership;
          this.is_pwd = this.data1[0].is_pwd;
          this.is_senior = this.data1[0].is_senior;
          ////////console.log(this.is_pwd, this.is_senior);
        }
      );
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
    //////////////////////console.log('Loading dismissed!');
  }
  back() {
    this.nav.back();
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
  isAP;
  iHaveTC;
  isTC;
  isAPVerifyTCstatus;
  isVerify;
  operate() {
    //////console.log('operate');

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
    //console.log(this.inpatientDetails);

    this.doctorService
      .getCoDoctorsV3(this.inpatientDetails)
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
              localStorage.setItem("daysManaged", btoa(this.daysOfManage));
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
            if (element.status == "Primary Attending Physician") {
              coDoctors1.push(element);
            } else if (element.status == "Co-Manage") {
              coDoctors2.push(element);
            } else {
              coDoctors3.push(element);
            }
          });

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
              console.log(element);
              datxyz.admission_no = element.admission_no;
              datxyz.dr_code = element.dr_code;
              this.resiServ
                .post("/gw/doki/inpatients/verifytransfertocover", datxyz)
                .subscribe({
                  complete: () => {},
                  error: (error) => {},
                  next: (data: any) => {
                    console.log(data);

                    if (data == true) {
                      this.isAPVerifyTCstatus = true;
                    }
                  },
                });
            }
          });
          //console.log(this.isAP, this.isTC, this.iHaveTC);

          if (this.isTC) {
            console.log("check status");
            let datxyz = { admission_no: "", dr_code: "" };
            datxyz.admission_no = this.patient_id;
            datxyz.dr_code = this.dr_code;
            this.resiServ
              .post("/gw/doki/inpatients/verifytransfertocover", datxyz)
              .subscribe({
                complete: () => {},
                error: (error) => {
                  console.log(error);
                },
                next: (data: any) => {
                  console.log(data);
                  this.isVerify = data;
                  //////console.log(data);
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
        //////////console.log(res[0].notes);
        this.progNot_InitDisplay = this.functionsService.truncateChar(
          res[0].notes,
          200
        );
        this.progNot_account_no = res[0].account_no;
      },
      (error) => {
        //////////console.log(error);
      },
      () => {
        //////////console.log('call done');
      }
    );*/
    //this.getProgressNotes();
  }
  gotoDiagnistic() {
    let patient_id = this.activatedRoute.snapshot.params.id;
    this.router.navigate([
      "/menu/in-patients/" + patient_id + "/diagnostic-results/",
    ]);
  }
}
