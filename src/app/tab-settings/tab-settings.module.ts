import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabSettingsPage } from './tab-settings.page';
import { ChhAppTextAvatarModule } from '../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module';
import { TabSettingsPageRoutingModule } from './tab-settings-routing.module';
import { ChhWebComponentsModule } from '../chh-web-components/chh-web-components.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabSettingsPage }]),
    TabSettingsPageRoutingModule,
    ChhAppTextAvatarModule,
    ChhWebComponentsModule,
  ],
  declarations: [TabSettingsPage],
  entryComponents: [],
})
export class TabSettingsPageModule {}
