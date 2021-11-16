import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctordetailsPageRoutingModule } from './doctordetails-routing.module';

import { DoctordetailsPage } from './doctordetails.page';
import { ChhAppTextAvatarModule } from '../../../../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctordetailsPageRoutingModule,
    ChhAppTextAvatarModule
  ],
  declarations: [DoctordetailsPage]
})
export class DoctordetailsPageModule {}
