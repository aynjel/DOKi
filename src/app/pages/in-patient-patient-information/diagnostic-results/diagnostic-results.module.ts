import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosticResultsPageRoutingModule } from './diagnostic-results-routing.module';

import { DiagnosticResultsPage } from './diagnostic-results.page';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChhAppTextAvatarModule } from 'src/app/chh-web-components/chh-app-text-avatar';
import { ChhWebComponentsModule } from 'src/app/chh-web-components/chh-web-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiagnosticResultsPageRoutingModule,
    ChhWebComponentsModule,
    ChhAppTextAvatarModule,
    PdfViewerModule,
    PinchZoomModule,
  ],
  declarations: [DiagnosticResultsPage],
})
export class DiagnosticResultsPageModule {}
