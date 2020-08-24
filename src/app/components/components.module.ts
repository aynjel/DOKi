import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LogoComponent } from "./logo/logo.component";
import { SlidesComponent } from "./slides/slides.component";
import { SliderPage } from "./slider/slider.page";
import { StartComponent } from "./start/start.component";
import { HospitalComponent } from "./hospital/hospital.component";
import { ChhAppDateSelectorComponent } from "../chh-web-components/chh-app-date-selector/chh-app-date-selector.component";
import { IonicModule } from "@ionic/angular";
import { LogoSmComponent } from "./logo-sm/logo-sm.component";
import { HospitalSelectorWithAllComponent } from "./hospital-selector-with-all/hospital-selector-with-all.component";
import { TextAvatarModule } from "./text-avatar/text-avatar.module";

@NgModule({
  declarations: [
    LogoComponent,
    SlidesComponent,
    StartComponent,
    HospitalComponent,
    HospitalSelectorWithAllComponent,
    ChhAppDateSelectorComponent,
    LogoSmComponent,
    SliderPage,
  ],
  exports: [
    LogoComponent,
    SlidesComponent,
    StartComponent,
    HospitalComponent,
    HospitalSelectorWithAllComponent,
    ChhAppDateSelectorComponent,
    LogoSmComponent,
    SliderPage,
  ],
  imports: [CommonModule, IonicModule, TextAvatarModule],
})
export class ComponentsModule {}
