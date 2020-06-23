import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InpatientmodalPageRoutingModule } from './inpatientmodal-routing.module';

import { InpatientmodalPage } from './inpatientmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InpatientmodalPageRoutingModule
  ],
  declarations: [InpatientmodalPage]
})
export class InpatientmodalPageModule {}
