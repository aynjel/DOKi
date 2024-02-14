import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { SwPush } from '@angular/service-worker';
import { NotificationData, Notification, PublicKey, SubscriptionPayload, MessageType, MessageTypeData } from 'src/app/models/notificationModel';
import { map, tap } from 'rxjs/operators';
import { FunctionsService } from 'src/app/shared/functions/functions.service';

const PN_API = environment.DEV_CHH_PN;

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  
  constructor(
    private http: HttpClient,
    private swPush: SwPush,
    private functionsService: FunctionsService
  ) { }

  async allowNotification(): Promise<any> {
    const isSubscribed = await this.checkSubscription();
    if(!isSubscribed){
      const publicKey = await this.getPublicKey().toPromise();
      const sub = await this.requestSubscription(publicKey.data.publicKey);
      this.subscribeNotification(sub).subscribe({
        next: (res) => {
          localStorage.setItem('isSubscribed', '1');
          localStorage.setItem('pushSubscription', JSON.stringify(res.data));
        },
        error: (err) => console.error(err)
      });
    }
  }

  async denyNotification(): Promise<any> {
    const isSubscribed = await this.checkSubscription();
    if(isSubscribed){
      navigator.serviceWorker.getRegistration().then((reg) => {
        reg?.pushManager.getSubscription().then((sub) => {
          const subEndpoint = sub?.endpoint || '';
          this.unSubscribeToNotifications(subEndpoint).subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (err) => console.error(err)
          });
        });
      });
    }
  }


  checkSubscription(): Promise<any> {
    if (!('Notification' in window)) {
      console.error('Notifications is not supported in this browser');
      return null;
    }

    Notification.requestPermission().then((status) => {
      if (status === 'granted') {
        return new Promise((resolve, reject) => {
          navigator.serviceWorker.getRegistration().then((reg) => {
            reg?.pushManager.getSubscription().then((sub) => {
              if(sub === null || sub === undefined){
                console.log('Not Subscribed');
                resolve(false);
              } else {
                console.log('Subscribed', sub);
                resolve(true);
              }
            });
          });
        });
      } else {
        console.error('Notifications permission is not granted');
        return this.rePromptNotification();
      }
    });
  }

  rePromptNotification(): Promise<any> {
    return new Promise((resolve, reject) => {
      Notification.requestPermission().then((status) => {
        if (status === 'granted') {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  getPublicKey(): Observable<PublicKey> {
    return this.http.get<PublicKey>(PN_API + 'subscription');
  }

  requestSubscription(publicKey: string): Promise<PushSubscription> {
    return new Promise((resolve, reject) => {
      this.swPush.requestSubscription({
        serverPublicKey: publicKey,
      })
      .then((sub) => resolve(sub))
      .catch((err) => reject(err));
    });
  }

  subscribeNotification(subsPayload: PushSubscription): Observable<SubscriptionPayload> {
    const payload = {
      subscription: subsPayload, // this is the subscription object from the browser
      app: 'doki', // this is the app name
      userId: atob(localStorage.getItem('userId')) // this is the user id
    };
    return this.http.post<SubscriptionPayload>(PN_API + 'subscription', payload);
  }

  unSubscribeToNotifications(subEndpoint: string): Observable<SubscriptionPayload> {
    const payload = {
      body: { endpoint: subEndpoint }
    };
    return this.http.delete<SubscriptionPayload>(PN_API + 'subscription', payload);
  }
  
  getNotifications(page = 1, limit = 20): Observable<Notification[]> {
    const userId = atob(localStorage.getItem('userId'));
    return this.http.get<NotificationData>(
      PN_API + 'notification/recipient/' + userId + '?page=' + page + '&limit=' + limit
    ).pipe(map((res) => {
      return res.data
        .filter((notification) => notification.dateTimeSend !== null)
        .sort((a, b) => new Date(b.dateTimeSend).getTime() - new Date(a.dateTimeSend).getTime());
    }));
  }

  getMessaTypes(): Observable<MessageType[]> {
    return this.http.get<MessageTypeData>(PN_API + 'messagetype/appreceiver/doki')
    .pipe(
      map((res) => res.data)
    );
  }

  updateNotificationStatus(id: string): Observable<SubscriptionPayload> {
    const payload = {
      notificationId: id,
      status: 3
    };
    return this.http.patch<SubscriptionPayload>(PN_API + 'notification', payload)
    .pipe(
      tap((res: SubscriptionPayload) => {
        console.log(res.message, res);
      })
    );
  }

  async subscribeToNotifications(): Promise<void> {
    this.getPublicKey().subscribe({
      next: async (res) => {
        const publicKey = res.data.publicKey;
        const subscription = await this.requestSubscription(publicKey);

        if(subscription){
          this.subscribeNotification(subscription).subscribe({
            next: (sub) => {
              console.log(sub.message, sub);
              localStorage.setItem('isSubscribed', '1');
              localStorage.setItem('pushSubscription', JSON.stringify(sub.data));
              this.functionsService.presentToast("You are now subscribed to notifications");
            },
            error: (err) => console.error(err)
          });
        }else{
          console.log('No subscription');
        }
      },
      error: (err) => console.error(err)
    });
  }

  async setUnsubscribeToNotifications(): Promise<void> {
    const pushSubscription = JSON.parse(localStorage.getItem('pushSubscription'));
    // console.log('subscription: ', pushSubscription.subscription);
    // console.log('endpoint: ', pushSubscription.subscription.endpoint);
    if(pushSubscription){
      const endpoint = pushSubscription.subscription.endpoint;
      this.unSubscribeToNotifications(endpoint).subscribe({
        next: (sub) => {
          console.log(sub.message, sub);
          localStorage.setItem('isSubscribed', '0');
          localStorage.removeItem('pushSubscription');
          this.swPush.unsubscribe();
          this.functionsService.presentToast("Successfully unsubscribed to notifications");
        },
        error: (err) => console.error(err)
      });
    }else{
      console.log('No subscription');
    }
  }
}