import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsDashboardPageRoutingModule } from './tabs-dashboard-routing.module';

import { TabsDashboardPage } from './tabs-dashboard.page';

import { ChhAppTextAvatarModule } from 'src/app/chh-web-components/chh-app-text-avatar';
import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsDashboardPageRoutingModule,
    ChhAppTextAvatarModule,
    ChhWebComponentsModule,
  ],
  declarations: [TabsDashboardPage]
})
export class TabsDashboardPageModule {}
