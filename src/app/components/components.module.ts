import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChhAppLogoComponent } from "../chh-web-components/chh-app-logo/chh-app-logo.component";
import { SlidesComponent } from "./slides/slides.component";
import { SliderPage } from "./slider/slider.page";
import { StartComponent } from "./start/start.component";
//import { ChhAppHospitalComponent } from "./hospital/hospital.component";
import { ChhAppHospitalComponent } from "../chh-web-components/chh-app-hospital/chh-app-hospital.component";

import { ChhAppDateSelectorComponent } from "../chh-web-components/chh-app-date-selector/chh-app-date-selector.component";
import { IonicModule } from "@ionic/angular";
import { LogoSmComponent } from "./logo-sm/logo-sm.component";
//import { HospitalSelectorWithAllComponent } from "./hospital-selector-with-all/hospital-selector-with-all.component";
import { ChhAppHospitalSelectorWithAllComponent } from "../chh-web-components/chh-app-hospital-selector-with-all/chh-app-hospital-selector-with-all.component";
import { TextAvatarModule } from "./text-avatar/text-avatar.module";

@NgModule({
  declarations: [
    ChhAppLogoComponent,
    SlidesComponent,
    StartComponent,
    ChhAppHospitalComponent,
    ChhAppHospitalSelectorWithAllComponent,
    ChhAppDateSelectorComponent,
    LogoSmComponent,
    SliderPage,
  ],
  exports: [
    ChhAppLogoComponent,
    SlidesComponent,
    StartComponent,
    ChhAppHospitalComponent,
    ChhAppHospitalSelectorWithAllComponent,
    ChhAppDateSelectorComponent,
    LogoSmComponent,
    SliderPage,
  ],
  imports: [CommonModule, IonicModule, TextAvatarModule],
})
export class ComponentsModule {}
