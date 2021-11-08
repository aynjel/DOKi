import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthConstants } from "../config/auth-constants";
import { StorageService } from "../services/storage/storage.service";
import { FunctionsService } from "../shared/functions/functions.service";

@Injectable({
  providedIn: "root",
})

export class HomeGuard implements CanActivate {
  constructor(public storageService: StorageService, public router: Router,    public functionsService: FunctionsService) {}
  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      let userIdentifier1 = "";
      let userIdentifier2 = "";
      this.storageService.get(AuthConstants.AUTH).then(
          (res) => {
            res.roles.forEach(element => {
              this.functionsService.logToConsole(element);
              if(element == 'Administrator'){
                userIdentifier1 = 'Administrator';
              }else if(element == 'MedicalConsultant'){
                userIdentifier2 = 'MedicalConsultant';
              }
          });
          if(userIdentifier1 == 'Administrator' ){
            this.router.navigate(["/administrator"]);
            resolve(false);
          }else if (userIdentifier2 == 'MedicalConsultant'){
            resolve(true);
          }else{
            this.router.navigate(["/"]);
            resolve(false);
          }
          /*
          if (userIdentifier  == 'Administrator') {
            this.router.navigate(["/Administrator"]);
            resolve(false);
          } else {
            this.router.navigate(["/"]);
            resolve(false);
          }*/
            
            if (res) {
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
