import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ChhAppTextAvatarModule } from '../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ChhWebComponentsModule } from '../chh-web-components/chh-web-components.module';
import { ChhAppPatientDetailsPage } from '../chh-web-components/chh-app-patient-details/chh-app-patient-details.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule
  ],
  declarations: [Tab2Page,ChhAppPatientDetailsPage],
  entryComponents:[ChhAppPatientDetailsPage],
  providers:[]
})
export class Tab2PageModule {}