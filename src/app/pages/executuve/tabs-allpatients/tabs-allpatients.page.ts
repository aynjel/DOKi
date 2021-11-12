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

@Component({
  selector: 'app-tabs-allpatients',
  templateUrl: './tabs-allpatients.page.html',
  styleUrls: ['./tabs-allpatients.page.scss'],
})
export class TabsAllpatientsPage implements OnInit {
  isDesktop: boolean;
  userData$ = new BehaviorSubject<any>([]);
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  public logindata: LoginResponseModelv3;
  listOfPatients:any;
  searchBar: any = "";
  listOfPatientsTemp: any;
  listOfPatientsTemp1: any;
  siteC = "Cebu";
  siteM = "Mandaue";
  segmentModel:any;
  refreshcounter:any;
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

    this.listOfPatients = [];
    this.refreshcounter=1;  

    
  }
  initialload(){
    let i=1;
    this.listOfPatientsTemp1=[];
    this.listOfPatientsTemp1 = this.listOfPatientsTemp;
    this.listOfPatientsTemp.forEach(element => {
      //console.log(element.status);
      if(i<=10){this.listOfPatients.push(element);}
      
      i++;
    }
    );
  }
  segmentChanged(){
    this.refreshcounter=1;  
    //console.log(da.detail.value);
    this.listOfPatientsTemp1 = [];
    if(this.segmentModel == 'ALL'){
      this.listOfPatients = [];
      this.initialload();
    }else{
      this.listOfPatients = [];
    
      let x =1;
      this.listOfPatientsTemp.forEach(element => {

 
          if (element.status == this.segmentModel) {
            console.log(element.status);
            
            if(x<=10){   
              this.listOfPatients.push(element);
            }   
            this.listOfPatientsTemp1.push(element);   
            x++;
          }
      






      });
      
       
    }
    


  }
  loadData(event) {
    this.refreshcounter++;
    // Using settimeout to simulate api call 
    setTimeout(() => {

      // load more data


      let i =1;
      console.log(this.listOfPatientsTemp1.length);
      this.listOfPatientsTemp1.forEach(element => {
        if(i > ((this.refreshcounter*10)-10) && i<= (this.refreshcounter*10)){
          this.listOfPatients.push(element);
          console.log(element.status);
          
        }
        i++;
      });


      //Hide Infinite List Loader on Complete
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
 
    }, 500);
  }
  filterList() {
    ////console.log('filterList');
    
    if(this.searchBar == ""){
      ////console.log('empty');
      
      this.listOfPatients = [];
      this.initialload();
    }else{
      this.listOfPatients = [];
      this.listOfPatientsTemp.forEach(element => {
     
        
        if (element.patientName.toLowerCase().includes(this.searchBar.toLowerCase())) {
            this.listOfPatients.push(element);
        }
      });
    }
  }
  settings(){
    this.router.navigate(['/executive/settings']);
  }
  doRefresh(event) {
    this.searchBar = "";
    setTimeout(() => {
      this.ngOnInit();
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
  }
  ionViewWillEnter() {


    this.logindata = <LoginResponseModelv3>this.authService.userData$.getValue();

    this.listOfPatients = [];
    this.executiveService.getPatients().subscribe(
      (res: any) => {   
        this.listOfPatientsTemp1 = this.listOfPatientsTemp = res;  
          ////console.log(res);
     
      },
      (error) => {},
      () => {
        this.filterList();
        this.segmentModel = 'ALL';
        this.segmentChanged();
      }
    );

  }
  checkInput(){
    this.doctorService.refreshTokenV3().subscribe((res: any) => {
      //////console.log(res);
    });
  }
  detail(data:any){

  }


}
