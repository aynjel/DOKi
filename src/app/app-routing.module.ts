import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexGuard } from './guards/index.guard';
import {HomeGuard} from './guards/home.guard';
import { Error404PageModule } from './components/error404/error404.module';
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
    path: 'error404',
    loadChildren: () => import('./components/error404/error404.module').then( m => m.Error404PageModule)
  },{
    path        : '**',
    pathMatch   : 'full',
    loadChildren: () => import('./components/error404/error404.module').then( m => m.Error404PageModule)
}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
