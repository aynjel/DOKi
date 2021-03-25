import { Component, OnInit, Input } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
@Component({
  selector: 'app-chh-app-list-of-doctors',
  templateUrl: './chh-app-list-of-doctors.component.html',
  styleUrls: ['./chh-app-list-of-doctors.component.scss'],
})
export class ChhAppListOfDoctorsComponent implements OnInit {
  @Input() coDoctors: any;
  @Input() objecthandler: any;
  @Input() isFetchDone: any;
  isDesktop:any;
  constructor(private screensizeService: ScreenSizeService) { 

    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {}

}
