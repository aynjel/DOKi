import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMedcertPage } from './view-medcert.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMedcertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMedcertPageRoutingModule {}
