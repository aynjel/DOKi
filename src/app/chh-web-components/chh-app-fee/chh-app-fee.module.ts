import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppFeePageRoutingModule } from './chh-app-fee-routing.module';

import { ChhAppFeePage } from './chh-app-fee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppFeePageRoutingModule
  ],
  declarations: [ChhAppFeePage]
})
export class ChhAppFeePageModule {}
