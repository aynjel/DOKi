import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpUrlEncodingCodec, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'; 
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient) { }

/*
  posttest(serviceName: string, data1: any,data2: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrl + serviceName + "?username="+data1 + "&password="+data2;
    console.log("testurl -> " +url);
    return this.http.post(url, options);
  }
*/
  /* for doctors portal */
  DoctorsPortalGet(serviceName: string, data1: any) {
    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: false};
    const url = environment.apiUrlDoctorsPortal + serviceName + data1;
    return this.http.get(url);
  }

  // getNodeJsServer(){
  //   const headers = new HttpHeaders();
  //   const options = { headers: headers, withCredintials: false};
  //   const params = new HttpParams()
  //     .set('drcode', 'MD000077')
  //     .set('birthday', encodeURIComponent('09/07/1961'));
  //     //{fromString: 'drcode=MD000077&birthday=09/07/1961'}
  //   //);

  //   const url = environment.apiRouterTestUrl + '/Login/Get?' + params.toString();
  //   console.log(url);

  //   return this.http.get(url, options);
  //  }

  DoctorsPortalPostJSON(serviceName: string, data: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers, withCredintials: false };

    const url = environment.apiUrlDoctorsPortal + serviceName;
    //const url = environment.apiUrlDoctorsPortal + serviceName;
    console.log(data);
    console.log(JSON.stringify(data));
    return this.http.post(url, JSON.stringify(data), options);
  }

  DoctorsPortalPutJSON(serviceName: string, data: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrlDoctorsPortal + serviceName;
    return this.http.put(url, JSON.stringify(data), options);
  }

  DoctorsPortalDelete(serviceName: string, data: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers: headers, withCredintials: false };
    const url = environment.apiUrlDoctorsPortal + serviceName+data;
    console.log("url : "+url);
    return this.http.delete(url, options);
  }
 /* for doctors portal */

 










/* for Appointments */


AppointmentsGet(serviceName: string, data1: any) {
  const headers = new HttpHeaders();
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl + serviceName + data1;
  return this.http.get(url);
}


AppointmentsPut(serviceName: string, data1: any) {
  /*const headers = new HttpHeaders();
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl + serviceName+data1;
  return this.http.get(url);
*/

  const headers = new HttpHeaders();
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl + serviceName + data1;
  return this.http.put(url, options);
}

AppointmentsPostJSON(serviceName: string, data: any) {
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl + serviceName;
  return this.http.post(url, JSON.stringify(data), options);
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
