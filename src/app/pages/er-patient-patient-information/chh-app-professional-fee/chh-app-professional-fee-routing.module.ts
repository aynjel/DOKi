import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppProfessionalFeePage } from './chh-app-professional-fee.page';

const routes: Routes = [
  {
    path: '',
    component: ChhAppProfessionalFeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppProfessionalFeePageRoutingModule {}
