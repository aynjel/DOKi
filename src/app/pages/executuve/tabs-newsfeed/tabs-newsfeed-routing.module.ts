import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsNewsfeedPage } from './tabs-newsfeed.page';

const routes: Routes = [
  {
    path: '',
    component: TabsNewsfeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsNewsfeedPageRoutingModule {}
