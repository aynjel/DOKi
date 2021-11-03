import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from "../services/storage/storage.service";
import { AuthConstants } from "../config/auth-constants";
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public storageService: StorageService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      let userIdentifier;
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {

            res.roles.forEach(element => {
                console.log(element);
                if(element == 'Administrator'){
                  userIdentifier = 'Administrator';
                }
            });
            
            if (userIdentifier  == 'Administrator') {
              resolve(true);
            } else {
              this.router.navigate(["/"]);
              resolve(false);
            }
        })
        .catch((err) => {
          resolve(false);
        });
    });
  }
  
}
