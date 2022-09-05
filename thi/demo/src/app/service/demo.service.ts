import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Demo} from "../model/demo";
import {Observable} from 'rxjs';


const API_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})

export class DemoService {

  constructor(private http: HttpClient) {
  }

  getAll(page: number): Observable<Demo[]> {
    return this.http.get<Demo[]>(API_URL + `list?page=${page}`);
  }
}
