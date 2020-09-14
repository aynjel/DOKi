import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabAppointmentsPage } from './tab-appointments.page';

const routes: Routes = [
  {
    path: '',
    component: TabAppointmentsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabAppointmentsPageRoutingModule {}
