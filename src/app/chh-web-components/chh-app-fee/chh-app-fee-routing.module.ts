import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppFeePage } from './chh-app-fee.page';

const routes: Routes = [
  {
    path: '',
    component: ChhAppFeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppFeePageRoutingModule {}
