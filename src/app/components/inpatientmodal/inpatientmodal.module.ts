import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InpatientmodalPageRoutingModule } from './inpatientmodal-routing.module';

import { InpatientmodalPage } from './inpatientmodal.page';
import { TextAvatarModule } from '../../components/text-avatar/text-avatar.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextAvatarModule,
    InpatientmodalPageRoutingModule
  ],
  declarations: [InpatientmodalPage]
})
export class InpatientmodalPageModule {}
