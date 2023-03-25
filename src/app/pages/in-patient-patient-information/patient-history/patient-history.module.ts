import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PatientHistoryPageRoutingModule } from "./patient-history-routing.module";

import { PatientHistoryPage } from "./patient-history.page";
import { ChhWebComponentsModule } from "src/app/chh-web-components/chh-web-components.module";
import { ChhAppHospitalSelectorWithAllAndFilterPageModule } from "src/app/chh-web-components/chh-app-hospital-selector-with-all-and-filter/chh-app-hospital-selector-with-all-and-filter.module";
import { ChhAppTextAvatarModule } from "src/app/chh-web-components/chh-app-text-avatar";
import { ChhAppHospitalSelectorWithAllAndFilterPage } from "src/app/chh-web-components/chh-app-hospital-selector-with-all-and-filter/chh-app-hospital-selector-with-all-and-filter.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientHistoryPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule,
  ],
  declarations: [PatientHistoryPage],
})
export class PatientHistoryPageModule {}
