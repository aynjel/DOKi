import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
})

export class ModalpagePage implements OnInit {
  segment = "chhc";
  receiveddata = [];
  public items:string[]=[];
  @Input() appt_id: any;
  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  constructor(private modalController: ModalController, private patientService : PatientService) { }

  ngOnInit() {



    this.patientService.getPatientDetails(this.appt_id).subscribe(
      (patientService:any)=>{
          this.receiveddata = patientService;
      }
    );

    setTimeout(() => {
      this.items = ['One','Two'];
    }, 1500)


  }

}
