import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddappointmentsmodalPage } from './addappointmentsmodal.page';

const routes: Routes = [
  {
    path: '',
    component: AddappointmentsmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddappointmentsmodalPageRoutingModule {}
