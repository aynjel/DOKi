import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMedcert1Page } from './view-medcert1.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMedcert1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMedcert1PageRoutingModule {}
