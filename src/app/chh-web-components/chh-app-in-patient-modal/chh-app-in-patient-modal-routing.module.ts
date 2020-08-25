import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppInpatientmodalPage } from './chh-app-in-patient-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ChhAppInpatientmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppInpatientmodalPageRoutingModule {}
