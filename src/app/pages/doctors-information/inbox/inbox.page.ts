import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  ActionSheetController,
  IonModal,
  ModalController,
  NavController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { Router } from '@angular/router';
import { SignatureApproval } from 'src/app/models/doctor';
import { Constants } from 'src/app/shared/constants';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isNotification: boolean;
  selected = 'FA';
  pendingApproval;
  pendingApprovalFullList;
  dischargeNo = {
    discharge_no: '',
    revision_dx_remarks: '',
  };
  isDesktop: boolean;
  empty: boolean = false;
  constructor(
    private navCtrl: NavController,
    public doctorService: DoctorService,
    public screensizeService: ScreenSizeService,
    private renderer: Renderer2,
    public actionSheetController: ActionSheetController,
    public router: Router,
    public modalController: ModalController,
    public popover: PopoverController,
    public constants: Constants,
    public toastController: ToastController,
    public functionService: FunctionsService
  ) {
    //console.log('constructor');
    this.isNotification = true;
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
  ionViewWillEnter() {
    this.setDate();
    //console.log('ionViewWillEnter');
    this.selected = localStorage.getItem('changeMode');

    this.getPendingApproval(this.dateToday, this.dateNow);
  }
  ngOnInit() {
    //this.setDate();
    //this.getPendingApproval(this.dateToday, this.dateNow);

    //console.log('ngOnInit');

    this.checkAppearance();
  }
  checkAppearance() {
    var values = JSON.parse(
      '[' + atob(localStorage.getItem('user_settings')) + ']'
    );
    let dr_username = atob(localStorage.getItem('username'));
    values.forEach((element) => {
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      } else {
        this.renderer.setAttribute(document.body, 'color-theme', 'light');
      }
    });
  }
  back() {
    this.navCtrl.back();
  }
  getType(e) {
    if (this.selected == 'e') {
      return 'boldMe';
    } else {
      return 'unboldMe';
    }
  }
  modeSelected: string = 'for Approval';
  changeMode(e) {
    this.selected = e;
    localStorage.setItem('changeMode', e);
    if (this.selected == 'FA' || this.selected == 'RA') {
      this.modeSelected = 'for Approval';
    } else if (this.selected == 'FR') {
      this.modeSelected = 'for Revision';
    } else if (this.selected == 'DA') {
      this.modeSelected = 'Approved';
    }
    if (this.selected == 'FR' || this.selected == 'DA') {
      this.pendingApproval = this.pendingApprovalFullList.filter(
        (element) => element.approval_status == e
      );
    } else {
      this.pendingApproval = this.pendingApprovalFullList.filter(
        (element) =>
          element.approval_status == 'RA' || element.approval_status == 'FA'
      );
    }
  }
  /*segmentChanged(e) {
    ////console.log(e.detail.value);
    //this.router.navigate(['/sign-medcert/' + e.detail.value]);
    //console.log(e.detail.value);
    this.selected = e.detail.value;
    this.pendingApproval = this.pendingApprovalFullList.filter(
      (element) => element.approval_status == e.detail.value
    );
  }*/
  getPendingApproval(dateFrom, dateTo) {
    console.log(this.selected);
    this.pendingApproval = [];
    this.pendingApprovalFullList = [];
    let data = {
      dt_from: dateFrom + 'T00:00:00.000Z',
      dt_to: dateTo + 'T00:00:00.000Z',
    };
    this.doctorService
      .getPendingApproval(data)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.pendingApprovalFullList = res;
          if (this.pendingApprovalFullList == null) {
            this.empty = true;
          } else {
            this.empty = false;
          }
          //console.log(this.pendingApprovalFullList);
        },
        (error) => {
          //console.log(error);
        },
        () => {
          this.changeMode(this.selected);
        }
      );
  }
  approvePendingAPproval(discharge_no) {
    this.dischargeNo.discharge_no = discharge_no;
    //console.log(this.dischargeNo);
    this.doctorService
      .approvePendingApproval(this.dischargeNo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          //console.log(res);
        },
        (error) => {
          //console.log(error);
        },
        () => {
          this.getPendingApproval(this.dateToday, this.dateNow);
        }
      );
  }
  doRefresh(event) {
    setTimeout(() => {
      this.getPendingApproval(this.dateToday, this.dateNow);
      //location.reload();
      event.target.complete();
    }, 1000);
  }

  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    // this.ngUnsubscribe.complete();
    this.ngUnsubscribe.complete();
  }

  dischargeNumber: any;
  reviseRevokeApproval(x) {
    console.log(x);
    this.dischargeNo = x.discharge_no;
    if (this.selected == 'FA') {
      document.getElementById('trigger-modal-forRevision').click();
      //this.presentForRevision(x);
    } else {
      this.presentRevokeApproval(x);
    }
  }
  viewCerticate(x) {
    if (this.selected == 'FA') {
      this.router.navigate([
        'menu/inbox/sign-medcert/' + x.admission_no + '/' + x.discharge_no,
      ]);
    } else {
      this.router.navigate([
        'menu/in-patients/' +
          x.admission_no +
          '/viewAndCancel/' +
          x.discharge_no,
      ]);
    }
  }

  viewAndCancelCerticate(x) {
    //console.log(x);

    this.router.navigate([
      'menu/in-patients/' + x.admissionNo + '/view/' + x.dischargeNo,
    ]);
  }

  async presentActionSheet(x) {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header:
        'Are you sure to Approve ' + x.patient_name + "'s final diagnosis?",
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Yes, Approve',
          icon: 'thumbs-up-outline',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            this.approvePendingAPproval(x.discharge_no);
          },
        },

        {
          text: 'Back',
          icon: 'arrow-back-outline',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    //console.log('onDidDismiss resolved with role and data', role, data);
  }
  async presentForRevision(x) {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: "Set patient's final diagnosis for Revision",
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Yes, Send for Revision',
          icon: 'thumbs-up-outline',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            console.log(x.discharge_no);
            //this.cancelApprovedApproval(x.discharge_no);
          },
        },
        {
          text: 'Back',
          icon: 'arrow-back-outline',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
  }
  async presentRevokeApproval(x) {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: "Are you sure to revoke the patient's final diagnosis?",
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Yes, Revoke',
          icon: 'thumbs-up-outline',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            this.clearSignature(x);
          },
        },
        {
          text: 'Back',
          icon: 'arrow-back-outline',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
  }
  clearSignature(x) {
    let patientId = x.discharge_no;
    let revokeApproval: SignatureApproval = new SignatureApproval();
    revokeApproval.mode = this.constants.TestServer;
    revokeApproval.account_no = patientId;
    revokeApproval.medcert_comment = 'medcert_comment';
    revokeApproval.medcert_approve_by = 'medcert_approve_by';
    revokeApproval.medcert_signature = this.constants.blankBase64img;
    this.saveSignature(revokeApproval, x.discharge_no);
  }
  saveSignature(testAprrove, x) {
    let dischargeNo = x;
    this.doctorService
      .approveMedicalCertificate(testAprrove)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {},
        (error) => {
          console.log(error);
        },
        () => {
          //this.cancelApprovedApproval(dischargeNo);
        }
      );
  }
  cancelApprovedApproval(discharge_no: any, revision_dx_remarks: any) {
    let dischargeNo = {
      discharge_no: discharge_no,
      revision_dx_remarks: revision_dx_remarks,
    };
    this.doctorService
      .cancelApprovedFinalDiagnosis(dischargeNo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error) => {},
        () => {
          this.ionViewWillEnter();
        }
      );
  }
  pastdays: any = '15';
  dateToday: any = '12/31/2021';
  dateValue = '2021-12-31';
  isCalendar: boolean;
  dateNow = '';
  viewRecordDays() {
    this.dateValue = this.functionService.getDateYYYYMMDD(this.pastdays);
    this.dateToday = this.functionService.getDateYYYYMMDD(this.pastdays);
    this.dateNow = this.functionService.getDateYYYYMMDD();
    this.getPendingApproval(this.dateToday, this.dateNow);
  }
  activateIsCalendarModal() {
    this.isCalendar = true;
    const modalState = {
      modal: true,
      desc: 'fake state for our modal',
    };
    history.pushState(modalState, null);
  }
  setDate() {
    this.dateValue = this.functionService.getDateYYYYMMDD(this.pastdays);
    this.dateToday = this.functionService.getDateYYYYMMDD(this.pastdays);
    this.dateNow = this.functionService.getDateYYYYMMDD();
  }
  formatDate(value: string) {
    if (this.isCalendar) {
      this.closeCalendar();
    }
    console.log(value);
    let dateOne = new Date(value);
    let dateTwo = new Date(this.dateNow);
    if (dateOne > dateTwo) {
      this.functionService.presentToast(
        'Date selected is greater than date now'
      );
      return false;
    }
    this.isCalendar = false;
    let date1 = new Date(value);
    let day1 = date1.getDate();
    let month1 = date1.getMonth() + 1;
    let year1 = date1.getFullYear();
    let sendDatedateToday =
      ('0' + month1).slice(-2) + '/' + ('0' + day1).slice(-2) + '/' + year1;
    let sendDatedateValue =
      year1 + '-' + ('0' + month1).slice(-2) + '-' + ('0' + day1).slice(-2);
    this.dateValue = sendDatedateValue;
    this.dateToday = sendDatedateValue;
    this.getPendingApproval(this.dateToday, this.dateNow);
    //this.dateChanged();
  }

  closeCalendar() {
    this.isCalendar = false;
    this.modalController.dismiss();
  }

  autoGrowTextZone(e) {
    if (e.target.scrollHeight + 25 <= 350) {
      e.target.style.height = '0px';
      e.target.style.height = e.target.scrollHeight + 25 + 'px';
    }
  }
  forRevisionText = '';
  @ViewChild(IonModal) modal: IonModal;
  dismissForRevisionModal() {
    this.modalController.dismiss(null, 'cancel');
  }
  saveForRevisionModal() {
    let forRevisionText = this.forRevisionText;
    let dischargeNo = this.dischargeNo;
    this.forRevisionText = '';
    this.dischargeNumber = '';
    this.cancelApprovedApproval(dischargeNo, forRevisionText);

    this.modalController.dismiss(null, 'cancel');
  }
}
