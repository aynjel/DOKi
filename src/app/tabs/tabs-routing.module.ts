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
        children: [{
          path:'',
          loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
        },
        {
          path: ':patientId',
          loadChildren: () => import('../page/inpatientdetial/inpatientdetial.module').then( m => m.InpatientdetialPageModule)
        }
      ]
        
      },
      {
        path: 'appointments',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },{
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: '',
        redirectTo: '/menu/in-patients',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'menu',
    redirectTo: '/menu/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
