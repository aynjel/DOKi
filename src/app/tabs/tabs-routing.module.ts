import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { HomeGuard } from '../guards/home.guard';
import { UserDataResolver } from '../resolvers/userData.resolver';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate:[HomeGuard], 
    resolve:{
      userData: UserDataResolver
    },
    children: [
      {
        path: 'in-patients',
        loadChildren: () => import('../tab-in-patients/tab-in-patients.module').then(m => m.TabInPatientsPageModule)
      },
      {
        path: 'in-patients/DN',
        loadChildren: () => import('../tab-in-patients/tab-in-patients.module').then(m => m.TabInPatientsPageModule)
      },
      {
        path: 'in-patients/AC',
        loadChildren: () => import('../tab-in-patients/tab-in-patients.module').then(m => m.TabInPatientsPageModule)
      },
      {
        path: 'appointments',
        loadChildren: () => import('../tab-appointments/tab-appointments.module').then(m => m.TabAppointmentsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../tab-settings/tab-settings.module').then(m => m.TabSettingsPageModule)
      },{
        path: 'dashboard',
        loadChildren: () => import('../tab-dashboard/tab-dashboard.module').then(m => m.TabDashboardPageModule)
      },
      {
        path: '',
        redirectTo: '/menu/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'menu',
    redirectTo: '/menu/tab-in-patients',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
