import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../storage/storage.service";
import { AuthConstants } from "../../config/auth-constants";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from "../http/http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})

export class PatientService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient
  ) {}

  retrieveSchedTime(
    postData1: any,
    postData2: any,
    postData3: any
  ): Observable<any> {
    /*const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "Schedules?Drcode="+postData1+"&ApptDate="+postData2+"&Site="+postData3;
    return this.http.get(url, options);*/
    let data =
      "Drcode=" + postData1 + "&ApptDate=" + postData2 + "&Site=" + postData3;
    return this.httpService.AppointmentsGet("Schedules?", data);
  }

  retrieveMTWTFSS(postData1: any, postData2: any): Observable<any> {
    /* const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl + "DoctorSchedMaster/DocSchedMaster/"+postData1+"/"+postData2;
    this.functionsService.logToConsole(url);
    return this.http.get(url, options);
*/
    let data = "DocSchedMaster/" + postData1 + "/" + postData2;
    return this.httpService.AppointmentsGet("DoctorSchedMaster/", data);
  }
  /* retrieveTime(postData1: any,postData2: any,postData3: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    
    const url = environment.apiRouterUrl + "Schedules?Drcode="+postData1+"&ApptDate="+postData2+"&Site="+postData3;
    this.functionsService.logToConsole("URL : "+url);
    return this.http.get(url, options);
  }*/

  addAppointments(
    postData1: any,
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
    /*onst url = environment.apiRouterUrl + "InsertCMAAppt?username=&drcode="+postData1+
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
    if (!postData10) {
      postData10 = "-";
    }
    var res = postData3.split("|");
    let postData = {
      appt_id: 0,
      patient_username: "",
      dr_code: postData1,
      appt_date: postData2,
      time_desc: res[0],
      remarks: "Reserved",
      status: 1,
      last_name: postData4,
      first_name: postData5,
      middle_name: postData6,
      sex: postData7,
      birth_Date: postData8,
      address: postData9,
      contact_number: postData10,
      site: postData11,
      ptype: "P",
      datetime_created: null,
      appt_by: "DoctorsPortal",
      slot_no: res[1],
    };

    /* this.functionsService.logToConsole(JSON.stringify(postData));
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const options = { headers: headers, withCredintials: false };
        const url = environment.apiRouterUrl + 'CMAAppointmentMaster';
        return this.http.post(url, JSON.stringify(postData), options);*/
    return this.httpService.AppointmentsPostJSON(
      "CMAAppointmentMaster",
      postData
    );

    //this.functionsService.logToConsole(postData);
    //return this.http.post(postData, options);
  }

  deletePatients(postData1: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url =
      environment.apiRouterUrl +
      "CMAAppointmentMaster?ApptId=" +
      postData1 +
      "&ApptStatus=6&ApptRemarks=Cancelled";
    return this.http.put(url, options);
  }

  getPatientDetails(postData1: any): Observable<any> {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url =
      environment.apiRouterUrl +
      "CMAAppointmentMaster/GetCMAAppointmentMaster/" +
      postData1;
    return this.http.get(url, options);
  }

  ///////////////////////
  getUserSettings(data1:any,data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url =
      environment.apiRouterUrl +
      "AppSetting/GetUserSetting/"+data1+'/'+data2;
    return this.http.get(url, options);
  }
  getAppSetting(data:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url =
      environment.apiRouterUrl +
      "AppSetting/GetAppSetting/"+data;
    return this.http.get(url, options);
  }
  insertUserSettings(data:any){
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url =
      environment.apiRouterUrl +
      "UserSetting/Insert";
    return this.http.post(url,  data, options);
  }
  updateUserSettings(data:any){
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url =
    environment.apiRouterUrl+"UserSetting/Update";
    return this.http.put(url, data, options);
  }
  resetUserSettings(data:any){
    //const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const headers = new HttpHeaders();
    const options = { headers: headers,body:data, withCredentials: false };
    const url = environment.apiRouterUrl+"UserSetting/Delete";
    return this.http.delete(url,options)
  }
  changePassword(data: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url =
      environment.apiRouterUrl + "Login/ChangePassword";
      return this.http.put(url, data, options);
  }

  getCebuExamList(data){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetExamList/"+data;
    return this.http.get(url, options);
  }
  getCebuChemHeader(data){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetChemHeader/"+data;
    return this.http.get(url, options);
  }
  getCebuChemDetails(data){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetChemDetails/"+data;
    return this.http.get(url, options);
  }
  getCebuSeroHeader(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetSeroHeader/"+data1+"/"+data2;
    return this.http.get(url, options);
  }
  getUrineHeader(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetUrinHeader/"+data1+"/"+data2;
    return this.http.get(url, options);
  }
  getCebuUrineDetails(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetUrinDetails/"+data1+"/"+data2;
    return this.http.get(url, options);
  }
  getCebuSeroExamno(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetSeroExamno/"+data1+"/"+data2;
    return this.http.get(url, options);
  }
  getCebuSeroDetails(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetSeroDetails/"+data1+"/"+data2;
    return this.http.get(url, options);
  }
  

  getCebuFecalHeader(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetFecalHeader/"+data1+"/"+data2;
    return this.http.get(url, options);
  }
  getFecalDetails(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetFecalDetails/"+data1+"/"+data2;
    return this.http.get(url, options);
  }
  getCebuFecalDetail(data1:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetFecalDetails/"+data1;
    return this.http.get(url, options);
  }

  getHemaHeader(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/ader/"+data1+"/"+data2;
    return this.http.get(url, options);
  }
  getHemaDetail(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetHEMDetails/"+data1+"/"+data2;
    return this.http.get(url, options);
  }


  getCebuCBCHeader(data1:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetCBCHeader/"+data1;
    return this.http.get(url, options);
  }
  getCebuCBCDetail(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetCBCDetails/"+data1+"/"+data2;
    return this.http.get(url, options);
  }





  getCebuUrinalysisHeader(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetUrinHeader/"+data1+"/"+data2;
    return this.http.get(url, options);
  }

  getUrinalysisDetail(data1:any, data2:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"Cebu/CebuLabMain/GetUrinDetails/"+data1+"/"+data2;
    return this.http.get(url, options);
  }















 /*
  restRXCUI(data1:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = 'https://rxnav.nlm.nih.gov/REST/rxcui?caller=RxNav&name='+data1;
    return this.http.get(url, options);
  }

  allRelatedGroup(data1:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = 'https://rxnav.nlm.nih.gov/REST/rxcui/'+data1+'/allrelatedextension?caller=RxNav';
    return this.http.get(url, options);
  }
  interactions(data1:any){
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    
    const url = 'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis='+data1;
    //const url = 'https://online.lexi.com/lco/action/interact/v2/analyze?duplicatedrugtherapy=1&drug=Calcium%20Carbonate%7Chf019100&drug=LevoFLOXacin%20(Systemic)%7Chf075756';



    return this.http.get(url, options);
  }
*/



  
/**
 * @example
 * Sample (Local)          : http://localhost:8090/api/Cebu/CebuLabMain/GetHEMOtherHeader/:patientNo/:requestNo
 * Sample (Prod, Private)  : http://10.128.18.75:8090/api/Cebu/CebuLabMain/GetHEMOtherHeader/:patientNo/:requestNo
 * Sample (Prod, Public)   : https://doctorsportal.chonghua.com.ph/api/Cebu/CebuLabMain/GetHEMOtherHeader/:patientNo/:requestNo
 
 */









  mocktestlogin(data1:any,data2:any){
      //const headers = new HttpHeaders({ "Content-Type": "application/json" });
      const headers = new HttpHeaders();
      const options = { headers: headers, withCredintials: false };
      const url = environment.apiRouterUrl+"Login/HISUser/Get?username="+data1+"&password="+data2;
      return this.http.get(url, options);
  }
  commonValidate(data: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"common/Login/Validate";
      return this.http.put(url, data, options);
  }
  commonChangePassword(data: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"common/Login/ChangePassword";
      return this.http.put(url, data, options);
  }
  commonLoginGet(data: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiRouterUrl+"common/Login/Get";
      return this.http.put(url, data, options);
  }
}
