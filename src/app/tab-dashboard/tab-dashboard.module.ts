import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabDashboardPageRoutingModule } from './tab-dashboard-routing.module';
import { TabDashboardPage } from './tab-dashboard.page';
import { ChhAppTextAvatarModule } from '../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabDashboardPageRoutingModule,
    ChhAppTextAvatarModule
  ],
  declarations: [TabDashboardPage]
})

export class TabDashboardPageModule {}
