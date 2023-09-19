import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DischargeInstructionSearchPage } from './discharge-instruction-search.page';

const routes: Routes = [
  {
    path: '',
    component: DischargeInstructionSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DischargeInstructionSearchPageRoutingModule {}
