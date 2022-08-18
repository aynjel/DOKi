import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctordetailsPage } from './doctordetails.page';

const routes: Routes = [
  {
    path: '',
    component: DoctordetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctordetailsPageRoutingModule {}
