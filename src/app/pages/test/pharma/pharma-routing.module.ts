import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PharmaPage } from './pharma.page';

const routes: Routes = [
  {
    path: '',
    component: PharmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PharmaPageRoutingModule {}
