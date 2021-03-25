import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-chh-app-desktop-navigation',
  templateUrl: './chh-app-desktop-navigation.component.html',
  styleUrls: ['./chh-app-desktop-navigation.component.scss'],
})
export class ChhAppDesktopNavigationComponent implements OnInit {

  isDesktop:any;
  constructor(private screensizeService: ScreenSizeService,    public constants: Constants,    public router:Router) { 

    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }


  ngOnInit() {}

}
