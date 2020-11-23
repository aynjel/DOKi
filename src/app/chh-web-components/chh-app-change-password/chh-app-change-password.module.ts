import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppChangePasswordPageRoutingModule } from './chh-app-change-password-routing.module';

import { ChhAppChangePasswordPage } from './chh-app-change-password.page';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppChangePasswordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ChhAppChangePasswordPage]
})
export class ChhAppChangePasswordPageModule {}
