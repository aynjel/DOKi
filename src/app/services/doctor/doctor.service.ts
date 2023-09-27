import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../storage/storage.service";
import { AuthConstants } from "../../config/auth-constants";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from "../http/http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { AuthService } from "src/app/services/auth/auth.service";
import { FunctionsService } from "src/app/shared/functions/functions.service";

@Injectable({
  providedIn: "root",
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
    return this.httpService.DoctorsPortalGet(newLink + "/Get/", postData1);
  }
  getCoDoctors(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink + "/CoDoctors/",
      postData1
    );
  }
  getAdmittingDiagnosis(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink + "/AdmittingDiagnosis/",
      postData1
    );
  }
  getFinalDiagnosis(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink + "/FinalDiagnosis/",
      postData1
    );
  }
  getYearHistoryGraph(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink + "/YearHistoryGraph/",
      postData1
    );
  }
  getTotalCount(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink + "/TotalCount/",
      postData1
    );
  }
  MonthHistoryGraph(postData1: any) {
    let newLink = this.functionsService.isLocalorLive("Inpatient");
    return this.httpService.DoctorsPortalGet(
      newLink + "/MonthHistoryGraph/",
      postData1
    );
  }
  insertPF(data1: any) {
    let newLink = this.functionsService.isLocalorLive("ProfFee");
    return this.httpService.DoctorsPortalPostJSON(newLink + "/Insert", data1);
  }
  updatePF(data1: any) {
    let newLink = this.functionsService.isLocalorLive("ProfFee");
    return this.httpService.DoctorsPortalPutJSON(newLink + "/Update", data1);
  }
  DeletePf(accountNo: any, doctorStatusCode: any, doctorCode: string) {
    let newLink = this.functionsService.isLocalorLive("ProfFee");
    let x =
      "?accountno=" +
      accountNo +
      "&drstatuscode=" +
      doctorStatusCode +
      "&drcode=" +
      doctorCode;
    return this.httpService.DoctorsPortalDelete(newLink + "/Delete", x);
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
      "?phicSearch.caseClass=" +
      data1 +
      "&phicSearch.caseCode=" +
      data2 +
      "&phicSearch.caseDesc=" +
      data3;

    return this.httpService.searchCaseRates(data);
  }
  /////////////////////
  getYearHistoryGraphV2(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v2/Inpatients/YearHistory";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/YearHistory";
    return this.http.post(url, postData1, options);
  }
  getMonthHistoryGraphV2(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v2/Inpatients/MonthHistory";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/MonthHistory";
    return this.http.post(url, postData1, options);
  }
  getTotalCountV2(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v2/Inpatients/Total";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/Total";
    return this.http.post(url, postData1, options);
  }
  getInPatientV2(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v2/Inpatients";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients";
    return this.http.post(url, postData1, options);
  }
  getCoDoctorsV2(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v2/Inpatients/CoDoctors";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/CoDoctors";
    return this.http.post(url, postData1, options);
  }
  getAdmittingDiagnosisV2(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v2/Inpatients/AdmittingDiagnosis";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/FinalDiagnosis";
    return this.http.post(url, postData1, options);
  }
  getFinalDiagnosisV2(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v2/Inpatients/FinalDiagnosis";
    //const url = "http://10.128.18.75:8088/api/v2/Inpatients/AdmittingDiagnosis";
    return this.http.post(url, postData1, options);
  }
  insertPFV2(data1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v2/ProfFee";
    return this.http.post(url, data1, options);
  }
  updatePFV2(data1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + "v2/ProfFee";
    //return this.http.put(url, JSON.stringify(data), options);
    return this.http.put(url, data1, options);
  }
  searchCaseRatesV2(data1: any, data2: any, data3: any, data4: any) {
    let data =
      "?phicSearch.caseClass=" +
      data1 +
      "&phicSearch.caseCode=" +
      data2 +
      "&phicSearch.caseDesc=" +
      data3 +
      "&phicSearch.mode=" +
      data4;

    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: false, data };
    const url =
      environment.apiRouterUrl + "v2/PhilHealthCaseRates/Search" + data;
    return this.http.get(url);
  }
  getProfileExpiry(data1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "DocLicenseExpiry";
    const url = "http://10.128.18.75:8096/api/DocLicenseExpiry";
    return this.http.post(url, data1, options);
  }
  //////////////////////////////v3/////////////////////////
  loginV3(data: any) {
    //const headers = new HttpHeaders({ "Content-Type": "application/json" });
    //const headers = new HttpHeaders();
    /* const headers = new HttpHeaders({ "Content-Type": "application/json;charset=utf-8" });
    const options = { headers: headers, withCredentials: true };*/

    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),

      withCredentials: true,
      observe: "response" as "response",
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json;",
    });
    const options = { headers: headers, withCredentials: true };

    const url = environment.apiRouterUrl + "v3/User/Token";
    //const url =    environment.apiRouterUrl + "v3/User/Token";
    return this.http.post(url, data, options);
  }
  getUserSettingsV3() {
    //const headers = new HttpHeaders();

    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v3/UserSettings";
    //const url = 'http://10.130.21.210:5002/api/v3/UserSettings';
    return this.http.get(url, options);
  }
  getAppSettingsV3() {
    //const headers = new HttpHeaders();

    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v3/AppSettings";
    //const url = '  http://10.130.21.210:5002/api/v3/AppSettings';
    return this.http.get(url, options);
  }
  insertUserSettingsV3(data: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrl + "v3/UserSettings";
    //const url =    environment.apiRouterUrl + "v3/UserSettings";
    return this.http.post(url, data, options);
  }
  updateUserSettingsV3(data: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url =    environment.apiRouterUrl + "v2/UserSetting";
    const url = environment.apiRouterUrl + "v3/UserSettings";
    return this.http.put(url, data, options);
  }

  getYearHistoryGraphV3() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url = environment.apiRouterUrl + "v3/Dashboard/Past12Months";
    return this.http.get(url, options);
  }
  getInPatientV3() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url = environment.apiRouterUrl + "v3/InPatients";
    return this.http.get(url, options);
  }
  getInPatientHistoryV3() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url = environment.callHistory + "/gw/doki/InPatients/PatientHistory";
    return this.http.get(url, options);
  }
  getCoDoctorsV3(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    // const url = environment.apiRouterUrl + "v2/Inpatients/CoDoctors";
    const url = environment.apiRouterUrl + "v3/InPatients/CoDoctors";
    return this.http.post(url, postData1, options);
  }
  getAdmittingDiagnosisV3(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/Inpatients/AdmittingDiagnosis";
    const url = environment.apiRouterUrl + "v3/InPatients/AdmittingDiagnosis";
    return this.http.post(url, postData1, options);
  }
  getFinalDiagnosisV3(postData1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/Inpatients/FinalDiagnosis";
    const url = environment.apiRouterUrl + "v3/InPatients/FinalDiagnosis";
    return this.http.post(url, postData1, options);
  }
  insertPFV3(data1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url = environment.apiRouterUrl + "v3/ProfessionalFee";
    return this.http.post(url, data1, options);
  }
  updatePFV3(data1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url = environment.apiRouterUrl + "v3/ProfessionalFee";
    return this.http.put(url, data1, options);
  }
  getNewsFeedV3() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url = environment.apiRouterUrl + "NewsFeed";
    return this.http.get(url, options);
  }
  getMonthHistoryGraphV3() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url = environment.apiRouterUrl + "v3/Dashboard/Past30Days";
    return this.http.get(url, options);
  }
  getTotalCountV3(postData1: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + 'v2/AppSetting/User/'+Consta.appCode+'/'+data1+'/'+Consta.mode;
    const url = environment.apiRouterUrl + "v3/Dashboard/CurrentTotal";
    return this.http.get(url, options);
  }

  searchCaseRatesV3(data1: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url = environment.apiRouterUrl + "v3/PhilHealthCaseRates";
    return this.http.post(url, data1, options);
  }
  refreshTokenV3() {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url = environment.apiRouterUrl + "v3/User/RefreshToken";
    return this.http.post(url, options);
  }
  changePasswordV3(data: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url = environment.apiRouterUrl + "v3/User/ChangePassword";
    return this.http.post(url, data, options);
  }
  revokeTokenV3(data: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url = environment.apiRouterUrl + "v3/User/RevokeToken";
    return this.http.post(url, data, options);
  }
  forgotPasswordV3(data: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url = environment.apiRouterUrl + "v3/User/ForgotPassword";
    return this.http.post(url, data, options);
  }
  resetPasswordV3(data: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiRouterUrl + "v2/ProfFee";
    const url = environment.apiRouterUrl + "v3/User/ResetPassword";
    return this.http.post(url, data, options);
  }

  getProgressNotes1(postData1: any) {
    /*
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    // IPM000230423;
    const options = { headers: headers, withCredentials: true };
    const url = 'http://10.151.12.120/api/ProgressNotes/IPM000230423';
    //const url = environment.apiRouterUrl + 'v3/Dashboard/CurrentTotal';
    return this.http.get(url, options);
*/
  }
  getProgressNotes(data) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;",
    });
    const options = { headers: headers, withCredentials: true };
    //const url = environment.apiResident + 'api/ProgressNotes/' + data;
    const url = "http://10.151.12.120/api/ProgressNotes/" + data;
    return this.http.post(url, data, options);
  }
  getPatientProgressNotesHistory(data) {
    //http://10.151.12.120:7230/api/ProgressNotes/Logs/PerTransNo
    const headers = new HttpHeaders({
      "Content-Type": "application/json;",
    });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.apiRouterUrlTest + "/gw/resi/ProgressNotes/Logs/PerTransNo";
    return this.http.post(url, data, options);
  }
  addComment(data) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.apiRouterUrlTest + "/gw/resi/ProgressNotesComment/Insert";
    return this.http.post(url, data, options);
  }

  testViewpdf() {
    const httpOptions = {
      responseType: "blob" as "json",
    };
    return this.http.get(
      "http://10.151.12.120:7227/api/dokipfregcollect/pdf",
      httpOptions
    );
    /*const options = { headers: headers };
    const url = 'http://10.130.21.225:6113/api/PdfGenerator';
    return this.http.get(url, options);*/
  }

  getDOKiPFRegularSOA(data) {
    const url = "http://10.151.12.120:7227/api/dokipfregcollect/pdf";
    return this.http.post(url, data, { responseType: "blob" });
  }
  getDOKiPFRegularSOAPreview(drCode, mode, fromDate, toDate, site) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    const url =
      "http://10.151.12.120:7227/api/dokipfregcollect/datapreview?drCode=" +
      drCode +
      "&mode=" +
      mode +
      "&fromDate=" +
      fromDate +
      "&toDate=" +
      toDate +
      "&site=" +
      site;
    return this.http.get(url, options);
  }
  getDOKiPFPhicCaseRatesSOA(data) {
    const url = "http://10.151.12.120:7227/api/dokipfphiccaserates/pdf";
    return this.http.post(url, data, { responseType: "blob" });
  }
  getDOKiPFPhicCaseRatesSOAPreview(drCode, mode, fromDate, toDate, site) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    const url =
      "http://10.151.12.120:7227/api/dokipfphiccaserates/datapreview?drCode=" +
      drCode +
      "&mode=" +
      mode +
      "&fromDate=" +
      fromDate +
      "&toDate=" +
      toDate +
      "&site=" +
      site;
    return this.http.get(url, options);
  }

  getDOKiPFReadersFeeSOA(data) {
    const url = "http://10.151.12.120:7227/api/dokipfreadersfee/pdf";
    return this.http.post(url, data, { responseType: "blob" });
  }
  getDOKiPFReadersFeeSOAPreview(drCode, mode, fromDate, toDate, site) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    const url =
      "http://10.151.12.120:7227/api/dokipfreadersfee/datapreview?drCode=" +
      drCode +
      "&mode=" +
      mode +
      "&fromDate=" +
      fromDate +
      "&toDate=" +
      toDate +
      "&site=" +
      site;
    return this.http.get(url, options);
  }

  testAdultApproval(data) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url = "http://10.151.12.120/api/MedicalAbstract/AdultApproval";
    //return this.http.put(url, JSON.stringify(data), options);
    return this.http.put(url, data, options);
  }
  getMedicalAbstract(data) {
    const httpOptions = {
      responseType: "blob" as "json",
    };
    //10.151.12.120:7227/api/medicalabstract/pdf/IPM000125711

    http: return this.http.get(
      "http://10.151.12.120:7227/api/medicalabstract/pdf?accountNo=" + data,
      httpOptions
    );
  }

  getMedicalCertificate(x) {
    const httpOptions = {
      responseType: "blob" as "json",
    };
    //10.151.12.120:7227/api/medicalabstract/pdf/IPM000125711
    http: return this.http.get(
      "http://10.151.12.120:7227/api/medcert/pdf?mode=T&account_no=IPM000125711",
      httpOptions
    );
  }
  getMedicalCertificatePOST(data) {
    //console.log(data);

    const url = environment.apiRouterUrlTest + "/gw/doki/medcert/pdf";
    return this.http.post(url, data, { responseType: "blob" });
  }
  getMedicalAbstractPOST(data) {
    const url = environment.apiRouterUrlTest + "/gw/doki/medicalabstract/pdf";
    //const url = "https://api.chonghua.com.ph/gw/doki/medicalabstract/pdf";
    return this.http.post(url, data, { responseType: "blob" });
  }
  //IPM000046433&patientno=180100052974
  getDischargeInstruction(pno, admissionno) {
    const httpOptions = {
      responseType: "blob" as "json",
    };
    const url =
      environment.API_URL +
      "/gw/DischargeInstruction/pdf?mode=T&accountno=" +
      admissionno +
      "&patientno=" +
      pno;
    return this.http.get(url, httpOptions);

    //   return this.http.post(url, "", { responseType: "blob" });
  }

  //save medcert
  approveMedicalCertificate(data) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrlTest + "/gw/doki/medcert/approve";
    //return this.http.put(url, JSON.stringify(data), options);
    return this.http.put(url, data, options);
  }
  approveMedicalAbstract(data) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url =
      environment.apiRouterUrlTest +
      "/gw/MedicalAbstract/ApproveRevokedMedAbstractDOKi";
    //const url =      "http://10.151.12.120:7237/api/MedicalAbstract/ApproveRevokedMedAbstractDOKi";
    console.log(url);

    return this.http.put(url, data, options);
  }
  getPendingApproval(data) {
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.apiRouterUrl + 'v3/DischargeDiagnosis/PendingApproval';
    return this.http.get(url, options);
*/

    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url =
      environment.apiRouterUrlTest +
      "/gw/doki/DischargeDiagnosis/PendingApproval";

    return this.http.post(url, data, options);
  }
  getApprovalStatus(data) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + "v3/DischargeDiagnosis/Status";
    return this.http.post(url, data, options);
  }
  cancelApprovedFinalDiagnosis(data) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    // const url =      environment.apiRouterUrl + 'v3/DischargeDiagnosis/CancelApproval';

    const url =
      environment.apiRouterUrl + "v3/DischargeDiagnosis/CancelApproval";

    return this.http.put(url, data, options);
  }
  //approve discharge diagnosis
  approvePendingApproval(data) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url =
      environment.apiRouterUrlTest + "/gw/doki/DischargeDiagnosis/Approve";
    return this.http.put(url, data, options);
  }

  getMedicalAbstractList(drCode: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.dischargeInstruction +
      "gw/MedicalAbstract/MedicalAbstractDOKiList?drCode=" +
      drCode;

    return this.http.get(url, options);
  }
  getDI(endPoint) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
    });
    const options = { headers: headers, withCredentials: true };
    const url = environment.dischargeInstruction + endPoint;
    return this.http.get(url, options);
  }
  postDI(endPoint, data) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url = environment.dischargeInstruction + endPoint;
    return this.http.post(url, data, options);
  }
  putDI(endPoint, data) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url = environment.dischargeInstruction + endPoint;
    return this.http.put(url, data, options);
  }
}
