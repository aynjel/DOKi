import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChhAppAddAppointmentsModalPage } from "./chh-app-add-appointments-modal.page";

const routes: Routes = [
  {
    path: "",
    component: ChhAppAddAppointmentsModalPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ChhAppAddAppointmentsmodalPageRoutingModule {}
