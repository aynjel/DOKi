import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { analyzeAndValidateNgModules, tokenName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { DoctorService } from '../doctor/doctor.service';
import {
  UserSettingsModelv3,
  LoginResponseModelv3,
  RevokeTokenV3,
} from 'src/app/models/doctor';
import { StorageService } from '../storage/storage.service';
import { AuthConstants, Consta } from '../../config/auth-constants';

import { BehaviorSubject } from 'rxjs';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { LogoutService } from '../logout/logout.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  userData$ = new BehaviorSubject<any>([]);
  isModal: boolean = false;
  constructor(
    private _router: Router,
    public alertController: AlertController,
    public router: Router,
    private doctorService: DoctorService,
    private storageService: StorageService,
    public functionsService: FunctionsService,
    public modalController: ModalController,
    private logoutService: LogoutService,
    private loadingController: LoadingController
  ) {}
  modaled: any;
  jwthas: any;
  public revokeTokenV3: RevokeTokenV3;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');
    this.revokeTokenV3 = new RevokeTokenV3();
    this.revokeTokenV3.jwt = localStorage.getItem('id_token');
    if (idToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return next.handle(cloned).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.unAuthorized();
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  tokenExpired: any;
  tokenExpiredLog: any;
  public async dismissLoading(): Promise<void> {
    this.loadingController.dismiss();
  }
  async unAuthorized() {
    let tokenExpiredLog = localStorage.getItem('tokenExpired');
    if (tokenExpiredLog == '0' || tokenExpiredLog == '1') {
    } else {
      localStorage.setItem('tokenExpired', '0');
      tokenExpiredLog = localStorage.getItem('tokenExpired');
    }
    //console.log(tokenExpiredLog);

    if (tokenExpiredLog == '0') {
      localStorage.setItem('tokenExpired', '1');
      this.dismissLoading();
      this.tokenExpired = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Dok, are you still there?',
        animated: true,
        backdropDismiss: false,
        message: 'You have been idle for quite some time...',
        buttons: [
          {
            text: 'Log me out',
            cssClass: 'secondary',
            handler: () => {
              this.logout();
            },
          },
          {
            text: 'Keep me in',
            handler: () => {
              localStorage.setItem('tokenExpired', '0');
              this.tokenExpired = null;
              let xdata: any;
              this.doctorService.refreshTokenV3().subscribe(
                (res: any) => {
                  console.log(res);
                  xdata = res;
                },
                (error) => {
                  this.logoutPopup();
                },
                () => {
                  if (xdata.isAuthenticated) {
                    localStorage.setItem('id_token', xdata.jwt);
                    window.location.reload();
                  } else {
                    this.logoutPopup();
                  }
                }
              );
            },
          },
        ],
      });
      await this.tokenExpired.present();
    }
  }
  logout() {
    let dr_username = atob(localStorage.getItem('username'));
    this.revokeTokenV3.jwt = decodeURIComponent(
      this.functionsService.getcookie('refreshToken')
    );
    localStorage.setItem('torevoketoken', '1');
    this.doctorService.revokeTokenV3(this.revokeTokenV3).subscribe(
      (res: any) => {
        ////////console.log(res);
      },
      (error) => {
        this.logoutService.out();
      },
      () => {
        this.logoutService.out();
      }
    );
  }
  async logoutPopup() {
    let dr_username = atob(localStorage.getItem('username'));
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Your session has expired. Please log in again.',
      message: '',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.logoutService.out();
          },
        },
      ],
    });
    await alert.present();
  }
  closemodal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
