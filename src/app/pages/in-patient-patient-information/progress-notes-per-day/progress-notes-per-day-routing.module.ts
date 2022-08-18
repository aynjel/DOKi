import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressNotesPerDayPage } from './progress-notes-per-day.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressNotesPerDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressNotesPerDayPageRoutingModule {}
