import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppChangePasswordPageRoutingModule } from './chh-app-change-password-routing.module';

import { ChhAppChangePasswordPage } from './chh-app-change-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppChangePasswordPageRoutingModule
  ],
  declarations: [ChhAppChangePasswordPage]
})
export class ChhAppChangePasswordPageModule {}
