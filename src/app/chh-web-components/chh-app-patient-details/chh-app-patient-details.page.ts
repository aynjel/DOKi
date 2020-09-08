import { Component, OnInit, Input } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { PatientService } from "src/app/services/patient/patient.service";
import { FunctionsService } from "../../shared/functions/functions.service";

@Component({
  selector: "chh-app-patient-details",
  templateUrl: "./chh-app-patient-details.page.html",
  styleUrls: ["./chh-app-patient-details.page.scss"],
})
export class ChhAppPatientDetailsPage implements OnInit {
  segment = "chhc";
  cardData: any;
  receiveddata: any[] = [];
  public items: string[] = [];
  @Input() appt_id: any;
  constructor(
    public modalController: ModalController,
    private patientService: PatientService,
    public popover: PopoverController,
    public functionsService: FunctionsService
  ) {}

  ngOnInit() {
    this.patientService
      .getPatientDetails(this.appt_id)
      .subscribe((patientService: any) => {
        this.functionsService.logToConsole(patientService);
        this.functionsService.logToConsole(JSON.stringify(patientService));
        this.functionsService.logToConsole(JSON.parse(patientService));

        this.cardData = JSON.parse(patientService);
        //this.functionsService.logToConsole(JSON.parse(patientService));
        //this.cardData.push(patientService);
      });
  }

  /*  ClosePopover()
  {
   this.popover.dismiss();
  } */

  /*  async closeModal() {
    await this.modalController.dismiss();
  } */
}
