import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    ChhWebComponentsModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
