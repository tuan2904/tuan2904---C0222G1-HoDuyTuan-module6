import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  checkLogin(): Observable<boolean> {
    return this.http.post<boolean>(API_URL + "/check/login", null);
  }

  isLogin(value: any) {
    if (this.isAdmin(value.grantList)) {
      localStorage.setItem("role", "ADMIN");
    } else if (this.isEmployee(value.grantList)) {
      localStorage.setItem("role", "EMPLOYEE");
    } else {
      localStorage.setItem("role", "USER");
    }
    localStorage.setItem("username", value.username);
  }

  isAdmin(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ADMIN';
    })
  }

  isEmployee(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'EMPLOYEE';
    })
  }

  checkAdminRole(): Observable<string> {
    return this.http.post<string>(API_URL + "/role/admin", null);
  }
}
