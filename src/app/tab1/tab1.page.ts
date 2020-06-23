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

import {InpatientmodalPage} from '../components/inpatientmodal/inpatientmodal.page';
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
  testdata = '[{"admission_no":"IPC100177886","last_name":"BUZA",       "first_name":"PACIFICA","middle_name":"UY","admission_date":"2019-11-21T05:49:17.906","discharged_date":null,"room_no":"B-648","admission_status":"AC","site":"C",       "dr_code":"MD000175","Doctor_Status":"Co-Manage","doctor_prof_fee":null,       "is_posted":null,"remarks":null}]';

  inPatients:any;
  constructor(private authService:AuthService,
    private router:Router,
    private storageService:StorageService,
    private doctorService:DoctorService,
    private modalController:ModalController,
    private screensizeService: ScreensizeService
    ) {
      this.screensizeService.isDesktopView().subscribe(isDesktop => {
        if (this.isDesktop && !isDesktop) {window.location.reload();}this.isDesktop = isDesktop;
      });
    }
  ngOnInit() {
    this.testdata = JSON.parse(this.testdata);
    let data1= localStorage.getItem('dr_code');
    this.doctorService.getInPatient(data1).subscribe((res:any)=>{
      console.log(JSON.stringify(res));
      this.inPatients = res;
    });
    
    /*
    this.authService.userData$.subscribe((res:any) => {
        this.displayUserData = res;
        console.log(res.dr_code);
      });
console.log("--->"+localStorage.getItem('dr_code'));
      
    this.authService.userData$.subscribe((res:any) => {
      let doctorsDetails = JSON.parse(JSON.stringify(res));
      doctorsDetails.forEach(el => {
        this.drCode = el.dr_code;
        this.doctorService.getInPatient(this.drCode).subscribe((res:any)=>{
          this.inPatients = res;
        });
      });
    });
*/

    
  }



  async detail(data:any) {

    const modal = await this.modalController.create({
      component: InpatientmodalPage,
      componentProps: { 
       data: data
     }
    });
     return await modal.present();
   }
}
