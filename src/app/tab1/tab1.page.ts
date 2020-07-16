import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { DoctorService } from '../services/doctor.service';
import { ModalController } from '@ionic/angular';
import { PatientdetailsPage } from '../components/patientdetailss/patientdetails.page';
import { ScreensizeService } from '../services/screensize.service';
import { PopoverController } from '@ionic/angular';  
import {InpatientmodalPage} from '../components/inpatientmodal/inpatientmodal.page';
import { timeStamp } from 'console';
import {DoctorInfoGlobal} from '../common/doctorinfo-global';
import {LoginData} from '../models/logindata.model';
import {InpatientData} from '../models/inpatient.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public logindata:LoginData;
  public inPatientData:InpatientData;
  isDesktop: boolean;
  dr_code = "";
  inPatients:any;
  inPatientsDraft:any;
  inPatientsDraft1:any;
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
    }
  ngOnInit() {

  }
  //filter : check searchbar if not empty and check location
  filterList(){
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
      this.inPatients=[];
      this.inPatientsDraft1.forEach(e => {
        this.name = e.last_name +', '+e.first_name+' '+e.middle_name+' '+e.first_name+' '+e.middle_name+' '+e.last_name;
          if(this.name.toLowerCase().includes(this.searchBar)){
            this.inPatients.push(e);
          }
      });
    }
  }
  //Fired when the component routing to is about to animate into view.
  ionViewWillEnter(){
    if(!this.dr_code){
      this.logindata = <LoginData>this.authService.userData$.getValue();
      this.dr_code = this.logindata[0].dr_code;
      this.callPatient(this.site);
    }
  }
  //Get using Doctors API
  callPatient(data:any){
    this.doctorService.getInPatient(this.dr_code).subscribe(
      (res:any)=>{
        console.log(res)
        this.inPatientsDraft = res;
        this.filterList();
    }
    );
  }
  //swipe down refresh
  doRefresh(event) {
    setTimeout(() => {
      this.callPatient(this.site);
      //location.reload();
      event.target.complete();
    }, 1000);
  }

  async detail(data:any) {
    const modal = await this.modalController.create({
      component: InpatientmodalPage,
      componentProps: {data: data,},
      cssClass: 'my-custom-modal-inpatient-css',
    });
     modal.present();
     return await modal.onDidDismiss().then((data: any) => {this.callPatient(this.site);});
   }
   //location is changed
   locationAction(data:any){
      this.site = data;
      this.filterList();
   }
}
