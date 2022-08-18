import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsSettingsPageRoutingModule } from './tabs-settings-routing.module';

import { TabsSettingsPage } from './tabs-settings.page';
import { ChhAppTextAvatarModule } from '../../../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsSettingsPageRoutingModule,
    ChhAppTextAvatarModule
  ],
  declarations: [TabsSettingsPage]
})
export class TabsSettingsPageModule {}
