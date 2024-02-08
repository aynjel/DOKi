import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabNotificationPageRoutingModule } from './tab-notification-routing.module';

import { TabNotificationPage } from './tab-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabNotificationPageRoutingModule
  ],
  declarations: [TabNotificationPage]
})
export class TabNotificationPageModule {}
