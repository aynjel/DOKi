import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexGuard } from './guards/index.guard';
import { HomeGuard } from './guards/home.guard';
import { ChhAppError404PageModule } from '../app/chh-web-components/chh-app-error-404/chh-app-error-404.module';
import { UserDataResolver } from './resolvers/userData.resolver';
const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },*/ {
    path: 'menu',
    canActivate: [HomeGuard],
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',

    canActivate: [IndexGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'menu/in-patients/:id',
    loadChildren: () =>
      import(
        './pages/in-patient-patient-information/in-patient-detail/in-patient-detail.module'
      ).then((m) => m.InpatientDetailPageModule),
  },
  {
    path: 'menu/in-patients/:admissionNo/:dischargeNo',
    loadChildren: () =>
      import(
        './pages/doctors-information/view-medcert/view-medcert.module'
      ).then((m) => m.ViewMedcertPageModule),
  },
  /*{
    path: 'menu/in-patients/:id/progressnotes',
    loadChildren: () =>
      import(
        './pages/in-patient-patient-information/progress-notes/progress-notes.module'
      ).then((m) => m.ProgressNotesPageModule),
  },*/

  {
    path: 'menu/in-patients/:id/professional-fee',
    loadChildren: () =>
      import(
        './pages/in-patient-patient-information/chh-app-professional-fee/chh-app-professional-fee.module'
      ).then((m) => m.ChhAppProfessionalFeePageModule),
  },
  {
    path: 'menu/in-patients/:id/professional-fee-transaction-summary',
    loadChildren: () =>
      import(
        './pages/in-patient-patient-information/transaction-summary/transaction-summary.module'
      ).then((m) => m.TransactionSummaryPageModule),
  },
  {
    path: 'menu/in-patients/:id/professional-fee/:method',
    loadChildren: () =>
      import(
        './pages/in-patient-patient-information/chh-app-professional-fee-summary/chh-app-professional-fee-summary.module'
      ).then((m) => m.ChhAppProfessionalFeeSummaryPageModule),
  },
  {
    path: 'menu/in-patients/:id/professional-fee/:method/:summary',
    loadChildren: () =>
      import(
        './pages/in-patient-patient-information/transaction-summary/transaction-summary.module'
      ).then((m) => m.TransactionSummaryPageModule),
  },
  /*{
    path: 'icdrvs',
    loadChildren: () =>
      import(
        './pages/in-patient-patient-information/chh-app-icdrvs/chh-app-icdrvs.module'
      ).then((m) => m.ChhAppIcdrvsPageModule),
  },
  {
    path: 'case-rates',
    loadChildren: () =>
      import('./pages/case-rates/case-rates.module').then(
        (m) => m.CaseRatesPageModule
      ),
  },
  {
    path: 'laboratorytestmodal',
    loadChildren: () =>
      import(
        './pages/in-patient-patient-information/laboratory-test-modal/laboratory-test-modal.module'
      ).then((m) => m.LaboratoryTestModalPageModule),
  },*/
  {
    path: 'resetpassword',
    loadChildren: () =>
      import('./pages/resetpassword/resetpassword.module').then(
        (m) => m.ResetpasswordPageModule
      ),
  },
  /* {
    path: 'administrator',
    loadChildren: () =>
      import('./pages/admin/tabs/tabs.module').then((m) => m.TabsPageModule),
  },*/
  {
    path: 'executive',
    loadChildren: () =>
      import('./pages/executuve/tabs/tabs.module').then(
        (m) => m.TabsPageModule
      ),
  },
  {
    path: '',
    canActivate: [IndexGuard],
    loadChildren: () =>
      import('./pages/index/index.module').then((m) => m.IndexPageModule),
  },
  {
    path: 'error404',
    loadChildren: () =>
      import(
        '../app/chh-web-components/chh-app-error-404/chh-app-error-404.module'
      ).then((m) => m.ChhAppError404PageModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import(
        '../app/chh-web-components/chh-app-error-404/chh-app-error-404.module'
      ).then((m) => m.ChhAppError404PageModule),
  } /*  
*  {
    path: 'patient-detail',
    loadChildren: () => import('./pages/executuve/pages/patient-detail/patient-detail.module').then( m => m.PatientDetailPageModule)
  },
*  {
    path: 'doctordetails',
    loadChildren: () => import('./pages/executuve/pages/doctordetails/doctordetails.module').then( m => m.DoctordetailsPageModule)
  },
*  {
    path: 'doctordetails',
    loadChildren: () => import('./executuve/pages/doctordetails/doctordetails.module').then( m => m.DoctordetailsPageModule)
  },
*  {
    path: 'doctordetails',
    loadChildren: () => import('./executive/pages/doctordetails/doctordetails.module').then( m => m.DoctordetailsPageModule)
  },
*  {
    path: 'tabs-newsfeed',
    loadChildren: () => import('./pages/executuve/tabs-newsfeed/tabs-newsfeed.module').then( m => m.TabsNewsfeedPageModule)
  },
*  {
    path: 'tabs-allpatients',
    loadChildren: () => import('./pages/executuve/tabs-allpatients/tabs-allpatients.module').then( m => m.TabsAllpatientsPageModule)
  },
* {
    path: 'tabs-patients',
    loadChildren: () => import('./pages/executuve/tabs-patients/tabs-patients.module').then( m => m.TabsPatientsPageModule)
  },
*  {
    path: 'tabs-patients',
    loadChildren: () => import('./executuve/tabs-patients/tabs-patients.module').then( m => m.TabsPatientsPageModule)
  },
  {
    path: 'tabs-doctors',
    loadChildren: () => import('./pages/executuve/tabs-doctors/tabs-doctors.module').then( m => m.TabsDoctorsPageModule)
  },
*  {
    path: 'tabs-settings',
    loadChildren: () => import('./pages/executuve/tabs-settings/tabs-settings.module').then( m => m.TabsSettingsPageModule)
  },
  {
    path: 'tabs-settings',
    loadChildren: () => import('./pages/executuve/tabs-settings/tabs-settings.module').then( m => m.TabsSettingsPageModule)
  },
 {
    path: 'tabs-settings',
    loadChildren: () => import('./pages/executive/tabs-settings/tabs-settings.module').then( m => m.TabsSettingsPageModule)
  }
,
  
  {
    path: 'tabs-dashboard',
    loadChildren: () => import('./pages/executuve/tabs-dashboard/tabs-dashboard.module').then( m => m.TabsDashboardPageModule)
  },
  {
    path: 'tabs-settings',
    loadChildren: () => import('./pages/executuve/tabs-settings/tabs-settings.module').then( m => m.TabsSettingsPageModule)
  }

*/,
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
