import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { ChhAppTextAvatarModule } from 'src/app/chh-web-components/chh-app-text-avatar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
