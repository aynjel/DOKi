import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexGuard } from './guards/index.guard';

const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },*/{
    path: 'menu',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    
    canActivate:[IndexGuard], 
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    canActivate:[IndexGuard], 
    loadChildren: () => import('./page/index/index.module').then( m => m.IndexPageModule)
  },{
    path: 'addappointmentsmodal',
    loadChildren: () => import('./components/addappointmentsmodal/addappointmentsmodal.module').then( m => m.AddappointmentsmodalPageModule)
  },{
    path: 'inpatientdetial',
    loadChildren: () => import('./components/inpatientmodal/inpatientmodal.module').then( m => m.InpatientmodalPageModule)
  },/*  {
    path: 'hospital-selector-with-all',
    loadChildren: () => import('./pages/hospital-selector-with-all/hospital-selector-with-all.module').then( m => m.HospitalSelectorWithAllPageModule)
  },
   {
    path: 'fee',
    loadChildren: () => import('./modals/fee/fee.module').then( m => m.FeePageModule)
  }, {
    path: 'patientdetails',
    loadChildren: () => import('./components/patientdetails/patientdetails.module').then( m => m.PatientdetailsPageModule)
  },
  {
    path: 'modalpage',
    loadChildren: () => import('./components/modalpage/modalpage.module').then( m => m.ModalpagePageModule)
  }{
    path: 'logo-sm',
    loadChildren: () => import('./components/logo-sm/logo-sm.module').then( m => m.LogoSmPageModule)
  },
*,
  {
    path: 'inpatientdetial',
    loadChildren: () => import('./page/inpatientdetial/inpatientdetial.module').then( m => m.InpatientdetialPageModule)
  },{
    path: 'inpatientmodal',
    loadChildren: () => import('./components/inpatientmodal/inpatientmodal.module').then( m => m.InpatientmodalPageModule)
  },*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
