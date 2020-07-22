import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospitalSelectorWithAllAndFilterPage } from './hospital-selector-with-all-and-filter.page';

const routes: Routes = [
  {
    path: '',
    component: HospitalSelectorWithAllAndFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalSelectorWithAllAndFilterPageRoutingModule {}
