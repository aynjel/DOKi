import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppChangePasswordPage } from './chh-app-change-password.page';

const routes: Routes = [
  {
    path: '',
    component: ChhAppChangePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppChangePasswordPageRoutingModule {}
