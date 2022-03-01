import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsDoctorsdirectoryPage } from './tabs-doctorsdirectory.page';

const routes: Routes = [
  {
    path: '',
    component: TabsDoctorsdirectoryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsDoctorsdirectoryPageRoutingModule {}
