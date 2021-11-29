import { Component, OnInit, Renderer2 } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { Constants } from 'src/app/shared/constants';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import {UserSettingsModelv3,LoginResponseModelv3} from 'src/app/models/doctor';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  isDesktop: boolean;
  public logindata: LoginResponseModelv3;
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  userData$ = new BehaviorSubject<any>([]);
  constructor(    private screensizeService: ScreenSizeService,
    public constants: Constants,
    private storageService: StorageService,
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService) { 
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        //window.location.reload();
      }

      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
    this.loginResponseModelv3 = new LoginResponseModelv3();
    
    this.checkAppearance();
    console.log( this.authService.userData$.getValue());
  }
  logout() {
    //this.revokeTokenV3 = new RevokeTokenV3();
    //this.revokeTokenV3.jwt = localStorage.getItem("id_token");
  

      /*
    this.doctorService.revokeTokenV3(this.revokeTokenV3).subscribe((res: any) => {
      console.log(res);
    });
    */


    let dr_username = atob(localStorage.getItem('username'));
    this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
      this.userData$.next('');
      localStorage.removeItem('_cap_userDataKey');
      localStorage.removeItem('username');
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('hasloggedin', '1');
      localStorage.setItem('username',dr_username);
      this.router.navigate(['/login']);
    });

  }
  checkAppearance() {
    var values = JSON.parse('[' + atob(localStorage.getItem("user_settings"))+ ']');
    values.forEach(element => {
      if(element.darkmode == 1){
        this.renderer.setAttribute(document.body,'color-theme','dark');
      }else{
        this.renderer.setAttribute(document.body,'color-theme','light');
      }
    });
   
  }
}
