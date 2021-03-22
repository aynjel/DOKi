import { Component, OnInit, Input } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-chh-app-patient-header',
  templateUrl: './chh-app-patient-header.component.html',
  styleUrls: ['./chh-app-patient-header.component.scss'],
})
export class ChhAppPatientHeaderComponent implements OnInit {
  @Input() data: any;
  @Input() dateAdmitted: any;
  isDesktop:any;
  constructor(       private screensizeService: ScreenSizeService) {

    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
   }

  ngOnInit() {}

}
