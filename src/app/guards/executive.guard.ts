import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from "../services/storage/storage.service";
import { AuthConstants } from "../config/auth-constants";
import { FunctionsService } from '../shared/functions/functions.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveGuard implements CanActivate {
  constructor(public storageService: StorageService, public router: Router,  public functionsService: FunctionsService) {}
  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      let userIdentifier;
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
              //console.log('EXECUTIVE');
              if(res){
                res.roles.forEach(element => {
                  //console.log('1');
                  
                    //this.functionsService.logToConsole(element);
                    if(element == 'Executive'){
                      userIdentifier = 'Executive';
                    }
                });
                //console.log('2');
                if (userIdentifier  == 'Executive') {
                  //console.log('3');
                  //console.log('Executive');
                  resolve(true);
                } else {
                  //console.log('executive');
                  //console.log('4');
                  this.router.navigate(["/login"]);
                  resolve(false);
                }
              }else{
                //console.log('false');
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
