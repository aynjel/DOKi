import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsHistoricalPageRoutingModule } from './tabs-historical-routing.module';

import { TabsHistoricalPage } from './tabs-historical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsHistoricalPageRoutingModule
  ],
  declarations: [TabsHistoricalPage]
})
export class TabsHistoricalPageModule {}
