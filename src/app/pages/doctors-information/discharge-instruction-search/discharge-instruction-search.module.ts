import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DischargeInstructionSearchPageRoutingModule } from './discharge-instruction-search-routing.module';

import { DischargeInstructionSearchPage } from './discharge-instruction-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DischargeInstructionSearchPageRoutingModule
  ],
  declarations: [DischargeInstructionSearchPage]
})
export class DischargeInstructionSearchPageModule {}
