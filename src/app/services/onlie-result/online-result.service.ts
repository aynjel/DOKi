import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { constants } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class OnlineResultService {
  constructor(
    private http: HttpClient,
    public functionsService: FunctionsService
  ) {}

  post(data, link) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrlTest + '/pxi/' + link;
    return this.http.post(url, data, options);
  }
  getAllByAccountNoSet(data, link) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiRouterUrlTest + '/gw/pdf/pxi/results/' + link;
    return this.http.post(url, data, options);
  }
  /*
  getAllByAccountNo(data) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    const url = environment.getPdfListnotGW + 'pxi/results/all-by-account-no';
    return this.http.post(url, data, options);
  }

  getRadiology(data) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.getPdfListnotGW + 'pxi/results/radiology-by-account-no';
    return this.http.post(url, data, options);
  }
  getLaboratory(data) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.getPdfListnotGW + 'pxi/results/laboratory-by-account-no';
    return this.http.post(url, data, options);
  }

  getPulmonary(data) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.getPdfListnotGW + 'pxi/results/pulmonary-by-account-no';
    return this.http.post(url, data, options);
  }

  getNeurophysio(data) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.getPdfListnotGW + 'pxi/results/neurophysio-by-account-no';
    return this.http.post(url, data, options);
  }

  getEndoscopy(data) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.getPdfListnotGW + 'pxi/results/endoscopy-by-account-no';
    return this.http.post(url, data, options);
  }

  getCardio(data) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    const url =
      environment.getPdfListnotGW + 'pxi/results/cardio-by-account-no';
    return this.http.post(url, data, options);
  }*/
  getPDF(data, request_type: any) {
    const url =
      environment.apiRouterUrlTest + '/gw/pdf/pxi/' + request_type + '/pdf';
    console.log(url);

    return this.http.post(url, data, { responseType: 'blob' });
  }
}
