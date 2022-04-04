import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalCertificatePageRoutingModule } from './medical-certificate-routing.module';

import { MedicalCertificatePage } from './medical-certificate.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { SignaturePadModule } from 'angular2-signaturepad';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalCertificatePageRoutingModule,
    PdfViewerModule,
    PinchZoomModule,
    SignaturePadModule,
  ],
  declarations: [MedicalCertificatePage],
})
export class MedicalCertificatePageModule {}
