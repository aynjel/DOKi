import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '../../../shared/constants';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import {UserSettingsModelv3,LoginResponseModelv3} from 'src/app/models/doctor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import { throwIfEmpty } from 'rxjs/operators';
import { runInThisContext } from 'vm';
@Component({
  selector: 'app-tabs-dashboard',
  templateUrl: './tabs-dashboard.page.html',
  styleUrls: ['./tabs-dashboard.page.scss'],
})
export class TabsDashboardPage implements OnInit {
  isDesktop: boolean;
  userData$ = new BehaviorSubject<any>([]);
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  public logindata: LoginResponseModelv3;
  userName:any;
  totalAdmissions:any;
  totalAdmissionsC:any;
  totalAdmissionsM:any;
  totalAdmissionstoday:any;
  totalAdmissionstodayC:any;
  totalAdmissionstodayM:any;
  forDischargeC:any;
  forDischargeM:any;
  forDischarge:any;
  forDischargeV3:any;
  tTC = 'C';
  tTM = 'M';
  totalAdmissionsV3:any;
  totalAdmissionsTodayV3:any;
  constructor(    private storageService: StorageService,
    private router: Router,
    public constants: Constants,
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private executiveService: ExecutiveService
    ) { 

      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          // Reload because our routing is out of place
          //window.location.reload();
        }
  
        this.isDesktop = isDesktop;
      });

    }


  ngOnInit() {

      

    
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
  }
  ionViewWillEnter() {

    this.totalAdmissions = 0;
    this.totalAdmissionsC = 0;
    this.totalAdmissionsM = 0;
    this.totalAdmissionstoday = 0;
    this.totalAdmissionstodayC = 0;
    this.totalAdmissionstodayM = 0;  
    this.forDischargeC = 0;
    this.forDischargeM = 0; 
    this.forDischarge = 0; 
    this.logindata = <LoginResponseModelv3>this.authService.userData$.getValue();

    //console.log(this.logindata);
    this.userName = this.logindata.userName;
    this.executiveService.totalAdmissionsV3().subscribe(
      (res: any) => {     
          //console.log(res);
          this.totalAdmissionsV3 = res;
      },
      (error) => {},
      () => {
        this.totalAdmissionsV3.forEach(element => {
          this.totalAdmissions = this.totalAdmissions +element.totalAdmissions;
          //console.log(this.totalAdmissions);
          
          if(element.site == 'C'){
              this.totalAdmissionsC = element.totalAdmissions;
          }else if(element.site == 'M'){
            this.totalAdmissionsM = element.totalAdmissions;
          }
        });
      }
    );

    this.totalAdmissionstoday = 0;
    this.executiveService.totalAdmissionsTodayV3().subscribe(
      (res: any) => {     
        //console.log(res);
        this.totalAdmissionsTodayV3 = res;
    },
    (error) => {},
    () => {
      
      this.totalAdmissionsTodayV3.forEach(element => {
        //console.log(element.totalAdmissions);
        this.totalAdmissionstoday = this.totalAdmissionstoday +element.totalNewAdmissions;
        if(element.site == 'C'){
            this.totalAdmissionstodayC = element.totalNewAdmissions;
        }else if(element.site == 'M'){
          this.totalAdmissionstodayM = element.totalNewAdmissions;
        }
      });
    }

    );


    this.executiveService.forDischargeV3().subscribe(
      (res: any) => {     
        //console.log(res);
        this.forDischargeV3 = res;
    },
    (error) => {},
    () => {
      this.forDischargeV3.forEach(element => {

        this.forDischarge = this.forDischarge +element.totalForDischarge;
        if(element.site == 'C'){
            this.forDischargeC = element.totalForDischarge;
        }else if(element.site == 'M'){
          this.forDischargeM = element.totalForDischarge;
        }
      });
    }

    );
  }

  checkInput(){
    this.doctorService.refreshTokenV3().subscribe((res: any) => {
      //console.log(res);
    });
  }
}
