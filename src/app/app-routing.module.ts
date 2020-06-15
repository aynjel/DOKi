import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./page/index/index.module').then( m => m.IndexPageModule)
  },/*  {
    path: 'modalpage',
    loadChildren: () => import('./components/modalpage/modalpage.module').then( m => m.ModalpagePageModule)
  }
*,
  {
    path: 'inpatientdetial',
    loadChildren: () => import('./page/inpatientdetial/inpatientdetial.module').then( m => m.InpatientdetialPageModule)
  }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
