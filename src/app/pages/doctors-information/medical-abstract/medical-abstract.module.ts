import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalAbstractPageRoutingModule } from './medical-abstract-routing.module';

import { MedicalAbstractPage } from './medical-abstract.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { SignaturePadModule } from 'angular2-signaturepad';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalAbstractPageRoutingModule,
    PdfViewerModule,
    PinchZoomModule,
    SignaturePadModule,
  ],
  declarations: [MedicalAbstractPage],
})
export class MedicalAbstractPageModule {}
