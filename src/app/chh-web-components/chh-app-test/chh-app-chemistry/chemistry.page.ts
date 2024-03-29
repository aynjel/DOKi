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
  selector: 'app-chemistry',
  templateUrl: './chemistry.page.html',
  styleUrls: ['./chemistry.page.scss'],
})
export class ChemistryPage implements OnInit {
  @Input() ExamDetails: any;
  @Input() Site: any;
  isDesktop: boolean;
  chemHeader: any;
  chemDetails: any;
  hospitalSite: any;
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

  ngOnInit() {
    if (this.Site == 'C') {
      this.hospitalSite = 'Chong Hua Hospital';
    } else {
      this.hospitalSite = 'Chong Hua Hospital Mandaue';
    }

    //console.log(this.ExamDetails);

    this.patientService
      .getCebuChemHeader(this.ExamDetails.Request_No)
      .subscribe(
        (res: any) => {
          let x = JSON.stringify(res);
          this.chemHeader = JSON.parse(x);
        },
        (error) => {},
        () => {}
      );

    this.patientService
      .getCebuChemDetails(this.ExamDetails.Request_No)
      .subscribe(
        (res: any) => {
          let x = JSON.stringify(res);
          this.chemDetails = JSON.parse(x);
        },
        (error) => {},
        () => {}
      );
  }
}
