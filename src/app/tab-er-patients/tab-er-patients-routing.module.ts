import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabErPatientsPage } from './tab-er-patients.page';

const routes: Routes = [
  {
    path: '',
    component: TabErPatientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabErPatientsPageRoutingModule {}
