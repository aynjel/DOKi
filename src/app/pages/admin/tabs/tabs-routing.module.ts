import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomeGuard } from '../../../guards/home.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { UserDataResolver } from '../../../resolvers/userData.resolver';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate:[AdminGuard], 
    resolve:{
      userData: UserDataResolver
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../tabs-dashboard/tabs-dashboard.module').then(m => m.TabsDashboardPageModule)
      },{
        path: 'settings',
        loadChildren: () => import('../tabs-settings/tabs-settings-routing.module').then(m => m.TabsSettingsPageRoutingModule)
      },
      {
        path: '',
        redirectTo: '/administrator/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'administrator',
    redirectTo: '/administrator/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
