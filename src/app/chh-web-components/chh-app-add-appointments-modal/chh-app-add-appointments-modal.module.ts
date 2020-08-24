import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppAddAppointmentsmodalPageRoutingModule } from '../chh-app-add-appointments-modal/chh-app-add-appointments-modal-routing.module';

import { ChhAppAddAppointmentsModalPage } from './chh-app-add-appointments-modal.page';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    ChhAppAddAppointmentsmodalPageRoutingModule
  ],
  declarations: [ChhAppAddAppointmentsModalPage]
})
export class ChhAppAddAppointmentsModalPageModule {}
