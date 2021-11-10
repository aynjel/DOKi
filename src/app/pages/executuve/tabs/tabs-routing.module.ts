import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomeGuard } from '../../../guards/home.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { ExecutiveGuard } from 'src/app/guards/executive.guard';
import { UserDataResolver } from '../../../resolvers/userData.resolver';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate:[ExecutiveGuard], 
    resolve:{
      userData: UserDataResolver
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../tabs-dashboard/tabs-dashboard.module').then(m => m.TabsDashboardPageModule)
      },{
        path: 'doctors',
        loadChildren: () => import('../tabs-doctors/tabs-doctors.module').then(m => m.TabsDoctorsPageModule)
      },{
        path: 'patients',
        loadChildren: () => import('../tabs-patients/tabs-patients.module').then(m => m.TabsPatientsPageModule)
      },{
        path: 'allpatients',
        loadChildren: () => import('../tabs-allpatients/tabs-allpatients.module').then(m => m.TabsAllpatientsPageModule)
      },{
        path: 'settings',
        loadChildren: () => import('../tabs-settings/tabs-settings.module').then(m => m.TabsSettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/executive/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'executive',
    redirectTo: '/executive/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
