import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChhAppIcdrvsPage } from './chh-app-icdrvs.page';
import { HomeGuard } from '../../../guards/home.guard';
import { UserDataResolver } from '../../../resolvers/userData.resolver';
const routes: Routes = [
  {
    path: '',
    canActivate:[HomeGuard], 
    resolve:{
      userData: UserDataResolver
    },
    component: ChhAppIcdrvsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChhAppIcdrvsPageRoutingModule {}
