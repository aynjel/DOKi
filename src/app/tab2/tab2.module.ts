import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { TextAvatarModule } from '../components/text-avatar/text-avatar.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ChhAppPatientDetailsPage } from '../chh-web-components/chh-app-patient-details/chh-app-patient-details.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    ComponentsModule,
    TextAvatarModule
  ],
  declarations: [Tab2Page,ChhAppPatientDetailsPage],
  entryComponents:[ChhAppPatientDetailsPage],
  providers:[]
})
export class Tab2PageModule {}
