import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CaseRatesPageRoutingModule } from './case-rates-routing.module';
import { CaseRatesPage } from './case-rates.page';
import { ChhWebComponentsModule } from '../../chh-web-components/chh-web-components.module';
import { ChhAppTextAvatarModule } from "../../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaseRatesPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule
  ],
  declarations: [CaseRatesPage]
})
export class CaseRatesPageModule {}
