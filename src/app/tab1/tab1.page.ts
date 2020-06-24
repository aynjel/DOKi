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

  items: any;
result: JSON;
allData: any;
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
      console.log("construct got drcode -> "+this.drCode);

    }
  ngOnInit() {















    this.doctorService.getInPatient(this.drCode).subscribe((res:any)=>{
      console.log("Get Inpatient Success");
      //console.log(JSON.stringify(res));
      this.inPatients = res;
    });
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
      });    });*/



    
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
