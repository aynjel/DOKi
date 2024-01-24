import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppProfessionalFeeSummaryPage } from './chh-app-professional-fee-summary.page';

const routes: Routes = [
  {
    path: '',
    component: ChhAppProfessionalFeeSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppProfessionalFeeSummaryPageRoutingModule {}
