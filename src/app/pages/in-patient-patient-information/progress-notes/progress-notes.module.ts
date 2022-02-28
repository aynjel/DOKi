import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressNotesPageRoutingModule } from './progress-notes-routing.module';

import { ProgressNotesPage } from './progress-notes.page';
import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressNotesPageRoutingModule,
    ChhWebComponentsModule,
  ],
  declarations: [ProgressNotesPage],
})
export class ProgressNotesPageModule {}
