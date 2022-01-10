import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '../../../shared/constants';
import { LogoutService } from 'src/app/services/logout/logout.service';
@Component({
  selector: 'app-tabs-settings',
  templateUrl: './tabs-settings.page.html',
  styleUrls: ['./tabs-settings.page.scss'],
})
export class TabsSettingsPage implements OnInit {
  userData$ = new BehaviorSubject<any>([]);
  constructor(    private storageService: StorageService,
    private router: Router,
    public constants: Constants,
    private logoutService:LogoutService
    ) { }

  ngOnInit() {
  }
  logout() {

      /*
    this.doctorService.revokeTokenV3(this.revokeTokenV3).subscribe((res: any) => {
      //console.log(res);
    });
    */
    this.logoutService.out();
    /*
    let dr_username = atob(localStorage.getItem('username'));
    this.storageService.removeStorageItem(AuthConstants.AUTH).then((res) => {
      this.userData$.next('');
      localStorage.removeItem('_cap_userDataKey');
      localStorage.removeItem('username');
 
      sessionStorage.clear();
      localStorage.setItem('hasloggedin', '1');
      localStorage.setItem('username',dr_username);
      this.router.navigate(['/login']);
    });*/

  }
}
