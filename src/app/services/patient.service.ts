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
export class PatientService {


  constructor(
    private httpService:HttpService,
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) {}



  retrieveSchedTime(postData1: any,postData2: any,postData3: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    //
    const url = environment.apiUrl + "retrieveSchedTime?dr_code="+postData1+"&apptdate="+postData2+"&site="+postData3+"&0=j&1=s&2=o&3=n&4=p&_=1591686341293" ;
    return this.http.post(url, options);
  }
  getPatientDetails(postData1: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    //
    const url = environment.apiUrl + "getpatientdetails?apptid=" + postData1 ;
    return this.http.post(url, options);
  }
 

}
