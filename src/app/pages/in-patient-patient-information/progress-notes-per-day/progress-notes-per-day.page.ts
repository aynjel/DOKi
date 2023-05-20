import { Component, NgZone, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  IonRouterOutlet,
  ModalController,
  NavController,
  PopoverController,
  ToastController,
} from "@ionic/angular";
import { ApprovePopOverComponent } from "src/app/chh-web-components/approve-pop-over/approve-pop-over.component";
import { LoginResponseModelv3 } from "src/app/models/doctor";
import { AuthService } from "src/app/services/auth/auth.service";

import { ResiService } from "src/app/services/resi/resi.service";
import { ScreenSizeService } from "src/app/services/screen-size/screen-size.service";
import { FunctionsService } from "src/app/shared/functions/functions.service";
import { ViewCommentsPopOverComponent } from "src/app/chh-web-components/view-comments-pop-over/view-comments-pop-over.component";
import {
  InpatientModelInpatients,
  InpatientDetails,
} from "../../../models/doctor";
import { ProgressnotesHistoryComponent } from "src/app/chh-web-components/progressnotes-history/progressnotes-history.component";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { takeUntil } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";

@Component({
  selector: "app-progress-notes-per-day",
  templateUrl: "./progress-notes-per-day.page.html",
  styleUrls: ["./progress-notes-per-day.page.scss"],
})
export class ProgressNotesPerDayPage implements OnInit {
  private ngUnsubscribe = new Subject();
  patientId: any;
  patientInfo: any;
  isDesktop: boolean;
  progessNotes: any = [];
  progessNotesTemp: any = [];
  progressNotesIsEmpty: boolean = false;
  progressNotesIsNotReady: boolean = false;
  dateToday: any;
  dateAdmitted;
  insertPN = {
    account_no: "string",
    notes_id: 2,
    notes: "string",
    user_created: "string",
    date_created: "string",
  };
  updatePN = {
    trans_no: "string",
    account_no: "string",
    notes_id: 2,
    notes: "string",
    user_created: "string",
  };
  progressNoteSummaryUpdate = {
    trans_no: 0,
    summary: "string",
    summary_updated_by: "string",
  };
  user_created: any;
  activeDays: any = [];
  birthday: any;
  age: any;
  progressNotesPerDay = {
    account_no: "string",
    event_date: "string",
  };
  progressNoteApproval = {
    account_no: "string",
    event_date: "string",
    approved_by: "string",
    dr_code: "string",
    dr_name: "string",
    status: "string",
  };
  event_date;
  logindata;
  constructor(
    private screensizeService: ScreenSizeService,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    private navCtrl: NavController,
    private funcServ: FunctionsService,
    private residentService: ResiService,
    private modalController: ModalController,
    private toastController: ToastController,
    public routerOutlet: IonRouterOutlet,
    public popoverController: PopoverController,
    public authService: AuthService,
    public nav: NavController,
    private alertController: AlertController,
    private ngZone: NgZone,
    private resiServ: ResiService,
    private doctorService: DoctorService,
    private actionSheetCtrl: ActionSheetController,
    private genServ: ResiService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
    this.checkAppearance();
  }
  data;
  insurance_hmo;
  is_philhealth_membership;
  is_pwd;
  is_senior;
  data1;
  patient_id;
  patient_name;
  dischargeNotice;
  approvePN = {
    account_no: "string",
    event_date: "string",
    approved_by: "string",
    dr_code: "string",
    dr_name: "string",
  };
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  dr_code;
  dr_name;
  ionViewWillEnter() {
    let x = JSON.parse(
      unescape(atob(localStorage.getItem("_cap_userDataKey")))
    );
    this.logindata = x;
    this.dr_code = x.doctorCode;
  }
  isApproved;
  doctor_Status_code;
  inpatientDetails;
  id;
  mdCode;
  ngOnInit() {
    this.inpatientDetails = new InpatientDetails();
    this.doctor_Status_code = localStorage.getItem("doctor_Status_code");
    let x = JSON.parse(
      unescape(atob(localStorage.getItem("_cap_userDataKey")))
    );

    this.mdCode = x.doctorCode;
    this.logindata = x;
    this.dateToday = this.funcServ.getDateTodayMMDDYYYY();
    this.user_created = atob(localStorage.getItem("username"));
    this.progressNoteSummaryUpdate.summary_updated_by = this.user_created;
    this.patientId = this.activatedRoute.snapshot.params.pno;
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);

