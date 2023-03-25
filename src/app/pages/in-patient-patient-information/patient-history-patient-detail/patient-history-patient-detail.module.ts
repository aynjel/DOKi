import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PatientHistoryPatientDetailPageRoutingModule } from "./patient-history-patient-detail-routing.module";

import { PatientHistoryPatientDetailPage } from "./patient-history-patient-detail.page";
import { ChhWebComponentsModule } from "src/app/chh-web-components/chh-web-components.module";
import { ChhAppTextAvatarModule } from "src/app/chh-web-components/chh-app-text-avatar";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { PinchZoomModule } from "ngx-pinch-zoom";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientHistoryPatientDetailPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule,
    PdfViewerModule,
    PinchZoomModule,
  ],
  declarations: [PatientHistoryPatientDetailPage],
})
export class PatientHistoryPatientDetailPageModule {}
