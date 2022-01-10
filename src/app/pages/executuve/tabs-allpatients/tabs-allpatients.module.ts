import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsAllpatientsPageRoutingModule } from './tabs-allpatients-routing.module';

import { TabsAllpatientsPage } from './tabs-allpatients.page';
import { ChhAppTextAvatarModule } from 'src/app/chh-web-components/chh-app-text-avatar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsAllpatientsPageRoutingModule,
    ChhAppTextAvatarModule
  ],
  declarations: [TabsAllpatientsPage]
})
export class TabsAllpatientsPageModule {}
