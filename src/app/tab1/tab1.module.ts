import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { ComponentsModule } from '../components/components.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { InpatientsComponent } from '../components/inpatients/inpatients.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,ComponentsModule

  ],
  declarations: [Tab1Page, InpatientsComponent]
})
export class Tab1PageModule {}
