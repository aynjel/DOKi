import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DateselectorComponent } from './dateselector/dateselector.component';
import { IonicModule } from '@ionic/angular';
import {LogoSmComponent} from './logo-sm/logo-sm.component'
@NgModule({
  declarations: [
    LogoComponent,
    SlidesComponent,
    StartComponent,
    HospitalComponent,

    DateselectorComponent,
    LogoSmComponent
  ],
  exports:[
      LogoComponent,
      SlidesComponent,
      StartComponent,
      HospitalComponent,

      DateselectorComponent,
      LogoSmComponent
    ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
