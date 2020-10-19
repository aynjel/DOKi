import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../storage/storage.service";
import { AuthConstants } from "../../config/auth-constants";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from "../http/http.service";
import { LoginData } from "../../models/login-data.model";
import { FunctionsService } from "../../shared/functions/functions.service";
import {
  HttpClient,
  HttpHeaders,
  HttpUrlEncodingCodec,
  HttpParams,
} from "@angular/common/http";
@Injectable({ 
  providedIn: "root",
})

export class AuthService {
  userData$ = new BehaviorSubject<LoginData>(null);

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    public functionsService: FunctionsService,
    private http: HttpClient
  ) {}

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then((res) => {
      this.functionsService.logToConsole("BehaviorSubject");
      this.userData$.next(res);
    });
  }
  /*
  login(postData: any): Observable<any> {
    return this.httpService.postJSON('login', postData);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.postJSON('signup', postData);
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      this.userData$.next(null);
      this.router.navigate(['/login']);
    });
  }

  logintest(postData1: any,postData2: any,): Observable<any> {
    return this.httpService.posttest('Userlogin', postData1, postData2);
  }
*/

  /*For Doctors Portal */
  doctorsPortalLogin(postData1: any, postData2: any): Observable<any> {
    postData2 = encodeURIComponent(postData2);
    let str = "drcode=" + postData1 + "&birthday=" + postData2;
    return this.httpService.DoctorsPortalGet("Login/Get?", str);
  }
  /*
  doctorsPortalLoginAppointments(postData1: any,postData2: any){
    return this.httpService.getAppointments('Login/Get?', postData1, postData2);
  }*/
  /*For Doctors Portal */











  //TEMPORARY CODES
  mockGetPrivacy() {
    /*
    const headers = new HttpHeaders({
      "Cache-Control":
        "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
      Pragma: "no-cache",
      Expires: "0",
    });*/
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url = 'https://5062fd91-27be-4d0f-af3e-9d283d0a4af4.mock.pstmn.io/api/PrivatePolicy/Get?drCode=MD000555';
    return this.http.get(url);
    //return this.http.get(url, options);
  }



  mockUserSettings(){
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers: headers, withCredentials: false };
    const url = 'https://5062fd91-27be-4d0f-af3e-9d283d0a4af4.mock.pstmn.io/api/UserSettings/Get?drCode=MD000123';
    return this.http.get(url);

  }
}
