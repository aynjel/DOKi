import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaboratoryTestModalPageRoutingModule } from './laboratory-test-modal-routing.module';

import { LaboratoryTestModalPage } from './laboratory-test-modal.page';
import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';
import { ChhAppTextAvatarModule } from "../../../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaboratoryTestModalPageRoutingModule,
    ChhWebComponentsModule,
  ],
  declarations: [LaboratoryTestModalPage]
})
export class LaboratoryTestModalPageModule {}
