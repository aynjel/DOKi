import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexGuard } from './guards/index.guard';
import {HomeGuard} from './guards/home.guard';
import { ChhAppError404PageModule } from '../app/chh-web-components/chh-app-error-404/chh-app-error-404.module';
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
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    canActivate:[IndexGuard], 
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
  },{
    path: 'error404',
    loadChildren: () => import('../app/chh-web-components/chh-app-error-404/chh-app-error-404.module').then( m => m.ChhAppError404PageModule)
  },{
    path        : '**',
    pathMatch   : 'full',
    loadChildren: () => import('../app/chh-web-components/chh-app-error-404/chh-app-error-404.module').then( m => m.ChhAppError404PageModule)
}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}