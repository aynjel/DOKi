import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMedicalabstractPage } from './search-medicalabstract.page';

const routes: Routes = [
  {
    path: '',
    component: SearchMedicalabstractPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMedicalabstractPageRoutingModule {}
