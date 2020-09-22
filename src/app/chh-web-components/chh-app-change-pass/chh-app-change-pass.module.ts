import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppChangePassPageRoutingModule } from './chh-app-change-pass-routing.module';

import { ChhAppChangePassPage } from './chh-app-change-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppChangePassPageRoutingModule
  ],
  declarations: [ChhAppChangePassPage]
})
export class ChhAppChangePassPageModule {}
