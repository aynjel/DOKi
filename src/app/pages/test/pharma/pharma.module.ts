import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PharmaPageRoutingModule } from './pharma-routing.module';

import { PharmaPage } from './pharma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PharmaPageRoutingModule
  ],
  declarations: [PharmaPage]
})
export class PharmaPageModule {}
