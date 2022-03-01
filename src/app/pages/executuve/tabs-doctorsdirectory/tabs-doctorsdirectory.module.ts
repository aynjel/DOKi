import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsDoctorsdirectoryPageRoutingModule } from './tabs-doctorsdirectory-routing.module';

import { TabsDoctorsdirectoryPage } from './tabs-doctorsdirectory.page';
import { ChhAppTextAvatarModule } from 'src/app/chh-web-components/chh-app-text-avatar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsDoctorsdirectoryPageRoutingModule,
    ChhAppTextAvatarModule,
  ],
  declarations: [TabsDoctorsdirectoryPage],
})
export class TabsDoctorsdirectoryPageModule {}
