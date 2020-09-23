import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabInPatientsPage } from "./tab-in-patients.page";

const routes: Routes = [
  {
    path: "",
    component: TabInPatientsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TabInPatientsPageRoutingModule {}
