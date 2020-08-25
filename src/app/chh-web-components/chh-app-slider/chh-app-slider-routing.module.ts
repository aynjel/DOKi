import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppSliderPage } from './chh-app-slider.page';

const routes: Routes = [
  {
    path: '',
    component: ChhAppSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppSliderPageRoutingModule {}
