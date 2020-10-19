import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppTermsAndConditionsPageRoutingModule } from './chh-app-terms-and-conditions-routing.module';

import { ChhAppTermsAndConditionsPage } from './chh-app-terms-and-conditions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppTermsAndConditionsPageRoutingModule
  ],
  declarations: [ChhAppTermsAndConditionsPage]
})
export class ChhAppTermsAndConditionsPageModule {}
