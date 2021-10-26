import { Component, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { DoctorService } from '../services/doctor/doctor.service';
import {
  ModalController,
  AlertController,
  NavController,
} from '@ionic/angular';
import { ChhAppPatientDetailsPage } from '../chh-web-components/chh-app-patient-details/chh-app-patient-details.page';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';
import { PopoverController } from '@ionic/angular';
import { ChhAppInPatientModalPage } from '../chh-web-components/chh-app-in-patient-modal/chh-app-in-patient-modal.page';
import { timeStamp } from 'console';
import { DoctorInfoGlobal } from '../shared/doctor-info-global';
import { LoginData } from '../models/login-data.model';
import { InPatientData } from '../models/in-patient.model';
import { Location } from '@angular/common';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { FunctionsService } from '../shared/functions/functions.service';
import { Constants } from '../shared/constants';
import { Messages } from '../shared/messages';
import { PatientService } from '../services/patient/patient.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { OnInit } from '@angular/core';
import { ChhAppChangePassPage } from '../chh-web-components/chh-app-change-pass/chh-app-change-pass.page';

import { ChhAppNewsfeedComponent } from '../chh-web-components/chh-app-newsfeed/chh-app-newsfeed.component';


@Component({
  selector: 'app-tab-news-feed',
  templateUrl: './tab-news-feed.page.html',
  styleUrls: ['./tab-news-feed.page.scss'],
})
export class TabNewsFeedPage implements OnInit {
  isDesktop: boolean;
  
  newsfeed:any;
  constructor(

    private screensizeService: ScreenSizeService,
    private modalController: ModalController,
    private doctorService: DoctorService

  ) {
    console.log('In-patient : Constructor');
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
    this.addMoreItems();  
  }
  items = [];  
  numTimesLeft = 5;  
  ngOnInit() {


    this.doctorService.getNewsFeedV3().subscribe(
      (res: any) => {
        this.newsfeed = res;
      },
      (error) => {},
      () => {

      }
    );


  }




  loadData(event) {  
    setTimeout(() => {  
      console.log('Done');  
      this.addMoreItems();  
      //this.numTimesLeft -= 1;  
      event.target.complete();  
    }, 500);  
  }  
  addMoreItems() {  
    for (let i = 0; i < 10; i++) {  
      this.items.push(i);  
    }  
  }  
  async showaddmodal1(x) {
  
    
    var data = x;
    const modal = await this.modalController.create({
      component: ChhAppNewsfeedComponent,

      componentProps: {
        backdropDismiss: true,
        data: data
      },
    });
    modal.onDidDismiss().then((data) => {

    });
    return await modal.present();
  }
  doRefresh(event) {
    setTimeout(() => {

      
      this.doctorService.getNewsFeedV3().subscribe(
        (res: any) => {
          this.newsfeed = res;
        },
        (error) => {},
        () => {
  
        }
      );
      //location.reload();
      event.target.complete();
    }, 1000);
  }
}
