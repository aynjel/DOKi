import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppIcdrvsPageRoutingModule } from './chh-app-icdrvs-routing.module';

import { ChhAppIcdrvsPage } from './chh-app-icdrvs.page';
import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';
import { ChhAppTextAvatarModule } from "../../../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppIcdrvsPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule
  ],
  declarations: [ChhAppIcdrvsPage]
})
export class ChhAppIcdrvsPageModule {}
