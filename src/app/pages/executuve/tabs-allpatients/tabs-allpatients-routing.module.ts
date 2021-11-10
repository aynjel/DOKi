import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsAllpatientsPage } from './tabs-allpatients.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAllpatientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAllpatientsPageRoutingModule {}
