import { HttpEvent, HttpHandler, HttpInterceptor , HttpRequest,  HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { analyzeAndValidateNgModules, tokenName } from '@angular/compiler';
import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { DoctorService } from '../doctor/doctor.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _router: Router,
    public alertController: AlertController,
    public router: Router,
    private doctorService: DoctorService) { }
    modaled:any;
   intercept(req:HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
        const idToken = localStorage.getItem("id_token");
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
                    //console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                /*let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                this.errorDialogService.openDialog(data);*/
                //console.log('error 401 : token expired --> Jessie');
                this.modaled = localStorage.getItem("modaled");

                if(error.status == 401 && this.modaled != '1'){
                  this.timerExpired();
                  localStorage.setItem("modaled","1");
                }
                //console.log(error.status);
                return throwError(error);
            }));

           
        }else{
            return next.handle(req).pipe(
              map((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                     // console.log('event--->>>', event);
                  }
                  return event;
              }),
              catchError((error: HttpErrorResponse) => {
                  /*let data = {};
                  data = {
                      reason: error && error.error && error.error.reason ? error.error.reason : '',
                      status: error.status
                  };
                  this.errorDialogService.openDialog(data);*/
                  //console.log('error 401 : token expired --> Jessie');
                  this.modaled = localStorage.getItem("modaled");
                  if(error.status == 401 && this.modaled != '1'){
                    this.timerExpired();
                    localStorage.setItem("modaled","1");
                  }
                 // console.log(error.status);
                  return throwError(error);
              }));
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
              localStorage.setItem("modaled","0");
              localStorage.clear();
              localStorage.setItem('hasloggedin', '1');
              this.alertController.dismiss();
              this.router.navigate(['/login']).then(() => {
                window.location.reload();
              });
            },
          },
          {
            text: 'Keep me in',
            handler: () => {
              /*this.alertController.dismiss();*/
              //this.userIdle.stopTimer();
        
          
              this.doctorService.refreshTokenV3().subscribe((res: any) => {
                console.log(res);
              });
              localStorage.setItem("modaled","0");
            },
          },
        ],
      });
      await alert.present();
    }








} 