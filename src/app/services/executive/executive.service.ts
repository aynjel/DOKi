import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { AuthConstants } from '../../config/auth-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
@Injectable({
  providedIn: 'root'
})
export class ExecutiveService {

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    public functionsService: FunctionsService
  ) {}
  totalAdmissionsV3() {
    const headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8',});
    const options = { headers: headers, withCredentials: true };
   //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
   const url =    environment.apiRouterUrl + "v3/Dashboard/Admin/TotalAdmissions";
    return this.http.get(url, options);
  }
  totalAdmissionsTodayV3() {
    const headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8',});
    const options = { headers: headers, withCredentials: true };
   //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
   const url =    environment.apiRouterUrl + "v3/Dashboard/Admin/TotalNewAdmissionsToday";
    return this.http.get(url, options);
  }
  forDischargeV3() {
    const headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8',});
    const options = { headers: headers, withCredentials: true };
   //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
   const url =    environment.apiRouterUrl + "v3/Dashboard/Admin/TotalForDischarge";
    return this.http.get(url, options);
  }
  getDoctors() {
    const headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8',});
    const options = { headers: headers, withCredentials: true };
   //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
   const url =    environment.apiRouterUrl + "v3/Dashboard/Admin/AllDoctorsWithInPatients";
    return this.http.get(url, options);
  }
}
