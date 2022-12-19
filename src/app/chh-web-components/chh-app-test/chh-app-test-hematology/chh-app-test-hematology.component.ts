import { Component, OnInit, Input } from '@angular/core';
import { FunctionsService } from '../../../shared/functions/functions.service';
import {
  ModalController,
  AlertController,
  PopoverController,
} from '@ionic/angular';
import { PatientService } from 'src/app/services/patient/patient.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
//import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
@Component({
  selector: 'app-chh-app-test-hematology',
  templateUrl: './chh-app-test-hematology.component.html',
  styleUrls: ['./chh-app-test-hematology.component.scss'],
})
export class ChhAppTestHematologyComponent implements OnInit {
  @Input() examDetails: any;
  @Input() site: any;
  isDesktop: boolean;
  resultDetail: any;
  resultDetails: any;
  constructor(
    public modalController: ModalController,
    public _modalController: ModalController,
    public popover: PopoverController,
    private doctorService: DoctorService,
    public alertController: AlertController,
    //protected $gaService: GoogleAnalyticsService,
    private authService: AuthService,
    public functionsService: FunctionsService,
    private patientService: PatientService,
    private screensizeService: ScreenSizeService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {}
}
