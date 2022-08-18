import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsDashboardPage } from './tabs-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: TabsDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsDashboardPageRoutingModule {}
