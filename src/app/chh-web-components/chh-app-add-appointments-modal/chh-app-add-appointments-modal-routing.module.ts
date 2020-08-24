import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAppointmentsModalPage } from './chh-app-add-appointments-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddAppointmentsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAppointmentsmodalPageRoutingModule {}
