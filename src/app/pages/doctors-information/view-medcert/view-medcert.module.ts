import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMedcertPageRoutingModule } from './view-medcert-routing.module';

import { ViewMedcertPage } from './view-medcert.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMedcertPageRoutingModule,
    PdfViewerModule,
    PinchZoomModule,
    SignaturePadModule,
  ],
  declarations: [ViewMedcertPage],
})
export class ViewMedcertPageModule {}
