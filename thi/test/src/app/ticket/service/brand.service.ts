import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Brand} from '../model/brand';

const API_URL = 'localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(API_URL + '/brands');
  }
}
