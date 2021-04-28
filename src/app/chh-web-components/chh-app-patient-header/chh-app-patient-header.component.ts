import { Component, OnInit, Input } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-chh-app-patient-header',
  templateUrl: './chh-app-patient-header.component.html',
  styleUrls: ['./chh-app-patient-header.component.scss'],
})
export class ChhAppPatientHeaderComponent  {
  @Input() data: any;
  @Input() dateAdmitted: any;
  @Input() forMoreOrLess: boolean;
  isDesktop: any;
  moreOrLess: boolean = true;

  constructor(private screensizeService: ScreenSizeService) {
    console.log(this.data);
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }
  ionViewWillEnter() {
    console.log("123123123");
  }
  ngOnInit() {
    console.log(this.data);
    
    if (this.forMoreOrLess) {
      this.moreOrLess = !this.forMoreOrLess;
    }
  }

  moreorless(data) {
    this.moreOrLess = data;
  }
}
