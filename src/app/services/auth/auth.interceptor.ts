import { HttpEvent, HttpHandler, HttpInterceptor , HttpRequest,  HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { analyzeAndValidateNgModules, tokenName } from '@angular/compiler';
import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { DoctorService } from '../doctor/doctor.service';
import {UserSettingsModelv3,LoginResponseModelv3,RevokeTokenV3} from 'src/app/models/doctor';
import { StorageService } from '../storage/storage.service';
import { AuthConstants, Consta } from '../../config/auth-constants';

import { BehaviorSubject } from 'rxjs';
import { FunctionsService } from 'src/app/shared/functions/functions.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  userData$ = new BehaviorSubject<any>([]);
  constructor(
    private _router: Router,
    public alertController: AlertController,
    public router: Router,
    private doctorService: DoctorService,
    private storageService: StorageService,
    public functionsService: FunctionsService) { }
    modaled:any;
    modaled1:any;
    jwthas:any;
    public revokeTokenV3: RevokeTokenV3; 
   intercept(req:HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
        const idToken = localStorage.getItem("id_token");
        this.revokeTokenV3 = new RevokeTokenV3();
        this.revokeTokenV3.jwt = localStorage.getItem("id_token");
        if(idToken){
          //console.log('token is alive');
          
            const cloned = 
            //req.clone({headers:req.headers.set("Authorization",idToken)});

           req.clone({
                setHeaders: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',Authorization: `Bearer ${idToken}`
                }
              });



           // return next.handle(cloned);
           return next.handle(cloned).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  localStorage.setItem("modaled","0");
                }
                return event;
            }),catchError((error: HttpErrorResponse) => {
                this.modaled = localStorage.getItem("modaled");
                this.modaled1 = localStorage.getItem("modaled1");
                this.jwthas = localStorage.getItem("jwthas");

                  if(
                      (error.status == 401 && this.modaled != '1') || 
                      (error.status == 404 && this.modaled != '1') ||
                      (error.status == 401 && (this.modaled == '1' && this.modaled1 != '1')) || 
                      (error.status == 404 && (this.modaled == '1' && this.modaled1 != '1'))
                    ){

                    if(this.jwthas == '1'){
                      this.logout();
                    }else{
                      //console.log("show pop-up");
                      this.timerExpired();
                      localStorage.setItem("modaled","1");
                      localStorage.setItem("jwthas","1");
                    }
                    if(this.modaled == '1' && this.modaled1 != '1'){
                      localStorage.setItem("modaled","0");
                      localStorage.setItem("modaled1","1");
                    }



                  }
                return throwError(error);
            }));

           
        }else{
          return next.handle(req);
          /*
            return next.handle(req).pipe(
              map((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                     // //console.log('event--->>>', event);
                  }
                  return event;
              }),
              catchError((error: HttpErrorResponse) => {
                  this.modaled = localStorage.getItem("modaled");
                  this.jwthas = localStorage.getItem("jwthas");

                    if(error.status == 401 && this.modaled != '1'){
                      if(this.jwthas == '1'){
                        this.logout();
                      }else{
                        this.timerExpired();
                        localStorage.setItem("modaled","1");
                        localStorage.setItem("jwthas","1");
                      }
                    }
                 // //console.log(error.status);
                  return throwError(error);
              }));*/
        }
    }


    async timerExpired() {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Dok, are you still there?',
        animated: true,
        backdropDismiss: false,
        message:
          "You have been Idle for a little while",
        buttons: [
          {
            text: 'Log me out',
            // role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.logout();
            },
          },
          {
            text: 'Keep me in',
            handler: () => {
              let xdata : any;
              this.doctorService.refreshTokenV3().subscribe(
              (res: any) => {
                console.log(xdata);
                xdata=res;
              },(error) =>{
                this.logoutPopup();
              }, () => {
                if(xdata.isAuthenticated){
                localStorage.setItem("id_token",xdata.jwt);
                localStorage.setItem("modaled","0");
                window.location.reload();
              }else{
                this.logoutPopup();
              }
              });
              
            },
          },
        ],
      });
      await alert.present();
    }
    logout(){
      let dr_username = atob(localStorage.getItem('username'));
      this.revokeTokenV3.jwt = decodeURIComponent(this.functionsService.getcookie('refreshToken'));
      localStorage.setItem("torevoketoken","1");
      this.doctorService.revokeTokenV3(this.revokeTokenV3).subscribe(
        (res: any) => {
          //console.log(res);
        },(error) => {
          //this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
            this.userData$.next('');
            localStorage.removeItem('_cap_userDataKey');
            localStorage.removeItem('username');
            localStorage.clear();
            sessionStorage.clear();
            localStorage.setItem('hasloggedin', '1');
            localStorage.setItem('username',dr_username);
            this.router.navigate(['/login']);
          //});   
         },
         () => {

          this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
            this.userData$.next('');
            localStorage.removeItem('_cap_userDataKey');
            localStorage.removeItem('username');
            localStorage.clear();
            sessionStorage.clear();
            localStorage.setItem('username',dr_username);
            localStorage.setItem('hasloggedin', '1');
      
            this.router.navigate(['/login']);
          });
         }
      );
      
      
    }
    async logoutPopup(){
      let dr_username = atob(localStorage.getItem('username'));
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Your session has expired.',
        message: '',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.userData$.next('');
              localStorage.removeItem('_cap_userDataKey');
              localStorage.removeItem('username');
              localStorage.clear();
              sessionStorage.clear();
              localStorage.setItem('hasloggedin', '1');
              localStorage.setItem('username',dr_username);
              this.router.navigate(['/login']);
            },
          },
        ],
      });
      await alert.present();
    }






} 