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
  providedIn: 'root',
})
export class DoctorService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    public functionsService: FunctionsService
  ) {}
  getInPatient(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(newLink+'/Get/', postData1);
  }
  getCoDoctors(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(newLink+'/CoDoctors/', postData1);
  }
  getAdmittingDiagnosis(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink+'/AdmittingDiagnosis/',
      postData1
    );
  }
  getFinalDiagnosis(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink+'/FinalDiagnosis/',
      postData1
    );
  }
  getYearHistoryGraph(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink+'/YearHistoryGraph/',
      postData1
    );
  }
  getTotalCount(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink+'/TotalCount/',
      postData1
    );
  }
  MonthHistoryGraph(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink+'/MonthHistoryGraph/',
      postData1
    );
  }
  insertPF(data1: any) {
    let newLink = this.functionsService.isLocalorLive("ProfFee");
    return this.httpService.DoctorsPortalPostJSON(newLink+'/Insert', data1);
  }
  updatePF(data1: any) {
    let newLink = this.functionsService.isLocalorLive("ProfFee");
    return this.httpService.DoctorsPortalPutJSON(newLink+'/Update', data1);
  }
  DeletePf(accountNo: any, doctorStatusCode: any, doctorCode: string) {
    let newLink = this.functionsService.isLocalorLive("ProfFee");
    let x =
      '?accountno=' +
      accountNo +
      '&drstatuscode=' +
      doctorStatusCode +
      '&drcode=' +
      doctorCode;
    return this.httpService.DoctorsPortalDelete(newLink+'/Delete', x);
  }

  /*
 _____                        ______         _              
/  __ \                       | ___ \       | |             
| /  \/  __ _  ___   ___      | |_/ /  __ _ | |_   ___  ___ 
| |     / _` |/ __| / _ \     |    /  / _` || __| / _ \/ __|
| \__/\| (_| |\__ \|  __/     | |\ \ | (_| || |_ |  __/\__ \
 \____/ \__,_||___/ \___|     \_| \_| \__,_| \__| \___||___/
                                                            
                                                            
*/
  searchCaseRates(data1: any, data2: any, data3: any) {
    let data =
      '?phicSearch.caseClass=' +
      data1 +
      '&phicSearch.caseCode=' +
      data2 +
      '&phicSearch.caseDesc=' +
      data3;

    return this.httpService.searchCaseRates(data);
  }
  /////////////////////
  getYearHistoryGraphV2(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "v2/Inpatients/YearHistory";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/YearHistory";
    return this.http.post(url,  postData1, options);
  }
  getMonthHistoryGraphV2(postData1: any) {
   
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "v2/Inpatients/MonthHistory";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/MonthHistory";
    return this.http.post(url,  postData1, options);
  }
  getTotalCountV2(postData1: any) {
   
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "v2/Inpatients/Total";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/Total";
    return this.http.post(url,  postData1, options);
  }
  getInPatientV2(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "v2/Inpatients";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients";
    return this.http.post(url,  postData1, options);
  }
  getCoDoctorsV2(postData1: any) {
    
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "v2/Inpatients/CoDoctors";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/CoDoctors";
    return this.http.post(url,  postData1, options);
  }
  getAdmittingDiagnosisV2(postData1: any) {

    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "v2/Inpatients/AdmittingDiagnosis";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/FinalDiagnosis";
    return this.http.post(url,  postData1, options);
  }
  getFinalDiagnosisV2(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "v2/Inpatients/FinalDiagnosis";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/AdmittingDiagnosis";
    return this.http.post(url,  postData1, options);
  }
  insertPFV2(data1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "v2/ProfFee";
    return this.http.post(url,  data1, options);
    
  }
  updatePFV2(data1: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + "v2/ProfFee";
    //return this.http.put(url, JSON.stringify(data), options);
    return this.http.put(url, data1, options);
  }
  searchCaseRatesV2(data1: any, data2: any, data3: any, data4: any) {
    let data =
      '?phicSearch.caseClass=' +
      data1 +
      '&phicSearch.caseCode=' +
      data2 +
      '&phicSearch.caseDesc=' +
      data3+
      '&phicSearch.mode=' +
      data4;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
      });
      const options = { headers: headers, withCredentials: false, data };
      const url = environment.apiRouterUrl+ 'v2/PhilHealthCaseRates/Search' + data;
      return this.http.get(url);
  }
  getProfileExpiry(data1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "DocLicenseExpiry";
    //const url ='http://10.130.21.201:9321/api/DocLicenseExpiry';
    return this.http.post(url,  data1, options);
    
  }
  //////////////////////////////v3/////////////////////////
  loginV3(data:any){
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    //const url = environment.apiRouterUrl + "v2/Login";
    const url = "http://10.130.21.190:5002/api/v3/User/Token";
    return this.http.post(url,  data, options);
  }
  getUserSettingsV3(){
    //const headers = new HttpHeaders();
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredintials: false };
   //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
   const url = 'http://10.130.21.190:5002/api/v3/UserSettings';
    return this.http.get(url, options);
  }
  getAppSettingsV3(){
    //const headers = new HttpHeaders();
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredintials: false };
   //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
   const url = '  http://10.130.21.190:5002/api/v3/AppSettings';
    return this.http.get(url, options);
  }
  insertUserSettingsV3(data:any){
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    //const url = environment.apiRouterUrl + "v2/Login";
    const url = "http://10.130.21.190:5002/api/v3/UserSettings";
    return this.http.post(url,  data, options);
  }
  updateUserSettingsV3(data:any){
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    //const url =    environment.apiRouterUrl + "v2/UserSetting";
    const url = "http://10.130.21.190:5002/api/v3/UserSettings";
    return this.http.put(url, data, options);
  }

  getYearHistoryGraphV3(){
    const headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8',});
    const options = { headers: headers, withCredintials: false };
   //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
   const url = "http://10.130.21.190:5002/api/v3/InPatients/YearHistory";
    return this.http.get(url, options);
  }
}
