import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { ScreensizeService } from '../services/screensize.service';
import {LoginData} from '../models/logindata.model';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userData$ = new BehaviorSubject<any>([]);
  public logindata:LoginData;
  account:LoginData;
  isDesktop: boolean;
  displayUserData : any;
  constructor(
      private authService:AuthService,
      private router:Router,
      private storageService:StorageService,
      private screensizeService: ScreensizeService
    ) {      this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {window.location.reload();}this.isDesktop = isDesktop;
    });
   }

  ngOnInit() {
    this.authService.userData$.subscribe(
      (res:any) => {
        console.log(res);
        this.account = <LoginData>res;
      }
    );
   
  }
  logout() {
    
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      //clear behavior subject
      this.userData$.next('');
      //clear local storage
      localStorage.clear();
      window.location.reload();
      //this.router.navigate(['/login']);
    });
  }

}
