import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientDetailPageRoutingModule } from './patient-detail-routing.module';

import { PatientDetailPage } from './patient-detail.page';
import { ChhWebComponentsModule } from '../../../../chh-web-components/chh-web-components.module';
import { ChhAppTextAvatarModule } from "../../../../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientDetailPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule
  ],
  declarations: [PatientDetailPage]
})
export class PatientDetailPageModule {}
