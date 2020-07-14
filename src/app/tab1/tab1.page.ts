import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import {Account} from '../models/account';

import { DoctorService } from '../services/doctor.service';
import { ModalController } from '@ionic/angular';
import { PatientdetailsPage } from '../components/patientdetailss/patientdetails.page';
import { ScreensizeService } from '../services/screensize.service';
import { PopoverController } from '@ionic/angular';  
import {InpatientmodalPage} from '../components/inpatientmodal/inpatientmodal.page';
import { timeStamp } from 'console';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isDesktop: boolean;
  segment = "all";
  displayUserData : any;
  drCode = "";
  inPatients:any;
  inPatientsDraft:any;
  inPatientsDraft1:any;
  items: any;
  result: JSON;
  allData: any;
  site:any = 'A';
  searchBar:any;
  name:any;

  constructor(private authService:AuthService,
    private router:Router,
    private storageService:StorageService,
    private doctorService:DoctorService,
    private modalController:ModalController,
    private screensizeService: ScreensizeService,
    private popover:PopoverController
    ) {
      this.screensizeService.isDesktopView().subscribe(isDesktop => {
        if (this.isDesktop && !isDesktop) {window.location.reload();}this.isDesktop = isDesktop;
      });
      this.drCode = localStorage.getItem('dr_code');

    }
  ngOnInit() {

    //this.callPatient();

    /*
    this.authService.userData$.subscribe((res:any) => {
      console.log(res);
        this.displayUserData = res;
      });

          this.authService.userData$.subscribe((res:any) => {
      console.log("res -> "+res);
      let doctorsDetails = JSON.parse(JSON.stringify(res));
      res.forEach(el => {
        console.log(this.drCode);
        this.drCode = el.dr_code;
        this.doctorService.getInPatient(this.drCode).subscribe((res:any)=>{
          this.inPatients = res;
        });
      });    });

*/

    
  }
  filterList(){
      console.log(this.site);

    if(this.site == 'A'){
      this.inPatients=[];
      this.inPatients = this.inPatientsDraft;
    }else{
      this.inPatients=[];
      this.inPatientsDraft.forEach(element => {
        if(this.site == "C"){if(element.site == "C"){this.inPatients.push(element);}}
        else if(this.site == "M"){if(element.site == "M"){this.inPatients.push(element);}}
      });
    }
  
    this.inPatientsDraft1 = this.inPatients;
    if(this.searchBar){
      console.log("if searchbar");
      this.inPatients=[];
      this.inPatientsDraft1.forEach(e => {
        this.name = e.last_name +', '+e.first_name+' '+e.middle_name+' '+e.first_name+' '+e.middle_name+' '+e.last_name;
          if(this.name.toLowerCase().includes(this.searchBar)){
            this.inPatients.push(e);
          }
      });



    }else{
     // console.log("else searchbar");
      //this.inPatients = this.inPatientsDraft;
    }

  }
  ionViewWillEnter(){
    this.callPatient(this.site);
  }

  callPatient(data:any){
    this.doctorService.getInPatient(this.drCode).subscribe(
      (res:any)=>{
        console.log(JSON.stringify(res));
        this.inPatientsDraft = res;

        //this.inPatients = res;
        this.filterList();

/*
        if(data == "A"){this.inPatients = this.inPatientsDraft;}
        else {
          this.inPatients=[];
          this.inPatientsDraft.forEach(element => {
            console.log("name:  "+this.name);
            if(data == "C"){if(element.site == "C"){this.inPatients.push(element);}}
            else if(data == "M"){if(element.site == "M"){this.inPatients.push(element);}}
          });
        }
*/


      
    },error => {
      console.log("error : "+error);

    },() => {
      console.log("Completed");
    }
    
    
    
    );
  }

  doRefresh(event) {
    setTimeout(() => {
      this.callPatient(this.site);
      //location.reload();
      event.target.complete();
    }, 1000);
  }

  async detail(data:any) {

    console.log("isDesktop : " + this.isDesktop);
    const modal = await this.modalController.create({
      component: InpatientmodalPage,
      componentProps: {data: data,},
      cssClass: 'my-custom-modal-inpatient-css',
    });
     modal.present();
     return await modal.onDidDismiss().then((data: any) => {this.callPatient(this.site);});
   }
   locationAction(data:any){
      this.site = data;
      //this.callPatient(this.site);
      
   /*
      if(data != "A"){
        console.log(data);
        this.inPatientsDraft1 = this.inPatientsDraft;
        this.inPatients=[];
        this.inPatientsDraft1.forEach(element => {
          if(data == "C"){if(element.site == "C"){this.inPatients.push(element);}}
          else if(data == "M"){if(element.site == "M"){this.inPatients.push(element);}}
        });
      }else{
        this.inPatients = this.inPatientsDraft;
      }
*/
      this.filterList();

   }
}
