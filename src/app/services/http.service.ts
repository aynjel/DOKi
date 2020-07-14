import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient) { }

  postJSON(serviceName: string, data: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrlDoctorsPortal + serviceName;
    return this.http.post(url, JSON.stringify(data), options);
  }
  putJSON(serviceName: string, data: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrlDoctorsPortal + serviceName;
    return this.http.put(url, JSON.stringify(data), options);
  }
  delete(serviceName: string, data: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrlDoctorsPortal + serviceName+data;
    console.log("url : "+url);
    return this.http.delete(url, options);
    
    
  }
  posttest(serviceName: string, data1: any,data2: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + serviceName + "?username="+data1 + "&password="+data2;
    console.log("testurl -> " +url);
    return this.http.post(url, options);
  }

  /* for doctors portal */
  get(serviceName: string, data1: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrlDoctorsPortal + serviceName+data1;
    return this.http.get(url);
  }
  getAppointments(serviceName: string, data1: any,data2: any) {
    data2 = encodeURIComponent(data2);
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + serviceName+'drcode='+data1+'&birthday='+data2;
    console.log(url);
    return this.http.get(url);
  }
/*
  getInpatient(serviceName: string, data1: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrlDoctorsPortal + serviceName+data1;
    console.log(url);
  
    return this.http.get(url);
  }*/
  /*for doctors portal */
}
