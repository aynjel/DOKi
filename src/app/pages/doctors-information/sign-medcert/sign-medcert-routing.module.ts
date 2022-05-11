import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignMedcertPage } from './sign-medcert.page';

const routes: Routes = [
  {
    path: '',
    component: SignMedcertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignMedcertPageRoutingModule {}
