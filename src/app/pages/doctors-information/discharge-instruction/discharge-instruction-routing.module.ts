import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DischargeInstructionPage } from './discharge-instruction.page';

const routes: Routes = [
  {
    path: '',
    component: DischargeInstructionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DischargeInstructionPageRoutingModule {}
