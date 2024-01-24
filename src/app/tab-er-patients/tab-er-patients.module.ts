import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabErPatientsPageRoutingModule } from './tab-er-patients-routing.module';

import { TabErPatientsPage } from './tab-er-patients.page';
import { ChhAppTextAvatarModule } from "../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module";
import { ChhWebComponentsModule } from '../chh-web-components/chh-web-components.module';

@NgModule({
    declarations: [TabErPatientsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabErPatientsPageRoutingModule,
        ChhAppTextAvatarModule,
        ChhWebComponentsModule
    ]
})
export class TabErPatientsPageModule {}
