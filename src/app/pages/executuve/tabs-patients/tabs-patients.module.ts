import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPatientsPageRoutingModule } from './tabs-patients-routing.module';

import { TabsPatientsPage } from './tabs-patients.page';
import { ChhAppTextAvatarModule } from 'src/app/chh-web-components/chh-app-text-avatar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPatientsPageRoutingModule,
    ChhAppTextAvatarModule
  ],
  declarations: [TabsPatientsPage]
})
export class TabsPatientsPageModule {}
