import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppChangePassPage } from './chh-app-change-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ChhAppChangePassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppChangePassPageRoutingModule {}
