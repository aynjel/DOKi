import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChhAppHospitalSelectorWithAllAndFilterPage } from "./chh-app-hospital-selector-with-all-and-filter.page";

const routes: Routes = [
  {
    path: "",
    component: ChhAppHospitalSelectorWithAllAndFilterPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ChhAppHospitalSelectorWithAllAndFilterPageRoutingModule {}
