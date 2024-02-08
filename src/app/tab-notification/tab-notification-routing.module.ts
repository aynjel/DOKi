import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabNotificationPage } from './tab-notification.page';

const routes: Routes = [
  {
    path: '',
    component: TabNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabNotificationPageRoutingModule {}
