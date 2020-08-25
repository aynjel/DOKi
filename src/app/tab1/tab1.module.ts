import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { ComponentsModule } from '../components/components.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';

import { ChhAppTextAvatarModule } from '../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module';

/* import {HospitalSelectorWithAllAndFilterPage} 
from '../components/hospital-selector-with-all-and-filter/hospital-selector-with-all-and-filter.page'; */

import {ChhAppHospitalSelectorWithAllAndFilterPage} 
from '../chh-web-components/chh-app-hospital-selector-with-all-and-filter/chh-app-hospital-selector-with-all-and-filter.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChhAppTextAvatarModule,
    Tab1PageRoutingModule,
    ComponentsModule,



  ],
  declarations: [Tab1Page,ChhAppHospitalSelectorWithAllAndFilterPage]
})
export class Tab1PageModule {}
