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
            let execcheck:boolean = true;
            res.roles.forEach(element => {
              //this.functionsService.logToConsole(element);
              if(execcheck){
                if(element == 'Administrator'){
                  userIdentifier1 = 'Administrator';
                }else if(element == 'MedicalConsultant'){
                  userIdentifier2 = 'MedicalConsultant';
                }else if(element == 'Executive'){
                  userIdentifier1 = 'Executive';
                  execcheck = false;
                }
              }

          });
          //console.log(localStorage.getItem('role_flag'));
          if(localStorage.getItem('role_flag') == 'medcons'){
            resolve(true);
          }else if(localStorage.getItem('role_flag') == 'exec'){
            this.router.navigate(["/executive"]);
            resolve(false);
          }else{
            if(userIdentifier1 == 'Administrator' ){
              this.router.navigate(["/administrator"]);
              resolve(false);
            }else if(userIdentifier1 == 'Executive' ){
              this.router.navigate(["/executive"]);
              resolve(false);
            }else if (userIdentifier2 == 'MedicalConsultant'){
              resolve(true);
            }else{
              this.router.navigate(["/"]);
              resolve(false);
            }
          }

          /*
          if (userIdentifier  == 'Administrator') {
            this.router.navigate(["/Administrator"]);
            resolve(false);
          } else {
            this.router.navigate(["/"]);
            resolve(false);
          }
            
            if (res) {
              resolve(true);
            } else {
              this.router.navigate(["/"]);
              resolve(false);
            }*/
        })
        .catch((err) => {
          resolve(false);
        });
    });
  }
}
