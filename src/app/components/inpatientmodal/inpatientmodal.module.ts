import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InpatientmodalPageRoutingModule } from './inpatientmodal-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { InpatientmodalPage } from './inpatientmodal.page';
import { TextAvatarModule } from '../text-avatar/text-avatar.module';
@NgModule({
  imports: [

    FormsModule,
    IonicModule,
    TextAvatarModule,
    BrowserModule,
    InpatientmodalPageRoutingModule
  ],
  declarations: [InpatientmodalPage]
})
export class InpatientmodalPageModule {}
