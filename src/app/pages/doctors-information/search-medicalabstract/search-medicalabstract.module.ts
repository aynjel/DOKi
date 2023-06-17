import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SearchMedicalabstractPageRoutingModule } from "./search-medicalabstract-routing.module";

import { SearchMedicalabstractPage } from "./search-medicalabstract.page";
import { ChhWebComponentsModule } from "src/app/chh-web-components/chh-web-components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMedicalabstractPageRoutingModule,
    ChhWebComponentsModule,
  ],
  declarations: [SearchMedicalabstractPage],
})
export class SearchMedicalabstractPageModule {}
