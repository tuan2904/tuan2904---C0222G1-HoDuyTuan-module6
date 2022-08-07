import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ichart} from './ichart';

@Injectable({
  providedIn: 'root'
})
export class IchartjsService {
  API_URL = 'http://localhost:8080/list';
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getComputer(startDate: string, endDate: string): Observable<Ichart> {
    return this.httpClient.get<Ichart>(this.API_URL + '/' + startDate + '/' + endDate);
  }
}
