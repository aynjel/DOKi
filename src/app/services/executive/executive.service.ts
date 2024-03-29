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
import { delay, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ExecutiveService {
  dokiErList$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    public functionsService: FunctionsService
  ) {}
  totalAdmissionsV3() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url = environment.apiRouterUrl + 'v3/Dashboard/Admin/TotalAdmissions';
    return this.http.get(url, options);
  }
  totalAdmissionsTodayV3() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url =
      environment.apiRouterUrl + 'v3/Dashboard/Admin/TotalNewAdmissionsToday';
    return this.http.get(url, options);
  }

  getMontlyTotalAdmissions(year: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url =
      environment.apiRouterUrl +
      'v3/Dashboard/Admin/YTDTotalAdmissionsByMonth' +
      '?year=' +
      year;
    return this.http.get(url, options);
  }
  getYTDDailyAvgCensusByMonth(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.apiRouterUrl +
      'v3/Dashboard/Admin/YTDDailyAvgCensusByMonth?year=' +
      data;
    return this.http.get(url, options);
  }

  getYTDAverageLOSByMonth(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.apiRouterUrl +
      'v3/Dashboard/Admin/YTDAverageLOSByMonth?year=' +
      data;
    return this.http.get(url, options);
  }

  forDischargeV3() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url =
      environment.apiRouterUrl + 'v3/Dashboard/Admin/TotalForDischarge';
    return this.http.get(url, options);
  }
  getDoctors() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url =
      environment.apiRouterUrl + 'v3/Dashboard/Admin/AllDoctorsWithInPatients';
    return this.http.get(url, options);
  }
  getPatients() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url = environment.apiRouterUrl + 'v3/Dashboard/Admin/AllInPatients';
    return this.http.get(url, options);
  }
  getTotalAdmissionsByDept() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url =
      environment.apiRouterUrl + 'v3/Dashboard/Admin/TotalAdmissionsByDept';
    return this.http.get(url, options);
  }
  getTotalCovidPxTypesBySite() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url =
      environment.apiRouterUrl + 'v3/Dashboard/Admin/TotalCovidPxTypesBySite';
    return this.http.get(url, options);
  }

  getTotalAdmissionsByDeptAndSite() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url =
      environment.apiRouterUrl +
      'v3/Dashboard/Admin/TotalAdmissionsByDeptAndSite ';
    return this.http.get(url, options);
  }
  getTotalPxTypesBySite() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url =
      environment.apiRouterUrl + 'v3/Dashboard/Admin/TotalPxTypesBySite';
    return this.http.get(url, options);
  }
  geInpatients(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url = environment.apiRouterUrl + 'v3/Admin/Doctors/InPatients';
    return this.http.post(url, data, options);
  }
  getAdmittingDiagnosis(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url =
      environment.apiRouterUrl +
      'v3/Admin/Doctors/InPatients/AdmittingDiagnosis';
    return this.http.post(url, data, options);
  }
  getFinalDiagnosis(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url =
      environment.apiRouterUrl + 'v3/Admin/Doctors/InPatients/FinalDiagnosis';
    return this.http.post(url, data, options);
  }
  getCovidVsNonCovidOccupancyCurrentYear() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url =
      environment.apiRouterUrl +
      'v3/Dashboard/Admin/CovidVsNonCovidOccupancyCurrentYear';
    return this.http.get(url, options);
  }
  getCoDoctors(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url =
      environment.apiRouterUrl + 'v3/Admin/Doctors/InPatients/CoDoctors';
    return this.http.post(url, data, options);
  }
  getPatientDetail(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url = environment.apiRouterUrl + 'v3/InPatients/Admin/PatientDetail';
    return this.http.post(url, data, options);
  }
  getERList(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url =
      environment.apiRouterUrl +
      'v3/Dashboard/Admin/ERListing?startDate=' +
      data;
    return this.http.get(url, options);
  }
  getErPatientDetail(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    // const url = environment.apiRouterUrl + 'v3/InPatients/Admin/PatientDetail';
    const url = environment.dischargeInstruction + "gw/DokiER/DokiErList";
    return this.http.post(url, data, options);
  }
  getDoctorsDirectory() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + 'v3/DoctorsDirectory';
    return this.http.get(url, options);
  }

  getDoctorInfo(data) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + 'v3/DoctorsDirectory/DoctorDetail';
    return this.http.post(url, data, options);
  }
}
