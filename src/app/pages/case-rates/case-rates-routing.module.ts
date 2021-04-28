import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaseRatesPage } from './case-rates.page';
import { HomeGuard } from '../../guards/home.guard';
import { UserDataResolver } from '../../resolvers/userData.resolver';
const routes: Routes = [
  {
    path: '',
    canActivate:[HomeGuard], 
    resolve:{
      userData: UserDataResolver
    },
    component: CaseRatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseRatesPageRoutingModule {}
