import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppProfessionalFeePageRoutingModule } from './chh-app-professional-fee-routing.module';

import { ChhAppProfessionalFeePage } from './chh-app-professional-fee.page';
import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';
import { ChhAppTextAvatarModule } from "../../../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppProfessionalFeePageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule
  ],
  declarations: [ChhAppProfessionalFeePage]
})
export class ChhAppProfessionalFeePageModule {}
