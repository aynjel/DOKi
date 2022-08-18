import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsSettingsPage } from './tabs-settings.page';

const routes: Routes = [
  {
    path: '',
    component: TabsSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsSettingsPageRoutingModule {}
