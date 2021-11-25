import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabCaseratesPage } from './tab-caserates.page';

const routes: Routes = [
  {
    path: '',
    component: TabCaseratesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabCaseratesPageRoutingModule {}
