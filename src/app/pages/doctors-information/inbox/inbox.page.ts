import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isNotification: boolean;
  selected = 'Final Diagnosis';
  pendingApproval;
  dischargeNo = {
    discharge_no: '',
  };
  isDesktop: boolean;
  constructor(
    private navCtrl: NavController,
    public doctorService: DoctorService,
    public screensizeService: ScreenSizeService,
    private renderer: Renderer2
  ) {
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

  ngOnInit() {
    this.checkAppearance();
    this.getPendingApproval();
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
  segmentChanged(e) {
    console.log(e.detail.value);
  }
  getPendingApproval() {
    this.pendingApproval = [];
    this.doctorService
      .getPendingApproval()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.pendingApproval = res;
          console.log(this.pendingApproval);
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );
  }
  approvePendingAPproval(discharge_no) {
    this.dischargeNo.discharge_no = discharge_no;
    console.log(this.dischargeNo);
    this.doctorService
      .approvePendingApproval(this.dischargeNo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
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
}
