import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionSummaryPage } from './transaction-summary.page';
import { HomeGuard } from '../../../guards/home.guard';
import { UserDataResolver } from '../../../resolvers/userData.resolver';
const routes: Routes = [
  {
    path: '',
    canActivate:[HomeGuard], 
    resolve:{
      userData: UserDataResolver
    },
    component: TransactionSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionSummaryPageRoutingModule {}
