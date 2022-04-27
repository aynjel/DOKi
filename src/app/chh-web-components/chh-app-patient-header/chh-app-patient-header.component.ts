import { Component, OnInit, Input } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-chh-app-patient-header',
  templateUrl: './chh-app-patient-header.component.html',
  styleUrls: ['./chh-app-patient-header.component.scss'],
})
export class ChhAppPatientHeaderComponent {
  @Input() data: any;
  @Input() dateAdmitted: any;
  @Input() dischargeNotice: any;
  @Input() forMoreOrLess: boolean;
  @Input() is_pwd: any = 'N';
  @Input() is_senior: any = 'N';
  isDesktop: any;
  moreOrLess: boolean = true;

  constructor(private screensizeService: ScreenSizeService) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
      //console.log(this.isDesktop);
    });
    //console.log(this.isDesktop);
  }
  ionViewWillEnter() {}
  ngOnInit() {
    if (this.forMoreOrLess) {
      this.moreOrLess = !this.forMoreOrLess;
    }
  }

  moreorless(data) {
    this.moreOrLess = data;
  }
}
