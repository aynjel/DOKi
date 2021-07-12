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

@Component({
  selector: 'app-tab-news-feed',
  templateUrl: './tab-news-feed.page.html',
  styleUrls: ['./tab-news-feed.page.scss'],
})
export class TabNewsFeedPage implements OnInit {
  isDesktop: boolean;
  constructor(

    private screensizeService: ScreenSizeService

  ) {
    console.log('In-patient : Constructor');
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
    
  }

  ngOnInit() {
  }

}
