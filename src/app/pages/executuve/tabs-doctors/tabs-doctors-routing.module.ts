import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsDoctorsPage } from './tabs-doctors.page';

const routes: Routes = [
  {
    path: '',
    component: TabsDoctorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsDoctorsPageRoutingModule {}
