import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppChangePassPageRoutingModule } from './chh-app-change-pass-routing.module';

import { ChhAppChangePassPage } from './chh-app-change-pass.page';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppChangePassPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ChhAppChangePassPage]
})
export class ChhAppChangePassPageModule {}
