import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { Constants } from 'src/app/shared/constants';
import { StorageService } from "../../services/storage/storage.service";
import { AuthConstants } from "../../config/auth-constants";
@Component({
  selector: 'app-chh-app-desktop-navigation',
  templateUrl: './chh-app-desktop-navigation.component.html',
  styleUrls: ['./chh-app-desktop-navigation.component.scss'],
})
export class ChhAppDesktopNavigationComponent implements OnInit {

  isDesktop:any;
  constructor(private screensizeService: ScreenSizeService,    public constants: Constants,    public router:Router,   private storageService: StorageService,) { 

    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }
  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
      localStorage.clear();
      localStorage.setItem('hasloggedin', '1');
      //window.location.reload();
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {}

}
