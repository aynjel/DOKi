import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChemistryPageRoutingModule } from './chemistry-routing.module';

import { ChemistryPage } from './chemistry.page';
import { ChhAppTextAvatarModule } from "../../chh-app-text-avatar/chh-app-text-avatar.module";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppTextAvatarModule,
    ChemistryPageRoutingModule
  ],
  declarations: [ChemistryPage]
})
export class ChemistryPageModule {}
