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
    const url = environment.apiUrl + "Schedules?Drcode="+postData1+"&ApptDate="+postData2+"&Site="+postData3;
    return this.http.get(url, options);
  }
  retrieveMTWTFSS(postData1: any,postData2: any,): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "DoctorSchedMaster/DocSchedMaster/"+postData1+"/"+postData2;
    console.log(url);
    return this.http.get(url, options);
  }
  retrieveTime(postData1: any,postData2: any,postData3: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    
    const url = environment.apiUrl + "Schedules?Drcode="+postData1+"&ApptDate="+postData2+"&Site="+postData3;
    console.log("URL : "+url);
    return this.http.get(url, options);
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

console.log("postData10 : "+postData10);
    /*onst url = environment.apiUrl + "InsertCMAAppt?username=&drcode="+postData1+
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
    "&slotno=1";*/
      if(!postData10){
        postData10 = "-";
      }
    let postData = 
        {
          "appt_id":0,
          "patient_username":postData1,
          "dr_code":postData1,
          "appt_date":postData2,
          "time_desc":postData3,
          "remarks":"Reserved",
          "status":1,
          "last_name":postData4,
          "first_name":postData5,
          "middle_name":postData6,
          "sex":postData7,
          "birth_Date":postData8,
          "address":postData9,
          "contact_number":postData10,
          "site":postData11,
          "ptype":"P",
          "datetime_created":null,
          "appt_by":"DoctorsPortal",
          "slot_no":1
        };
console.log(JSON.stringify(postData));
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const options = { headers: headers, withCredintials: false };
        const url = environment.apiUrl + 'CMAAppointmentMaster';
        return this.http.post(url, JSON.stringify(postData), options);



    //console.log(postData);
    //return this.http.post(postData, options);
  }
  deletePatients(postData1:any){

    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "CMAAppointmentMaster?ApptId=" + postData1 +"&ApptStatus=6&ApptRemarks=Cancelled";


    return this.http.put(url, options);
  }







  getPatientDetails(postData1: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "CMAAppointmentMaster/GetCMAAppointmentMaster/" + postData1 ;
    return this.http.get(url, options);
  }
 

}
