import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { InPatientDetailPageRoutingModule } from "./in-patient-detail-routing.module";
import { InPatientDetailPage } from "./in-patient-detail.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InPatientDetailPageRoutingModule,
  ],
  declarations: [InPatientDetailPage],
})

export class InpatientDetailPageModule {}
