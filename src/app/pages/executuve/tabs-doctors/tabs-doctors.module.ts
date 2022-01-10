import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsDoctorsPageRoutingModule } from './tabs-doctors-routing.module';

import { TabsDoctorsPage } from './tabs-doctors.page';
import { ChhAppTextAvatarModule } from 'src/app/chh-web-components/chh-app-text-avatar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsDoctorsPageRoutingModule,
    ChhAppTextAvatarModule
  ],
  declarations: [TabsDoctorsPage]
})
export class TabsDoctorsPageModule {}
