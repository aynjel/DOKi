import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'; 



@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  constructor(
    private httpService:HttpService,
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) {}

  retrieveUserDetails(postData1: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "retrieveuserdetails?username="+postData1 ;
    return this.http.post(url, options);
  }
  getDoctorName(postData1: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "getDoctorName?doctorcode="+postData1 ;
    return this.http.post(url, options);
  }
  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      return res;
    });
  }
}
