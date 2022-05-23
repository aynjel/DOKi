import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectiblesPageRoutingModule } from './collectibles-routing.module';

import { CollectiblesPage } from './collectibles.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { ChhWebComponentsModule } from '../../../chh-web-components/chh-web-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectiblesPageRoutingModule,
    PdfViewerModule,
    PinchZoomModule,
    ChhWebComponentsModule,
  ],
  declarations: [CollectiblesPage],
})
export class CollectiblesPageModule {}