    this.event_date = this.activatedRoute.snapshot.params.perday;
    this.patientInfo = JSON.parse(
      "[" + localStorage.getItem("pnSelected") + "]"
    );
    this.dateAdmitted = this.patientInfo.date_created;

    this.birthday = this.funcServ.convertDatetoMMDDYYYY(
      this.patientInfo.birthdate
    );
    this.age = this.funcServ.calculateAge(
      this.birthday,
      this.funcServ.getDateTodayMMDDYYYY()
    );
    this.progressNotesPerDay.account_no = this.patientInfo[0].admission_no;
    this.progressNotesPerDay.event_date = this.event_date;
    this.data = JSON.parse("[" + (localStorage.getItem("pnSelected") + "]"));

    /* if (this.data[0].doctor_Status_code == "TC") {
      this.verifypatient(this.data[0].admission_no, this.data[0].dr_code);
    }*/
    this.insurance_hmo = this.data[0].insurance_hmo;
    this.is_philhealth_membership = this.data[0].philhealth_membership;
    this.is_pwd = this.data[0].is_pwd;
    this.is_senior = this.data[0].is_senior;
    //////////////console.log(this.is_pwd, this.is_senior);
    this.dateAdmitted = this.data[0].admission_date;
    this.patient_id = this.activatedRoute.snapshot.params.id;
    //console.log(this.patient_id);

    this.dischargeNotice = this.data[0].forDischargeDateTime;
    if (this.patient_id != this.data[0].admission_no) {
      //this.nav.back();
    }
    this.data1 = this.data[0].doctor_prof_fee;
    this.patient_name = this.data[0].first_name + " " + this.data[0].last_name;
    this.patient_name = this.funcServ.convertAllFirstLetterToUpperCase(
      this.patient_name
    );
    ////////////console.log(this.progressNotesPerDay);

