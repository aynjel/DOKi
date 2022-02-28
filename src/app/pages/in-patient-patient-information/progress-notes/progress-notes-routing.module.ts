import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressNotesPage } from './progress-notes.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressNotesPageRoutingModule {}
