import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabInPatientsPage } from './tab-in-patients.page';
import { ChhWebComponentsModule } from '../chh-web-components/chh-web-components.module';
import { TabInPatientsPageRoutingModule } from './tab-in-patients-routing.module';
import { ChhAppTextAvatarModule } from '../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module';
import {ChhAppHospitalSelectorWithAllAndFilterPage} 
from '../chh-web-components/chh-app-hospital-selector-with-all-and-filter/chh-app-hospital-selector-with-all-and-filter.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChhAppTextAvatarModule,
    TabInPatientsPageRoutingModule,
    ChhWebComponentsModule,
  ],
  declarations: [TabInPatientsPage,ChhAppHospitalSelectorWithAllAndFilterPage]
})

export class TabInPatientsPageModule {}