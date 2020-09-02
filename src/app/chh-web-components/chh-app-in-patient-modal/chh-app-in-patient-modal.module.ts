import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChhAppInPatientModalPageRoutingModule } from "../chh-app-in-patient-modal/chh-app-in-patient-modal-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { ChhAppInPatientModalPage } from "./chh-app-in-patient-modal.page";
import { ChhAppTextAvatarModule } from "../chh-app-text-avatar/chh-app-text-avatar.module";

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    ChhAppTextAvatarModule,
    BrowserModule,
    ChhAppInPatientModalPageRoutingModule,
  ],
  declarations: [ChhAppInPatientModalPage],
})

export class ChhAppInPatientModalPageModule {}
