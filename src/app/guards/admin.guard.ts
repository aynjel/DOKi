import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from "../services/storage/storage.service";
import { AuthConstants } from "../config/auth-constants";
import { FunctionsService } from '../shared/functions/functions.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public storageService: StorageService, public router: Router,  public functionsService: FunctionsService) {}
  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      let userIdentifier;
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
            if(res){
              let execcheck:boolean = true;
              res.roles.forEach(element => {
                  this.functionsService.logToConsole(element);
                  if(execcheck){
                    if(element == 'Administrator'){
                      userIdentifier = 'Administrator';
                    }else if(element == 'Executive'){
                      userIdentifier = 'Executive';
                      execcheck = false;
                    }
                  }
              });
              
              if (userIdentifier  == 'Administrator') {
                resolve(true);
              } else {             
                this.router.navigate(["/login"]);
                resolve(false);
              }
            }else{
              this.router.navigate(["/login"]);
              resolve(false);
            }
        })
        .catch((err) => {
          resolve(false);
        });
    });
  }
  
}
