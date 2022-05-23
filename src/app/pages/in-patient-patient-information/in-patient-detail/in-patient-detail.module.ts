import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InPatientDetailPageRoutingModule } from './in-patient-detail-routing.module';
import { InPatientDetailPage } from './in-patient-detail.page';
import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';
import { ChhAppTextAvatarModule } from '../../../chh-web-components/chh-app-text-avatar/chh-app-text-avatar.module';
import { ChhAppHospitalSelectorWithAllAndFilterPage } from '../../../chh-web-components/chh-app-hospital-selector-with-all-and-filter/chh-app-hospital-selector-with-all-and-filter.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InPatientDetailPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule,
    PdfViewerModule,
    PinchZoomModule,
  ],
  declarations: [InPatientDetailPage],
})
export class InpatientDetailPageModule {}
