import { Component, OnInit, Input } from '@angular/core';
import { FunctionsService } from "../../../shared/functions/functions.service";
import { ModalController, AlertController, PopoverController } from "@ionic/angular";
import { PatientService } from 'src/app/services/patient/patient.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
@Component({
  selector: 'app-chh-app-base',
  templateUrl: './chh-app-base.page.html',
  styleUrls: ['./chh-app-base.page.scss'],
})
export class ChhAppBasePage implements OnInit {
  @Input() ExamDetails: any;
  @Input() Site: any;
  isDesktop: boolean;
  Header:any;
  chemDetails:any;
  hospitalSite:any; 
  constructor(
    public modalController: ModalController,
    public _modalController: ModalController,
    public popover: PopoverController,
    private doctorService: DoctorService,
    public alertController: AlertController,
    protected $gaService: GoogleAnalyticsService,
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
    console.log('---------------------------');
    console.log(this.ExamDetails);
    console.log('---------------------------');
    
    if(this.Site == 'C'){
      this.hospitalSite = "Chong Hua Hospital";
    }else{
      this.hospitalSite = "Chong Hua Hospital Mandaue";
    }
    if(this.ExamDetails.Exam == 'Chemistry'){
      this.patientService.getChemHeader(this.ExamDetails.Request_No).subscribe(
        (res: any) => {
          let x = JSON.stringify(res)
          this.Header = JSON.parse(x);
        },(error) => {},
        () => {}
      );
    }else if(this.ExamDetails.Exam == 'Serology'){
      this.patientService.getSeroHeader(this.ExamDetails.Patient_No,this.ExamDetails.Request_No).subscribe(
        (res: any) => {
          let x = JSON.stringify(res)
          this.Header = JSON.parse(x);
        },(error) => {},
        () => {}
      );
    }else if(this.ExamDetails.Exam == 'Fecalysis'){
      console.log(this.ExamDetails.Patient_No+' \ '+this.ExamDetails.Request_No);
      
      this.patientService.getFecalHeader(this.ExamDetails.Patient_No,this.ExamDetails.Request_No).subscribe(
        (res: any) => {
          let x = JSON.stringify(res)
          this.Header = JSON.parse(x);
        },(error) => {},
        () => {}
      );
    }



  }

}
