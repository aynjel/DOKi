import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErPatientDetailPage } from './er-patient-detail.page';
import { HomeGuard } from '../../../guards/home.guard';
import { UserDataResolver } from '../../../resolvers/userData.resolver';

const routes: Routes = [
  {
    path: '',
    canActivate:[HomeGuard], 
    resolve:{
      userData: UserDataResolver
    },
    component: ErPatientDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErPatientDetailPageRoutingModule {}
