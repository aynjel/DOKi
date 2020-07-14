import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import {Account} from '../models/account';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
account:Account;
  userData$ = new BehaviorSubject<Account>(null);


  constructor(
    private httpService:HttpService,
    private storageService: StorageService,
    private router: Router,
    
  ) {}


  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      this.userData$.next(res);
    });
  }

  login(postData: any): Observable<any> {
    return this.httpService.postJSON('login', postData);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.postJSON('signup', postData);
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      this.userData$.next(null);
      this.router.navigate(['/login']);
    });
  }

  logintest(postData1: any,postData2: any,): Observable<any> {
    return this.httpService.posttest('Userlogin', postData1, postData2);
  }

  /*For Doctors Portal */
  doctorsPortalLogin(postData1: any,postData2: any,): Observable<any> {
    postData2 = encodeURIComponent(postData2);
    let str = 'drcode='+postData1+'&birthday='+postData2;
    return this.httpService.get('Login/Get?', str);
  }
  doctorsPortalLoginAppointments(postData1: any,postData2: any){
    return this.httpService.getAppointments('Login/Get?', postData1, postData2);
  }
  /*For Doctors Portal */


}