    this.getProgressNotesPerDay(this.progressNotesPerDay);
    this.getProgressNotesSummary();
    this.admission_status = atob(localStorage.getItem("admission_status"));
    this.patientDetailfromApi_from = atob(localStorage.getItem("Api_from"));
    this.patientDetailfromApi_to = atob(localStorage.getItem("Api_to"));
    // this.checkCoDoctors();
  }
  admission_status;
  patientDetailfromApi_from;
  patientDetailfromApi_to;
  isAPVerifyTCstatus: boolean = false;
  /* verifypatient(admission_no, dr_code) {
    let datxyz = { admission_no: "", dr_code: "" };
    datxyz.admission_no = admission_no;
    datxyz.dr_code = dr_code;
    this.resiServ
      .post("/gw/doki/inpatients/verifytransfertocover", datxyz)
      .subscribe({
        complete: () => {},
        error: (error) => {
          //console.log(error);
        },
        next: (data: any) => {
          //console.log(data);
          if (data == true) {
            this.isAPVerifyTCstatus = true;
          }
        },
      });
  }*/
  back() {
    // this.navCtrl.back();
    this.router
      .navigate(["menu/in-patients/" + this.id + "/progressnotes"])
      .then(() => {
        window.location.reload();
      });
  }

  doRefresh(event) {
    this.progressNotesIsNotReady = true;
    setTimeout(() => {
      this.ngOnInit();

      event.target.complete();
    }, 1000);
  }
  pnLength;
  pnApprovedLength = 0;
  getProgressNotesPerDay(data) {
    this.pnApprovedLength = 0;
    this.pnLength = 0;
    let tempPn;
    this.progessNotes = [];
    this.residentService.getPatientProgressNotesPerDay(data).subscribe(
      (res: any) => {
        //console.log(res);

        tempPn = res;
        tempPn.sort(
          (a, b) => Date.parse(b.event_time) - Date.parse(a.event_time)
        );
      },
      (error) => {},
      () => {
        this.pnLength = tempPn.length;
        tempPn.forEach((el) => {
          if (el.dr_code == this.mdCode) {
            el.isMine = true;
          } else {
            el.isMine = false;
          }

          let getNewComment = {
            resi_code: "",
            trans_no: 0,
          };
          getNewComment.resi_code = this.logindata.doctorCode;
          getNewComment.trans_no = el.trans_no;
          el.new_message = getNewComment;
          el.event_time_c = this.funcServ.getFormatAMPM(el.event_time);
          if (this.doctor_Status_code == "AP") {
            if (el.ap_prog_notes_date_approved == "0001-01-01T00:00:00") {
              el.isPnApproved = false;
            } else {
              el.isPnApproved = true;
              this.pnApprovedLength += 1;
            }
            el.pnApprovedDate = this.funcServ.convertDatetoMMDDYYYYHHMMSS(
              el.ap_prog_notes_date_approved
            );
          } else {
            if (el.prog_notes_date_approved == "0001-01-01T00:00:00") {
              el.isPnApproved = false;
            } else {
              el.isPnApproved = true;
            }
            el.pnApprovedDate = this.funcServ.convertDatetoMMDDYYYYHHMMSS(
              el.prog_notes_date_approved
            );
          }
          this.progessNotes.push(el);
        });
        this.isApproved = this.progessNotes[0].is_approve;
        this.approvePN.account_no = this.progessNotes[0].account_no;
        this.approvePN.approved_by =
          this.logindata.lastName + ", " + this.logindata.firstName;
        this.approvePN.dr_code = this.logindata.doctorCode;
        this.approvePN.dr_name =
          this.logindata.lastName + ", " + this.logindata.firstName;
        this.approvePN.event_date = this.progessNotes[0].event_date;
        this.progressNotesIsNotReady = false;
      }
    );
  }
  isSummaryComplete: boolean = false;
  progressNoteSummary;
  summary_status;
  getProgressNotesSummary() {
    //console.log("111111111111111111");

    this.isSummaryComplete = false;
    let data = {
      account_no: this.patientInfo[0].admission_no,
      event_date: this.funcServ.getDateYYYYMMDD1(this.event_date),
    };
    let x;
    //console.log(data);

    this.residentService.getProgressNoteSummary(data).subscribe(
      (res: any) => {
        ////console.log('getProgressNotesSummary');
        ////console.log(res);
        x = res;
      },
      (error) => {},
      () => {
        if (x.length <= 0) {
        } else {
          this.progressNoteSummary = x[0].summary;
          this.summary_status = x[0].summary_status;
          localStorage.setItem("summary_status", this.summary_status);
          if (this.progressNoteSummary != null) {
            this.ngZone.run(() => {
              this.isSummaryComplete = true;
            });
          }
        }
      }
    );
  }
  async presentPopover(e: Event, dataJson) {
    this.progressNoteApproval.account_no = dataJson.account_no;
    this.progressNoteApproval.event_date = dataJson.event_date;
    const popover = await this.popoverController.create({
      component: ViewCommentsPopOverComponent,
      event: e,
      componentProps: {
        dataJson: dataJson,
      },
    });
    await popover.present();
    await popover.onDidDismiss().then((data) => {
      //////////console.log(data.data);
      if (data.data != undefined) {
        this.openModal(dataJson);
      }
      /*if (data.data != undefined) {
        this.presentAlertConfirmApprove(data.data);
      }*/
    });
  }
  async presentAlertConfirmApprove(dataxs) {
    const alert = await this.alertController.create({
      header: "Are you sure to approve this Progress Note?",
      cssClass: "custom-alert",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          handler: (data) => {
            this.approveProgressNote(this.progessNotes.trans_no);
          },
        },
      ],
    });

    await alert.present();
  }

  approveProgressNote(data) {
    ////////console.log(data);

    this.residentService.approveProgressNote(data).subscribe(
      (res: any) => {
        //////////console.log(res);
      },
      (error) => {},
      () => {
        this.ngOnInit();
      }
    );
  }
  handlerMessage;
  roleMessage;
  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Approve Progress Note " + this.event_date + "?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.handlerMessage = "Alert canceled";
          },
        },
        {
          text: "Approve",
          role: "confirm",
          handler: () => {
            this.approveProgressNote(this.approvePN);
            this.handlerMessage = "Alert confirmed";
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  async openModal(dataJson) {
    const modal = await this.modalController.create({
      component: ProgressnotesHistoryComponent,
      componentProps: {
        dataJson: dataJson,
        statuscodeeee: this.statuscodeeee,
        event_date: this.event_date,
        patient_id: this.patient_id,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
  coDoctors;
  isAP: boolean = false;
  isTC: boolean = false;
  iHaveTC: boolean = false;
  isVerify;
  isLoading: boolean = false;
  statuscodeeee;
  checkCoDoctors() {
    this.isLoading = true;
    let coDoctors1 = [];
    let coDoctors2 = [];
    let coDoctors3 = [];

    this.patient_id = this.activatedRoute.snapshot.params.id;

    this.inpatientDetails.admission_no = this.patient_id;
    //console.log(this.inpatientDetails);
    this.doctorService
      .getCoDoctorsV3(this.inpatientDetails)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////console.log();
          this.statuscodeeee = res[0].status_code;

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
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
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
          ////console.log(this.isAP, this.isTC, this.iHaveTC);

          if (this.isTC) {
            //console.log("check status");
            let datxyz = { admission_no: "", dr_code: "" };
            datxyz.admission_no = this.patient_id;
            datxyz.dr_code = this.dr_code;
            this.resiServ
              .post("/gw/doki/inpatients/verifytransfertocover", datxyz)
              .subscribe({
                complete: () => {},
                error: (error) => {
                  //console.log(error);
                },
                next: (data: any) => {
                  //console.log(data);
                  this.isVerify = data;
                  ////////console.log(data);
                },
              });
          }
        }
      );
  }
  result;
  async presentActionSheetapprove(e) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Approve PN of " + e.username + "?",
      cssClass: "my-custom-classdata",
      subHeader:
        this.funcServ.convertDatetoMMDDYYYY(e.event_date) +
        " " +
        this.funcServ.getFormatAMPM(e.event_time),
      buttons: [
        {
          text: "Confirm Approval",

          data: {
            action: "approve",
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    if (result.data.action == "approve") {
      this.approvePNnew(e, true);
    }
  }
  async presentActionSheetRevoke(e) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Revoke Approval PN of " + e.username + "?",
      cssClass: "my-custom-classdata",
      subHeader:
        this.funcServ.convertDatetoMMDDYYYY(e.event_date) +
        " " +
        this.funcServ.getFormatAMPM(e.event_time),
      buttons: [
        {
          text: "Revoke",

          data: {
            action: "revoke",
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    if (result.data.action == "revoke") {
      this.approvePNnew(e, false);
    }
  }
  approvePNnew(x, mode: boolean) {
    let ApprovePN = {
      trans_no: 40,
      account_no: "IPC100295023",
      event_date: "2023-03-12",
      resi_code: "RS005800",
    };
    ApprovePN.trans_no = x.trans_no;
    ApprovePN.account_no = x.account_no;
    ApprovePN.event_date = this.event_date;
    ApprovePN.resi_code = x.user_created;
    //console.log(ApprovePN);

    if (mode) {
      this.genServ
        .post("/gw/resi/ProgressNotes/ApprovedProgNotes", ApprovePN)
        .subscribe({
          complete: () => {},
          error: (error) => {
            ////////////////////////console.log(error);
          },
          next: (data: any) => {
            this.ngOnInit();
          },
        });
    } else {
      this.genServ
        .post("/gw/resi/ProgressNotes/RevokedProgNotes", ApprovePN)
        .subscribe({
          complete: () => {},
          error: (error) => {
            ////////////////////////console.log(error);
          },
          next: (data: any) => {
            this.ngOnInit();
          },
        });
    }
  }
  async presentActionSheetapproveAP(e) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Approve PN of " + e.username + "?",
      cssClass: "my-custom-classdata",
      subHeader:
        this.funcServ.convertDatetoMMDDYYYY(e.event_date) +
        " " +
        this.funcServ.getFormatAMPM(e.event_time),
      buttons: [
        {
          text: "Confirm Approval",

          data: {
            action: "approve",
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    if (result.data.action == "approve") {
      this.approvePNnewAP(e, true);
    }
  }
  async presentActionSheetRevokeAP(e) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Revoke Approval PN of " + e.username + "?",
      cssClass: "my-custom-classdata",
      subHeader:
        this.funcServ.convertDatetoMMDDYYYY(e.event_date) +
        " " +
        this.funcServ.getFormatAMPM(e.event_time),
      buttons: [
        {
          text: "Revoke",

          data: {
            action: "revoke",
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    if (result.data.action == "revoke") {
      this.approvePNnewAP(e, false);
    }
  }
  approvePNnewAP(x, mode: boolean) {
    let ApprovePN = {
      trans_no: 40,
      account_no: "IPC100295023",
      event_date: "2023-03-12",
      resi_code: "RS005800",
    };
    ApprovePN.trans_no = x.trans_no;
    ApprovePN.account_no = x.account_no;
    ApprovePN.event_date = this.event_date;
    ApprovePN.resi_code = x.user_created;
    //console.log(ApprovePN);https://api01.chonghua.com.ph/gw/resi/ProgressNotes/PrimaryAPRevokedProgNotes

    if (mode) {
      this.genServ
        .post("/gw/resi/ProgressNotes/PrimaryAPApprovedProgNotes", ApprovePN)
        .subscribe({
          complete: () => {},
          error: (error) => {
            ////////////////////////console.log(error);
          },
          next: (data: any) => {
            this.ngOnInit();
          },
        });
    } else {
      this.genServ
        .post("/gw/resi/ProgressNotes/PrimaryAPRevokedProgNotes", ApprovePN)
        .subscribe({
          complete: () => {},
          error: (error) => {
            ////////////////////////console.log(error);
          },
          next: (data: any) => {
            this.ngOnInit();
          },
        });
    }
  }
  async AprroveAllNotes(event_date, account_no, mode) {
    let actionSheet;
    if (mode) {
      actionSheet = await this.actionSheetCtrl.create({
        header: "Approve All Progress Notes?",
        cssClass: "my-custom-classdata",

        buttons: [
          {
            text: "Confirm Approval",

            data: {
              action: "approve",
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            data: {
              action: "cancel",
            },
          },
        ],
      });
    } else {
      actionSheet = await this.actionSheetCtrl.create({
        header: "Revoke All Progress Notes?",
        cssClass: "my-custom-classdata",

        buttons: [
          {
            text: "Confirm Revoke",

            data: {
              action: "revoke",
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            data: {
              action: "cancel",
            },
          },
        ],
      });
    }

    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    if (result.data.action == "approve" || result.data.action == "revoke") {
      this.approveALLPNnewAP(event_date, account_no, mode);
    }
  }
  approveALLPNnewAP(event_date, account_no, mode: boolean) {
    let ApprovePN = {
      trans_no: 0,
      account_no: "",
      event_date: "",
      resi_code: "",
    };

    ApprovePN.account_no = account_no;
    ApprovePN.event_date = event_date;
    console.log(ApprovePN);
    //console.log(ApprovePN);https://api01.chonghua.com.ph/gw/resi/ProgressNotes/PrimaryAPRevokedProgNotes

    if (mode) {
      this.genServ
        .post("/gw/resi/ProgressNotes/PrimaryAPApprovedProgNotes", ApprovePN)
        .subscribe({
          complete: () => {},
          error: (error) => {
            ////////////////////////console.log(error);
          },
          next: (data: any) => {
            this.ngOnInit();
          },
        });
    } else {
      this.genServ
        .post("/gw/resi/ProgressNotes/PrimaryAPRevokedProgNotes", ApprovePN)
        .subscribe({
          complete: () => {},
          error: (error) => {
            ////////////////////////console.log(error);
          },
          next: (data: any) => {
            this.ngOnInit();
          },
        });
    }
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  checkAppearance() {
    var values = JSON.parse(
      "[" + atob(localStorage.getItem("user_settings")) + "]"
    );
    let dr_username = atob(localStorage.getItem("username"));
    values.forEach((element) => {
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, "color-theme", "dark");
      } else {
        this.renderer.setAttribute(document.body, "color-theme", "light");
      }
    });
  }
}
