import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientHistoryPatientDetailPage } from './patient-history-patient-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PatientHistoryPatientDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientHistoryPatientDetailPageRoutingModule {}
