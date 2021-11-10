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
  selector: 'app-tabs-doctors',
  templateUrl: './tabs-doctors.page.html',
  styleUrls: ['./tabs-doctors.page.scss'],
})
export class TabsDoctorsPage implements OnInit {
  isDesktop: boolean;
  userData$ = new BehaviorSubject<any>([]);
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  public logindata: LoginResponseModelv3;
  listOfDoctors:any;
  searchBar: any = "";
  listOfDoctorsTemp: any;
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
  filterList() {
    this.listOfDoctors = [];
    console.log(this.searchBar);
    this.listOfDoctorsTemp.forEach(element => {
 
      
      if (element.doctorName.toLowerCase().includes(this.searchBar.toLowerCase())) {
        this.listOfDoctors.push(element);
      }

      
    });
    if(this.searchBar == ""){
      this.listOfDoctors = this.listOfDoctorsTemp;
    }
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
  }
  ionViewWillEnter() {


    this.logindata = <LoginResponseModelv3>this.authService.userData$.getValue();

    
    this.executiveService.getDoctors().subscribe(
      (res: any) => {   
        this.listOfDoctorsTemp = res;  
          console.log(res);
     
      },
      (error) => {},
      () => {
        this.filterList();
      }
    );

  }
  checkInput(){
    this.doctorService.refreshTokenV3().subscribe((res: any) => {
      //console.log(res);
    });
  }
  detail(data:any){

  }

}
