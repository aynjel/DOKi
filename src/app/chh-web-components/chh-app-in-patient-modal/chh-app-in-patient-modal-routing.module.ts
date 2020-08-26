import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChhAppInPatientModalPage } from "./chh-app-in-patient-modal.page";

const routes: Routes = [
  {
    path: "",
    component: ChhAppInPatientModalPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ChhAppInPatientModalPageRoutingModule {}
