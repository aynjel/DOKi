import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddappointmentsmodalPageRoutingModule } from './addappointmentsmodal-routing.module';

import { AddappointmentsmodalPage } from './addappointmentsmodal.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    AddappointmentsmodalPageRoutingModule
  ],
  declarations: [AddappointmentsmodalPage]
})
export class AddappointmentsmodalPageModule {}
