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
    this.addMoreItems();
  }
  items = [];
  numTimesLeft = 5;
  ngOnInit() {
    this.checkAppearance();

    this.doctorService
      .getNewsFeedV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.newsfeed = res;
        },
        (error) => {},
        () => {}
      );

    console.log(this.ngUnsubscribe);
  }

  loadData(event) {
    setTimeout(() => {
      this.functionsService.logToConsole('Done');
      this.addMoreItems();
      //this.numTimesLeft -= 1;
      event.target.complete();
    }, 500);
  }
  addMoreItems() {
    for (let i = 0; i < 10; i++) {
      this.items.push(i);
    }
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
    setTimeout(() => {
      this.doctorService
        .getNewsFeedV3()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res: any) => {
            this.newsfeed = res;
          },
          (error) => {},
          () => {}
        );
      //location.reload();
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
    console.log('ionViewDidLeave');
    console.log(this.ngUnsubscribe);
    this.ngUnsubscribe.next();
    // this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }
}
