import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignMedcertPageRoutingModule } from './sign-medcert-routing.module';

import { SignMedcertPage } from './sign-medcert.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignMedcertPageRoutingModule,
    PdfViewerModule,
    PinchZoomModule,
    SignaturePadModule,
  ],
  declarations: [SignMedcertPage],
})
export class SignMedcertPageModule {}
