import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppTermsAndConditionsPage } from './chh-app-terms-and-conditions.page';

const routes: Routes = [
  {
    path: '',
    component: ChhAppTermsAndConditionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppTermsAndConditionsPageRoutingModule {}
