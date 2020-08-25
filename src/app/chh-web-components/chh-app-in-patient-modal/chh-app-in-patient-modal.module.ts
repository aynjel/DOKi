import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

//import { ChhAppInpatientmodalPageRoutingModule } from './chh-app-in-patient-modal-routing.module';
import { ChhAppInPatientModalPageRoutingModule } from '../chh-app-in-patient-modal/chh-app-in-patient-modal-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ChhAppInPatientModalPage } from './chh-app-in-patient-modal.page';
//import { TextAvatarModule } from '../text-avatar/text-avatar.module';
import { TextAvatarModule } from '../../components/text-avatar/text-avatar.module';
@NgModule({
  imports: [

    FormsModule,
    IonicModule,
    TextAvatarModule,
    BrowserModule,
    ChhAppInPatientModalPageRoutingModule
  ],
  declarations: [ChhAppInPatientModalPage]
})
export class ChhAppInPatientModalPageModule {}
