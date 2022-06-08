import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  NavController,
  PopoverController,
} from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { Router } from '@angular/router';
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
    public popover: PopoverController
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
    //console.log('ionViewWillEnter');
    this.selected = localStorage.getItem('changeMode');
    this.changeMode(this.selected);

    this.getPendingApproval();
  }
  ngOnInit() {
    this.getPendingApproval();

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
    if (this.selected == 'FA') {
      this.modeSelected = 'for Approval';
    } else if (this.selected == 'FR') {
      this.modeSelected = 'for Revision';
    } else if (this.selected == 'RA') {
      this.modeSelected = 'Approved';
    }
    this.pendingApproval = this.pendingApprovalFullList.filter(
      (element) => element.approval_status == e
    );
    //this.popover.dismiss();
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
  getPendingApproval() {
    this.pendingApproval = [];
    this.pendingApprovalFullList = [];
    let data = {
      dt_from: '2021-01-17T08:42:50.917Z',
      dt_to: '2022-05-17T08:42:50.917Z',
    };
    this.doctorService
      .getPendingApproval()
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
          this.pendingApproval = this.pendingApprovalFullList.filter(
            (element) => element.approval_status == this.selected
          );
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
          this.getPendingApproval();
        }
      );
  }
  doRefresh(event) {
    setTimeout(() => {
      this.getPendingApproval();
      //location.reload();
      event.target.complete();
    }, 1000);
  }

  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    // this.ngUnsubscribe.complete();
    this.ngUnsubscribe.complete();
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
}
