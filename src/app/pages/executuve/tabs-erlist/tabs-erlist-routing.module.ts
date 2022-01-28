import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsErlistPage } from './tabs-erlist.page';

const routes: Routes = [
  {
    path: '',
    component: TabsErlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsErlistPageRoutingModule {}
