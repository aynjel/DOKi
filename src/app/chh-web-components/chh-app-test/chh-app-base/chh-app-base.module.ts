import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppBasePageRoutingModule } from './chh-app-base-routing.module';
import { ChhWebComponentsModule } from '../../chh-web-components.module';
import { ChhAppBasePage } from './chh-app-base.page';
import { ChhAppTextAvatarModule } from "../../chh-app-text-avatar/chh-app-text-avatar.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppTextAvatarModule,
    ChhWebComponentsModule,
    ChhAppBasePageRoutingModule
  ],
  declarations: [ChhAppBasePage]
})
export class ChhAppBasePageModule {}
