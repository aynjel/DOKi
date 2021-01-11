import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChemistryPage } from './chemistry.page';

const routes: Routes = [
  {
    path: '',
    component: ChemistryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChemistryPageRoutingModule {}
