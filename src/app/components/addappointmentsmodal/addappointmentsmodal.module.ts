import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddappointmentsmodalPageRoutingModule } from './addappointmentsmodal-routing.module';

import { AddappointmentsmodalPage } from './addappointmentsmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddappointmentsmodalPageRoutingModule
  ],
  declarations: [AddappointmentsmodalPage]
})
export class AddappointmentsmodalPageModule {}
