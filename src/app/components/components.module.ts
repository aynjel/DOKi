import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';
import { HospitalComponent } from './hospital/hospital.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DateselectorComponent } from './dateselector/dateselector.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [LogoComponent,SlidesComponent,StartComponent,HospitalComponent,HospitalsComponent,DateselectorComponent],
  exports:[LogoComponent,SlidesComponent,StartComponent,HospitalComponent,HospitalsComponent,DateselectorComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
