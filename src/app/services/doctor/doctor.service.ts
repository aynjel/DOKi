import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { AuthConstants } from '../../config/auth-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  /*
  retrieveUserDetails(postData1: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiUrl + "retrieveuserdetails?username="+postData1 ;

    return this.http.post(url, options);
  }
  getDoctorName(postData1: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiUrl + "getDoctorName?doctorcode="+postData1 ;

    return this.http.post(url, options);
  }
  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      return res;
    });
  }
    getDrCode(){
    let data="";
    this.authService.userData$.subscribe((res:any) => {
      let doctorsDetails = JSON.parse(JSON.stringify(res));
      doctorsDetails.forEach(el => {
        return data = el.dr_code;

      });
    });

    //return data;
  }

*/
  /* for doctors Portal */

  getInPatient(postData1: any) {
    return this.httpService.DoctorsPortalGet('Inpatient/Get/', postData1);
  }

  getCoDoctors(postData1: any) {
    return this.httpService.DoctorsPortalGet('Inpatient/CoDoctors/', postData1);
  }

  getAdmittingDiagnosis(postData1: any) {
    return this.httpService.DoctorsPortalGet(
      'Inpatient/AdmittingDiagnosis/',
      postData1
    );
  }

  getFinalDiagnosis(postData1: any) {
    return this.httpService.DoctorsPortalGet(
      'Inpatient/FinalDiagnosis/',
      postData1
    );
  }
  getYearHistoryGraph(postData1: any) {
    return this.httpService.DoctorsPortalGet(
      'Inpatient/YearHistoryGraph/',
      postData1
    );
  }

  getTotalCount(postData1: any) {
    return this.httpService.DoctorsPortalGet(
      'Inpatient/TotalCount/',
      postData1
    );
  }

  MonthHistoryGraph(postData1: any) {
    return this.httpService.DoctorsPortalGet(
      'Inpatient/MonthHistoryGraph/',
      postData1
    );
  }

  insertPF(data1: any) {
    return this.httpService.DoctorsPortalPostJSON('ProfFee/Insert', data1);
  }

  updatePF(data1: any) {
    return this.httpService.DoctorsPortalPutJSON('ProfFee/Update', data1);
  }

  DeletePf(accountNo: any, doctorStatusCode: any, doctorCode: string) {
    let x =
      '?accountno=' +
      accountNo +
      '&drstatuscode=' +
      doctorStatusCode +
      '&drcode=' +
      doctorCode;
    return this.httpService.DoctorsPortalDelete('ProfFee/Delete', x);
  }
  /* for doctors Portal */

  /*
 _____                        ______         _              
/  __ \                       | ___ \       | |             
| /  \/  __ _  ___   ___      | |_/ /  __ _ | |_   ___  ___ 
| |     / _` |/ __| / _ \     |    /  / _` || __| / _ \/ __|
| \__/\| (_| |\__ \|  __/     | |\ \ | (_| || |_ |  __/\__ \
 \____/ \__,_||___/ \___|     \_| \_| \__,_| \__| \___||___/
                                                            
                                                            
*/
  searchCaseRates(data1: any, data2: any, data3: any) {
    // http://10.130.21.172:59201/api/PhilHealthCaseRates/Search?phicSearch.caseClass=first&phicSearch.caseDesc=bone

    let data =
      '?phicSearch.caseClass=' +
      data1 +
      '&phicSearch.caseCode=' +
      data2 +
      '&phicSearch.caseDesc=' +
      data3;

    return this.httpService.searchCaseRates(data);
  }
}
