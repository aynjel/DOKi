import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ChhAppError404PageRoutingModule } from "./chh-app-error-404-routing.module";
import { ChhAppError404Page } from "./chh-app-error-404.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChhAppError404PageRoutingModule,
  ],
  declarations: [ChhAppError404Page],
})

export class ChhAppError404PageModule {}
