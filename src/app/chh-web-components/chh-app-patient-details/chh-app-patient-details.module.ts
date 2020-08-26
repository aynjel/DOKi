import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChhAppPatientDetailsPageRoutingModule } from "../chh-app-patient-details/chh-app-patient-details-routing.module";
import { ChhAppPatientDetailsPage } from "../chh-app-patient-details/chh-app-patient-details.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppPatientDetailsPageRoutingModule,
  ],
  declarations: [],
})

export class ChhAppPatientDetailsPageModule {}
