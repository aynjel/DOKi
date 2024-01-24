import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionSummaryPageRoutingModule } from './transaction-summary-routing.module';

import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';
import { TransactionSummaryPage } from './transaction-summary.page';
import { ChhAppTextAvatarModule } from "../../../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionSummaryPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule
  ],
  declarations: [TransactionSummaryPage]
})
export class TransactionSummaryPageModule {}
