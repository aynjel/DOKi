import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabCaseratesPageRoutingModule } from './tab-caserates-routing.module';

import { TabCaseratesPage } from './tab-caserates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabCaseratesPageRoutingModule
  ],
  declarations: [TabCaseratesPage]
})
export class TabCaseratesPageModule {}
