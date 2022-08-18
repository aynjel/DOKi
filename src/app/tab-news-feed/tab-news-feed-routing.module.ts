import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabNewsFeedPage } from './tab-news-feed.page';

const routes: Routes = [
  {
    path: '',
    component: TabNewsFeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabNewsFeedPageRoutingModule {}
