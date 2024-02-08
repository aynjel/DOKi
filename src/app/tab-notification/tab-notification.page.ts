import { Component, OnInit } from "@angular/core";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Constants } from "../shared/constants";
import { NotificationService } from "../services/notification/notification.service";
import { MessageType, Notification } from "../models/notificationModel";
import { SwPush } from "@angular/service-worker";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: 'app-tab-notification',
  templateUrl: './tab-notification.page.html',
  styleUrls: ['./tab-notification.page.scss'],
})
export class TabNotificationPage implements OnInit {
  filterLists: MessageType[] = [];
  defaultFilter = [
    { title: 'latest', messageType: 'latest' },
    { title: 'earliest', messageType: 'earliest' }
  ];
  selectedFilter = this.defaultFilter[0].messageType;
  filterTitle = this.defaultFilter[0].title;
  searchNotif: string;
  searchKeys = ['messageType', 'message'];

  groupedNotificationList: { [date: string]: Notification[] };
  notificationDates: string[] = [];

  isFetchDone = false;
  isUporDown = true;
  isDesktop: boolean;
  currentDate = new Date()
    .toLocaleString("en-ca", { timeZone: "Asia/Manila" })
    .split(",")[0];

  yesterday = new Date();
  yesterdayDate = this.yesterday.setDate(this.yesterday.getDate() - 1);
  yesterdayDateFormatted = new Date(this.yesterdayDate)
    .toLocaleString("en-ca", { timeZone: "Asia/Manila" })
    .split(",")[0];

  selectedAccordion: string;
  page = 1;

  private ngUnsubscribe = new Subject();

  constructor(
    private screensizeService: ScreenSizeService,
    public constants: Constants,
    private notificationService: NotificationService,
    private swPush: SwPush,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {
    this.adaptScreenSize();
  }

  expandAndUpdateStatus(event: CustomEvent): void {
    const { groupedNotificationList } = this;
    Object.keys(groupedNotificationList).forEach((key) => {
      groupedNotificationList[key].forEach((element) => {
        if (element._id === event.detail.value) {

          if (this.selectedAccordion === event.detail.value) this.selectedAccordion = '';

          this.selectedAccordion = event.detail.value;
          if (element.status !== 3) {
            element.status = 3;
            this.notificationService.updateNotificationStatus(element._id).subscribe();
          }
        }
      });
    });
  }  

  ngOnInit() {
    this.swPush.messages.subscribe((message) => {
      setTimeout(() => {
        if (this.selectedFilter === 'latest') {
          this.loadNotifications();
        }else {
          this.filterNotifications();
        }
      }, 1000);
    });

    this.loadMessageTypes();
    this.loadNotifications();
  }

  openUrl(url: string) {
    const path = url.split('/').slice(3).join('/');
    this.router.navigateByUrl(path);
  }

  async loadMessageTypes(): Promise<void> {
    this.notificationService.getMessaTypes().subscribe((messageTypes) => {
      this.filterLists = messageTypes.filter((messageType) => messageType.isActive);
      this.filterLists.unshift(...this.defaultFilter);
    });
  }

  async loadNotifications(): Promise<void> {
    this.page = 1;
    this.searchNotif = '';
    this.notificationService.getNotifications(this.page).subscribe({
      next: (res) => {
        const notifications = res;
        this.groupedNotificationList = notifications.reduce((acc, obj) => {
          const notifDate = new Date(obj.dateTimeSend)
            .toLocaleString("en-ca", { timeZone: "Asia/Manila" })
            .split(",")[0];

          acc[notifDate] = acc[notifDate] || [];
          acc[notifDate].push(obj);

          return acc;
        }, {});

        this.notificationDates = Object.keys(this.groupedNotificationList);
        this.isFetchDone = true;
        this.isUporDown = false;
      },
      error: (err) => {
        this.isFetchDone = true;
        this.isUporDown = false;
      }
    });
  }

  doRefresh(event: any): void {
    this.isUporDown = false;
    setTimeout(() => {
      this.isUporDown = true;
      this.selectedFilter = this.defaultFilter[0].messageType;
      this.filterTitle = this.defaultFilter[0].title;
      this.loadNotifications();
      event.target.complete();
    }, 1000);
  }

  searchFilter(event: any) {
    this.searchNotif = event.target.value;
    this.filterNotifications();
  }

  selectFilter(messageType: string, title: string): void {
    this.selectedFilter = messageType;
    this.filterTitle = title;

    this.loadingCtrl.create({
      message: 'Loading notifications...',
      spinner: 'crescent',
      translucent: true,
    }).then((loading) => {
      loading.present();
      this.filterNotifications();
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }

  selectFilterLg(ev: any): void {
    this.selectedFilter = ev.detail.value;
    this.filterTitle = this.filterLists.find((item) => item.title === this.selectedFilter).title;
    
    this.loadingCtrl.create({
      message: 'Loading notifications...',
      spinner: 'crescent',
      translucent: true,
    }).then((loading) => {
      loading.present();
      this.filterNotifications();
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    });
  }
  
  loadMoreData(event) {
    if (this.searchNotif || this.selectedFilter !== 'latest' && this.selectedFilter !== 'earliest') {
      event.target.complete();
      return;
    }
    this.page++;
    this.notificationService.getNotifications(this.page)
      .subscribe({
        next: (res) => {
          const notifications = res;
          
          if (notifications.length === 0) {
            this.page--;
          }
          notifications.forEach((notification) => {
            const notifDate = new Date(notification.dateTimeSend)
              .toLocaleString("en-ca", { timeZone: "Asia/Manila" })
              .split(",")[0];
            this.groupedNotificationList[notifDate] = this.groupedNotificationList[notifDate] || [];
            this.groupedNotificationList[notifDate].push(notification);
          });

          this.notificationDates = Object.keys(this.groupedNotificationList);
          setTimeout(() => {
            event.target.complete();
          }, 500);
        },
        error: (err) => {
          this.page--;
          event.target.complete();
        }
      });
  }

  adaptScreenSize(): void {
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

  private filterNotifications() {
    this.notificationService.getNotifications(this.page, 0)
    .subscribe({
      next: (res) => {
        const data = res;
        const filtered = data.filter((notif: Notification) => {
          if (this.selectedFilter !== 'latest' && this.selectedFilter !== 'earliest') {
            return notif.messageType === this.selectedFilter;
          }
          return notif;
        });

        if (this.selectedFilter === 'earliest') {
          filtered.reverse();
        }

        if (this.searchNotif) {
          const filteredSearch = filtered.filter((notif: Notification) => {
            return this.searchKeys.some((key) => {
              return notif[key].toLowerCase().includes(this.searchNotif.toLowerCase());
            });
          });
          filtered.length = 0;
          filtered.push(...filteredSearch);
        }

        const notifications: Notification[] = filtered;
        
        this.groupedNotificationList = notifications.reduce((acc, obj) => {
          const notifDate = new Date(obj.dateTimeSend)
            .toLocaleString("en-ca", { timeZone: "Asia/Manila" })
            .split(",")[0];

          acc[notifDate] = acc[notifDate] || [];
          acc[notifDate].push(obj);

          return acc;
        }, {});

        this.notificationDates = Object.keys(this.groupedNotificationList);
        this.isFetchDone = true;
        this.isUporDown = false;
      }
    })
  }
}
  