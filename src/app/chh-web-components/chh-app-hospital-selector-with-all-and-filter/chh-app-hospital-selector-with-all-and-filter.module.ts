import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppHospitalSelectorWithAllAndFilterPageRoutingModule } from './chh-app-hospital-selector-with-all-and-filter-routing.module';

import { ChhAppHospitalSelectorWithAllAndFilterPage } from './chh-app-hospital-selector-with-all-and-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppHospitalSelectorWithAllAndFilterPageRoutingModule
  ],

})
export class ChhAppHospitalSelectorWithAllAndFilterPageModule {}
