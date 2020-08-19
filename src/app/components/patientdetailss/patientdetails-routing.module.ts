import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientdetailsPage } from './patientdetails.page';

const routes: Routes = [
  {
    path: '',
    component: PatientdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientdetailsPageRoutingModule {}
