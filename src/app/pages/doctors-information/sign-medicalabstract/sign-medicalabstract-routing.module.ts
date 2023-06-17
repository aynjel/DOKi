import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignMedicalabstractPage } from './sign-medicalabstract.page';

const routes: Routes = [
  {
    path: '',
    component: SignMedicalabstractPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignMedicalabstractPageRoutingModule {}
