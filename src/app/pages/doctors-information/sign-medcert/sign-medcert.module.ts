import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignMedcertPageRoutingModule } from './sign-medcert-routing.module';

import { SignMedcertPage } from './sign-medcert.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { SignaturePadModule } from 'angular2-signaturepad';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
const dbConfig = {
  name: 'signatureDB',
  version: 2,
  objectStoresMeta: [
    {
      store: 'people',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'drCode', keypath: 'drCode', options: { unique: false } },
        {
          name: 'base64image',
          keypath: 'base64image',
          options: { unique: false },
        },
        {
          name: 'base64imageFull',
          keypath: 'base64imageFull',
          options: { unique: false },
        },
      ],
    },
  ],
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignMedcertPageRoutingModule,
    PdfViewerModule,
    PinchZoomModule,
    SignaturePadModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  declarations: [SignMedcertPage],
})
export class SignMedcertPageModule {}
