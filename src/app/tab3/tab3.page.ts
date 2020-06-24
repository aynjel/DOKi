import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  displayUserData : any;
  constructor(
      private authService:AuthService,
      private router:Router,
      private storageService:StorageService
    ) { }

  ngOnInit() {
    this.authService.userData$.subscribe((res:any) => {
      console.log(res);
        this.displayUserData = res;
      });
    
  }
  logout() {
    
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      localStorage.clear();
      window.location.reload();
      //this.router.navigate(['/login']);
    });
  }
}
