import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectiblesPage } from './collectibles.page';

const routes: Routes = [
  {
    path: '',
    component: CollectiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectiblesPageRoutingModule {}
