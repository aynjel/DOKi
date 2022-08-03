import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressNotesPerDayPageRoutingModule } from './progress-notes-per-day-routing.module';

import { ProgressNotesPerDayPage } from './progress-notes-per-day.page';
import { ChhWebComponentsModule } from 'src/app/chh-web-components/chh-web-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhWebComponentsModule,
    ProgressNotesPerDayPageRoutingModule,
  ],
  declarations: [ProgressNotesPerDayPage],
})
export class ProgressNotesPerDayPageModule {}
