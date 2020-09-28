import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppPrivacyPolicyPageRoutingModule } from './chh-app-privacy-policy-routing.module';

import { ChhAppPrivacyPolicyPage } from './chh-app-privacy-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppPrivacyPolicyPageRoutingModule
  ],
  declarations: [ChhAppPrivacyPolicyPage]
})
export class ChhAppPrivacyPolicyPageModule {}
