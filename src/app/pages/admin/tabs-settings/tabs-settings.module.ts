import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsSettingsPageRoutingModule } from './tabs-settings-routing.module';

import { TabsSettingsPage } from './tabs-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsSettingsPageRoutingModule
  ],
  declarations: [TabsSettingsPage]
})
export class TabsSettingsPageModule {}
