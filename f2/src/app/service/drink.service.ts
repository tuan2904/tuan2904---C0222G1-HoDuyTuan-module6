import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Drink} from '../model/drink';
import {Book} from '../model/book';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor(private http: HttpClient) { }
  getAllDrink(): Observable<Drink[]> {
    return this.http.get<Drink[]>(API_URL + '/drink-list');
  }
  delete(id: number): Observable<Drink> {
    return this.http.delete<Drink>(`${API_URL}/remove-drink/${id}`);
  }
  save(drink: Drink): Observable<Drink> {
    return this.http.post<Drink>(API_URL + '/create-drink', drink);
  }
}
