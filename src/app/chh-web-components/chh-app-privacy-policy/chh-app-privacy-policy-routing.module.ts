import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppPrivacyPolicyPage } from './chh-app-privacy-policy.page';

const routes: Routes = [
  {
    path: '',
    component: ChhAppPrivacyPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppPrivacyPolicyPageRoutingModule {}
