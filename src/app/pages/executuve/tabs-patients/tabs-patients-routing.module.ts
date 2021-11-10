import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPatientsPage } from './tabs-patients.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPatientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPatientsPageRoutingModule {}
