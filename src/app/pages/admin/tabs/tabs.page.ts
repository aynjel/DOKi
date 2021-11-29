import { Component, OnInit, Renderer2 } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { Constants } from 'src/app/shared/constants';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  isDesktop: boolean;
  userData$ = new BehaviorSubject<any>([]);
  constructor(    private screensizeService: ScreenSizeService,
    public constants: Constants,
    private storageService: StorageService,
    private router: Router,
    private renderer: Renderer2) { 
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        //window.location.reload();
      }

      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
    this.checkAppearance();
  }
  logout() {
    //this.revokeTokenV3 = new RevokeTokenV3();
    //this.revokeTokenV3.jwt = localStorage.getItem("id_token");
  

      /*
    this.doctorService.revokeTokenV3(this.revokeTokenV3).subscribe((res: any) => {
      //console.log(res);
    });
    */

    let dr_username = atob(localStorage.getItem('username'));
    this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
      this.userData$.next('');
      localStorage.removeItem('_cap_userDataKey');
      localStorage.removeItem('username');
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('username',dr_username);
      localStorage.setItem('hasloggedin', '1');

      this.router.navigate(['/login']);
    });

  }
  checkAppearance() {
    var values = JSON.parse('[' + atob(localStorage.getItem("user_settings"))+ ']');
    values.forEach(element => {
      //console.log(element.darkmode);
      if(element.darkmode == 1){
        this.renderer.setAttribute(document.body,'color-theme','dark');
      }else{
        this.renderer.setAttribute(document.body,'color-theme','light');
      }
    });
   
  }
}
