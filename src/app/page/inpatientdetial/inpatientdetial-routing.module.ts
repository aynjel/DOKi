import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InpatientdetialPage } from './inpatientdetial.page';

const routes: Routes = [
  {
    path: '',
    component: InpatientdetialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InpatientdetialPageRoutingModule {}
