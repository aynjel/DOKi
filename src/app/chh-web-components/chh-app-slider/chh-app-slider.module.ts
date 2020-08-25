import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChhAppSliderPageRoutingModule } from './chh-app-slider-routing.module';

//import { SliderPage } from './slider.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppSliderPageRoutingModule
  ]
})
export class ChhAppSliderPageModule {}
