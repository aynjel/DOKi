import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppProfessionalFeeSummaryPageRoutingModule } from './chh-app-professional-fee-summary-routing.module';

import { ChhAppProfessionalFeeSummaryPage } from './chh-app-professional-fee-summary.page';
import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';
import { ChhAppTextAvatarModule } from "../../../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppProfessionalFeeSummaryPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule
  ],
  declarations: [ChhAppProfessionalFeeSummaryPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChhAppProfessionalFeeSummaryPageModule {}
