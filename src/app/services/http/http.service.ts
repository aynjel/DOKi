import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpUrlEncodingCodec,
  HttpParams,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { stringify } from 'querystring';
import { FunctionsService } from '../../shared/functions/functions.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    public functionsService: FunctionsService
  ) {}

  /*
  posttest(serviceName: string, data1: any,data2: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + serviceName + "?username="+data1 + "&password="+data2;
    this.functionsService.logToConsole("testurl -> " +url);
    return this.http.post(url, options);
  }
*/

  /* for doctors portal */

  DoctorsPortalGet(serviceName: string, data1: any) {
    /*
    const headers = new HttpHeaders({
      "Cache-Control":
        "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
      Pragma: "no-cache",
      Expires: "0",
    });*/
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + serviceName + data1;
    return this.http.get(url);
    //return this.http.get(url, options);
  }

  DoctorsPortalPostJSON(serviceName: string, data: any) {
    /*
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Cache-Control":
        "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
      Pragma: "no-cache",
      Expires: "0",
    });*/

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + serviceName;
    //return this.http.post(url, JSON.stringify(data), options);
    return this.http.post(url, data, options);
  }

  DoctorsPortalPutJSON(serviceName: string, data: any) {
    /*
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Cache-Control":
        "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
      Pragma: "no-cache",
      Expires: "0",
    });*/

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + serviceName;
    //return this.http.put(url, JSON.stringify(data), options);
    return this.http.put(url, data, options);
  }

  DoctorsPortalDelete(serviceName: string, data: any) {
    /*
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Cache-Control":
        "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
      Pragma: "no-cache",
      Expires: "0",
    });*/

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + serviceName + data;
    return this.http.delete(url, options);
  }
  /* for doctors portal */

  /* for Appointments */

  AppointmentsGet(serviceName: string, data1: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + serviceName + data1;
    return this.http.get(url);
  }

  AppointmentsPut(serviceName: string, data1: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + serviceName + data1;
    return this.http.put(url, options);
  }

  AppointmentsPostJSON(serviceName: string, data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + serviceName;
    //return this.http.post(url, JSON.stringify(data), options);
    return this.http.post(url, data, options);
  }

  getAppointments(serviceName: string, data1: any, data2: any) {
    data2 = encodeURIComponent(data2);
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url =
      environment.apiRouterUrl +
      serviceName +
      'drcode=' +
      data1 +
      '&birthday=' +
      data2;
    this.functionsService.logToConsole(url);
    return this.http.get(url);
  }
  /*
  getInpatient(serviceName: string, data1: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredentials: false };
    const url = environment.apiRouterUrl + serviceName+data1;
    this.functionsService.logToConsole(url);
  
    return this.http.get(url);
  }*/
  /*for doctors portal */

  searchCaseRates(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    });
    const options = { headers: headers, withCredentials: false, data };
    const url = environment.apiRouterUrl + 'PhilHealthCaseRates/Search' + data;
    return this.http.get(url);
  }
}
