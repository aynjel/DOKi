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
        path: 'newsfeed',
        loadChildren: () => import('../tabs-newsfeed/tabs-newsfeed.module').then(m => m.TabsNewsfeedPageModule)
      },{
        path: 'allpatients',
        loadChildren: () => import('../tabs-allpatients/tabs-allpatients.module').then(m => m.TabsAllpatientsPageModule)
      },{
        path: 'settings',
        loadChildren: () => import('../tabs-settings/tabs-settings.module').then(m => m.TabsSettingsPageModule)
      },{
        path: 'doctors/:id', 
        loadChildren: () => import('../pages/doctordetails/doctordetails.module').then( m => m.DoctordetailsPageModule)
      },{
        path: 'doctors/:id/:patientid', 
        loadChildren: () => import('../pages/doctordetails/doctordetails.module').then( m => m.DoctordetailsPageModule)
      },{
        path: 'patient/:id/:method', 
        loadChildren: () => import('../pages/patient-detail/patient-detail.module').then( m => m.PatientDetailPageModule)
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
