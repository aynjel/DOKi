import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { DoctorConstants } from '../../config/auth-constants';
import { AuthService } from '../../services/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from '../../services/toast.service';

import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {




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
      
      
      if (this.validateInputs()) {

        this.authService.logintest(this.postData.username, this.postData.password).subscribe(
          (res: any) => {
            if (res == "true:D") {
              this.doctorService.retrieveUserDetails(this.postData.username).subscribe(
                (result:any)=>{
                  this.doctorService.getDoctorName(result.last_name).subscribe(
                    (doctordetail:any)=>{
                        this.storageService.store(AuthConstants.AUTH, doctordetail);
                        this.router.navigate(['/menu/tab1']);
                    }
                  );
                }
              );
              // Storing the User data.
              //this.storageService.store(AuthConstants.AUTH, res.userData);
              //this.router.navigate(['home/feed']);
              //localStorage.setItem('isLoggedin','true');
            } else {
              this.toast.presentToast('incorrect password.');
            }
          },(error: any) => {
            //localStorage.setItem('isLoggedin','false');
            //this.toastService.presentToast('Network Issue.');
          }
        );
      } else {
        //localStorage.setItem('isLoggedin','false');
        //this.toastService.presentToast('Please enter email/username or password.');
      }
    }

 
}
