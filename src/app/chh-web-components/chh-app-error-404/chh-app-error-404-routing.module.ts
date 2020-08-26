import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChhAppError404Page } from "./chh-app-error-404.page";

const routes: Routes = [
  {
    path: "",
    component: ChhAppError404Page,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ChhAppError404PageRoutingModule {}
