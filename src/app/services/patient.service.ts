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
  retrieveMTWTFSS(postData1: any,postData2: any,): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "retrieveSchedule?dr_code="+postData1+"&site="+postData2;
    console.log(url);
    return this.http.post(url, options);
  }
  retrieveTime(postData1: any,postData2: any,postData3: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "retrieveSchedTime?dr_code="+postData1+"&apptdate="+postData2+"&site="+postData3;
    console.log(url);
    return this.http.post(url, options);
  }


  addAppointments(postData1: any,
    postData2: any,
    postData3: any,
    postData4: any,
    postData5: any,
    postData6: any,
    postData7: any,
    postData8: any,
    postData9: any,
    postData10: any,
    postData11: any
    ): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "InsertCMAAppt?username=&drcode="+postData1+
    "&app_date="+postData2+
    "&timedesc="+postData3+
    "&remarks=Reserved"+
    "&status=1"+
    "&lastname="+postData4+
    "&firstname="+postData5+
    "&middlename="+postData6+
    "&sex="+postData7+
    "&birthdate="+postData8+
    "&address="+postData9+
    "&contactno="+postData10+
    "&_site="+postData11+
    "&ptype=P"+
    "&appt_by=0094773"+
    "&slotno=1";
    console.log(url);
    return this.http.post(url, options);
  }
  deletePatients(postData1:any){

    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "UpdateCMAAppt?appt_id=" + postData1 +"remarks=Cancelled&status=6";
    console.log(url);

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
