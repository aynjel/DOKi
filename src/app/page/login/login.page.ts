import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { DoctorConstants } from '../../config/auth-constants';
import { AuthService } from '../../services/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from '../../services/toast.service';

import { BehaviorSubject } from 'rxjs';
import {Account} from '../../models/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
//account:Account[];



    constructor(
      private router: Router,
      private authService: AuthService,
      private storageService: StorageService,
      private toast:ToastService,
      private doctorService:DoctorService
     
    ) {}


    public postData = {
      username: '',
      password: ''
    };
      
    ngOnInit() {}
    
    validateInputs() {
    
     
      let username = this.postData.username.trim();
      let password = this.postData.password.trim();
      return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
      );
    }
    
    loginAction() {
      console.log("1");
      /**Working COPY DO NOT DELETE */
      /*For Doctors Portal
      this.authService.doctorsPortalLogin(this.postData.username, this.postData.password).subscribe(
        (res: any) => {
          console.log("doctors portal -->"+res);
          if(res != ""){
              console.log("doctors portal -->"+res);
            res.forEach(element => {
              console.log('dr_code -> '+element.dr_code);
              localStorage.setItem('dr_code',element.dr_code);
            });
            
            this.storageService.store(AuthConstants.AUTH, res);
            this.router.navigate(['/menu/tab1']);
          }else{
            this.toast.presentToast('Incorrect Authentication Details.');
          }

        });
        /*For Doctors Portal */




      
      if (this.validateInputs()) {
        this.authService.logintest(this.postData.username, this.postData.password).subscribe(
          (res: any) => {
            if (res == "true:D") {
              this.doctorService.retrieveUserDetails(this.postData.username).subscribe(
                (result:any)=>{
                  console.log("result.last_name --> "+result.last_name);
                  localStorage.setItem('dr_code',result.last_name);
                  this.doctorService.getDoctorName(result.last_name).subscribe(
                    (doctordetail:any)=>{
                      console.log("doctordetail --> "+JSON.stringify(doctordetail));
                        this.storageService.store(AuthConstants.AUTH, doctordetail);
                        this.router.navigate(['/menu/tab1']);
                    }
                  );
                }
              );
            } else {
              this.toast.presentToast('incorrect password.');
            }
          },(error: any) => {
          }
        );
      } else {
      }
      
    }

 
}
