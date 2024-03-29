import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { IndexPageRoutingModule } from "./index-routing.module";
import { ChhWebComponentsModule } from "../../chh-web-components/chh-web-components.module";
import { IndexPage } from "./index.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule,
    ChhWebComponentsModule,
  ],
  declarations: [IndexPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class IndexPageModule {}
