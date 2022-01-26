import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsErlistPageRoutingModule } from './tabs-erlist-routing.module';

import { TabsErlistPage } from './tabs-erlist.page';
import { ChhAppTextAvatarModule } from 'src/app/chh-web-components/chh-app-text-avatar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsErlistPageRoutingModule,
    ChhAppTextAvatarModule,
  ],
  declarations: [TabsErlistPage],
})
export class TabsErlistPageModule {}
