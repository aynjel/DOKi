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
@Injectable({
  providedIn: 'root',
})
export class ResiService {
  constructor(private http: HttpClient) {}

  getPatientProgressNotesPerAdmission(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;',
    });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiResident + 'api/ProgressNotes/PerAdmission';
    return this.http.post(url, data, options);
  }
  getPatientProgressNotesPerDay(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;',
    });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiResident + 'api/ProgressNotes/PerDay';
    return this.http.post(url, data, options);
  }

  approveProgressNote(data) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json;',
    });
    const options = { headers: headers, withCredentials: true };
    const url = environment.apiResident + 'api/ProgressNotesApproval/insert';
    return this.http.post(url, data, options);
  }
}
