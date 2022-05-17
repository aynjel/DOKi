import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMedcert1PageRoutingModule } from './view-medcert1-routing.module';

import { ViewMedcert1Page } from './view-medcert1.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMedcert1PageRoutingModule,
    PdfViewerModule,
    PinchZoomModule,
    SignaturePadModule,
  ],
  declarations: [ViewMedcert1Page],
})
export class ViewMedcert1PageModule {}
