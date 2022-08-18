import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsHistoricalPage } from './tabs-historical.page';

const routes: Routes = [
  {
    path: '',
    component: TabsHistoricalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsHistoricalPageRoutingModule {}
