import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  getGroups() {
    return this.http.get<[{}]>(this.rootURL + '/users');
  }

  getSchedules() {
    return this.http.get<[]>(this.rootURL + '/contacts');
  }

}