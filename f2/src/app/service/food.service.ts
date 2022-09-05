import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Food} from '../model/food';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }
  getAllFood(): Observable<Food[]> {
    return this.http.get<Food[]>(API_URL + '/food-list');
  }
  delete(id: number): Observable<Food> {
    return this.http.delete<Food>(`${API_URL}/food-remove/${id}`);
  }
  save(food: Food): Observable<Food> {
    return this.http.post<Food>(API_URL + '/create-food', food);
  }
}
