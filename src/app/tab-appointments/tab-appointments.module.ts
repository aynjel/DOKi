import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabAppointmentsPage } from './tab-appointments.page';
import { ChhAppTextAvatarModule } from '../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module';

import { TabAppointmentsPageRoutingModule } from './tab-appointments-routing.module';
import { ChhWebComponentsModule } from '../chh-web-components/chh-web-components.module';
import { ChhAppPatientDetailsPage } from '../chh-web-components/chh-app-patient-details/chh-app-patient-details.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabAppointmentsPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule
  ],
  declarations: [TabAppointmentsPage,ChhAppPatientDetailsPage],
  entryComponents:[ChhAppPatientDetailsPage],
  providers:[]
})
export class TabAppointmentsPageModule {}
