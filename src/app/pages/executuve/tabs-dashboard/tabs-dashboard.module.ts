import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsDashboardPageRoutingModule } from './tabs-dashboard-routing.module';

import { TabsDashboardPage } from './tabs-dashboard.page';

import { ChhAppTextAvatarModule } from 'src/app/chh-web-components/chh-app-text-avatar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsDashboardPageRoutingModule,
    ChhAppTextAvatarModule
  ],
  declarations: [TabsDashboardPage]
})
export class TabsDashboardPageModule {}
