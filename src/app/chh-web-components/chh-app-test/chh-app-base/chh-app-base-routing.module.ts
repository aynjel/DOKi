import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppBasePage } from './chh-app-base.page';

const routes: Routes = [
  {
    path: '',
    component: ChhAppBasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppBasePageRoutingModule {}
