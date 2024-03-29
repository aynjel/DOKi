import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxPageRoutingModule } from './inbox-routing.module';

import { InboxPage } from './inbox.page';
import { ChhAppTextAvatarModule } from 'src/app/chh-web-components/chh-app-text-avatar';
import { SeeMoreHelperComponent } from 'src/app/chh-web-components/see-more-helper/see-more-helper.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxPageRoutingModule,
    ChhAppTextAvatarModule,
  ],
  declarations: [InboxPage, SeeMoreHelperComponent],
  exports: [SeeMoreHelperComponent],
})
export class InboxPageModule {}
