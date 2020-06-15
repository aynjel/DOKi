import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient) { }

  post(serviceName: string, data: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + serviceName;
  
    return this.http.post(url, JSON.stringify(data), options);
  }
  
  posttest(serviceName: string, data1: any,data2: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + serviceName + "?username="+data1 + "&password="+data2;
    console.log("testurl -> " +url);
    return this.http.post(url, options);
  }
}
