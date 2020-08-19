import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HospitalSelectorWithAllAndFilterPageRoutingModule } from './hospital-selector-with-all-and-filter-routing.module';

import { HospitalSelectorWithAllAndFilterPage } from './hospital-selector-with-all-and-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HospitalSelectorWithAllAndFilterPageRoutingModule
  ],

})
export class HospitalSelectorWithAllAndFilterPageModule {}
