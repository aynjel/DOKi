import { Component, OnInit, Input} from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'chh-app-patient-details',
  templateUrl: './chh-app-patient-details.page.html',
  styleUrls: ['./chh-app-patient-details.page.scss'],
})
export class ChhAppPatientDetailsPage implements OnInit {
  segment = "chhc";
   cardData: any;
 receiveddata:any[] = [];
  public items:string[]=[];
  @Input() appt_id: any;
  constructor(private modalController: ModalController, private patientService:PatientService, private popover:PopoverController) { }
  
  ngOnInit() {



    this.patientService.getPatientDetails(this.appt_id).subscribe(
      (patientService:any)=>{
        console.log(patientService);
        console.log(JSON.stringify(patientService));
        console.log(JSON.parse(patientService));


        this.cardData = JSON.parse(patientService);
        //console.log(JSON.parse(patientService));
        //this.cardData.push(patientService);
        
      }
    );



  }

  ClosePopover()
  {

   this.popover.dismiss();
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

}
