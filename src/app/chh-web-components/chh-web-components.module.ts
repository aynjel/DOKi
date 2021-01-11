import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChhAppLogoComponent } from "./chh-app-logo/chh-app-logo.component";
import { ChhAppSlidesComponent } from "./chh-app-slides/chh-app-slides.component";
import { ChhAppSliderPage } from "./chh-app-slider/chh-app-slider.page";
import { ChhAppStartComponent } from "./chh-app-start/chh-app-start.component";
import { ChhAppHospitalComponent } from "./chh-app-hospital/chh-app-hospital.component";
import { ChhAppTestChemistryComponent } from "./chh-app-test/chh-app-test-chemistry/chh-app-test-chemistry.component";

import { ChhAppDateSelectorComponent } from "./chh-app-date-selector/chh-app-date-selector.component";
import { IonicModule } from "@ionic/angular";
import { ChhAppLogoSmComponent } from "./chh-app-logo-sm/chh-app-logo-sm.component";
import { ChhAppHospitalSelectorWithAllComponent } from "./chh-app-hospital-selector-with-all/chh-app-hospital-selector-with-all.component";
import { ChhAppTextAvatarModule } from "./chh-app-text-avatar/chh-app-text-avatar.module";


@NgModule({
  declarations: [
    ChhAppLogoComponent,
    ChhAppSlidesComponent,
    ChhAppStartComponent,
    ChhAppHospitalComponent,
    ChhAppHospitalSelectorWithAllComponent,
    ChhAppDateSelectorComponent,
    ChhAppLogoSmComponent,
    ChhAppSliderPage,
    ChhAppTestChemistryComponent,
  ],
  exports: [
    ChhAppLogoComponent,
    ChhAppSlidesComponent,
    ChhAppStartComponent,
    ChhAppHospitalComponent,
    ChhAppHospitalSelectorWithAllComponent,
    ChhAppDateSelectorComponent,
    ChhAppLogoSmComponent,
    ChhAppSliderPage,
    ChhAppTestChemistryComponent,
  ],
  imports: [CommonModule, IonicModule, ChhAppTextAvatarModule],
})

export class ChhWebComponentsModule {}
