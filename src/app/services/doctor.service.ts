import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'; 
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  constructor(
    private httpService:HttpService,
    private storageService: StorageService,
    private router: Router,
    private authService:AuthService,
    private http: HttpClient
  ) {}

  retrieveUserDetails(postData1: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "retrieveuserdetails?username="+postData1 ;
    console.log("retrieveUserDetails --> "+url);
    return this.http.post(url, options);
  }
  getDoctorName(postData1: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + "getDoctorName?doctorcode="+postData1 ;
    console.log("getDoctorName --> "+url);
    return this.http.post(url, options);
  }
  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      return res;
    });
  }

  /* for doctors Portal */
  getDrCode(){
    let data="";
    this.authService.userData$.subscribe((res:any) => {
      let doctorsDetails = JSON.parse(JSON.stringify(res));
      doctorsDetails.forEach(el => {
        return data = el.dr_code;
        console.log(el.dr_code);
      });
    });
    console.log("-->"+data);
    //return data;
  }

  getInPatient(postData1: any){
    return this.httpService.get('Inpatient/Get/', postData1);
  }
  getCoDoctors(postData1: any){
    return this.httpService.get('Inpatient/CoDoctors/', postData1);
  }
  insertPF(data1:any){
    console.log("data1 : "+data1);
    return this.httpService.postJSON('ProfFee/Insert',data1);
    /*
    console.log(JSON.stringify(data1));
    if(data2 == "POST"){
      console.log("post method");
      return this.httpService.postJSON('ProfFee/Insert',data1);
    }else if(data2 == "PUT"){
      return this.httpService.putJSON('ProfFee/Update',data1);
    }else if(data2 == "DELETE"){
      return this.httpService.deleteJson('ProfFee/Delete',data1);
    }*/
  }
  updatePF(data1:any){
    return this.httpService.putJSON('ProfFee/Update',data1);   
  }
  DeletePf(data1:any,data2:any){
    let x = "?accountno="+data1+"&drstatuscode="+data2;
    return this.httpService.delete('ProfFee/Delete',x);   
  }
  /* for doctors Portal */
}
