import { Component, Renderer2 } from '@angular/core';
import { DoctorService } from '../services/doctor/doctor.service';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';
import { FunctionsService } from '../shared/functions/functions.service';
import { OnInit } from '@angular/core';
import { ChhAppNewsfeedComponent } from '../chh-web-components/chh-app-newsfeed/chh-app-newsfeed.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-tab-news-feed',
  templateUrl: './tab-news-feed.page.html',
  styleUrls: ['./tab-news-feed.page.scss'],
})
export class TabNewsFeedPage implements OnInit {
  isDesktop: boolean;
  private ngUnsubscribe = new Subject();
  newsfeed: any;
  newsfeedTemp: any;
  isNotification: boolean;
  refreshcounter;
  constructor(
    private screensizeService: ScreenSizeService,
    private modalController: ModalController,
    private doctorService: DoctorService,
    private renderer: Renderer2,
    public functionsService: FunctionsService
  ) {
    this.functionsService.logToConsole('In-patient : Constructor');
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
  items = [];
  numTimesLeft = 5;
  ngOnInit() {
    this.refreshcounter = 1;
    this.newsfeedTemp = [];
    this.newsfeed = [];
    this.ngUnsubscribe = new Subject();
    localStorage.removeItem('selectedPatient');
    this.checkAppearance();
    this.doctorService
      .getNewsFeedV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          console.log(res);

          this.newsfeedTemp = res;
        },
        (error) => {},
        () => {
          this.initiateData();
        }
      );
  }
  initiateData() {
    this.newsfeed = this.newsfeedTemp.slice(0, 10);
  }
  ionViewWillEnter() {
    this.checkInbox();
  }
  checkInbox() {
    //console.log('CHECKS INBOX');
    let jsonResponse = null;
    this.doctorService
      .getPendingApproval()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          jsonResponse = res;
        },
        (error) => {},
        () => {
          if (jsonResponse == null) {
            this.isNotification = false;
          } else {
            this.isNotification = true;
          }
        }
      );
  }
  loadData(event) {
    this.refreshcounter++;
    setTimeout(() => {
      this.functionsService.logToConsole('Done');
      this.newsfeed = this.newsfeed.concat(
        this.newsfeedTemp.slice(
          this.refreshcounter * 10 - 10,
          this.refreshcounter * 10
        )
      );
      event.target.complete();
    }, 500);
  }

  async showaddmodal1(x) {
    var data = x;
    const modal = await this.modalController.create({
      component: ChhAppNewsfeedComponent,
      componentProps: {
        backdropDismiss: true,
        data: data,
      },
    });
    modal.onDidDismiss().then((data) => {});
    return await modal.present();
  }
  doRefresh(event) {
    this.checkInbox();
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  checkAppearance() {
    this.functionsService.logToConsole('checkAppearance');
    var values = JSON.parse(
      '[' + atob(localStorage.getItem('user_settings')) + ']'
    );
    let dr_username = atob(localStorage.getItem('username'));
    values.forEach((element) => {
      this.functionsService.logToConsole(element.darkmode);
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      } else {
        this.renderer.setAttribute(document.body, 'color-theme', 'light');
      }
    });
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
