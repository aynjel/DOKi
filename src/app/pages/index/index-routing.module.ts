import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexGuard } from "../../guards/index.guard";
import { IndexPage } from "./index.page";

const routes: Routes = [
  {
    path: "",
    canActivate: [IndexGuard],
    component: IndexPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class IndexPageRoutingModule {}
