import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAppointmentsmodalPageRoutingModule } from './chh-app-add-appointments-modal-routing.module';

import { AddAppointmentsModalPage } from './chh-app-add-appointments-modal.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    AddAppointmentsmodalPageRoutingModule
  ],
  declarations: [AddAppointmentsModalPage]
})
export class AddAppointmentsModalPageModule {}
