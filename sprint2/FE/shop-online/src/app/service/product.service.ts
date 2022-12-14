import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/customer';
import {Statistics} from '../model/statistics';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getNewProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/products/new');
  }

  getAllPageProducts(pageNumber: number): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + `/products/list/${pageNumber}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/products/home/list');
  }

  findProductById(id: string): Observable<Product> {
    return this.http.get<Product>(API_URL + '/products/detail/' + id);
  }

  findAllByName(page: number, name: string): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + `/products/search/${page}?name=` + name);
  }

  findAllByCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/products/filter?id=' + id);
  }

  getOrdersByCustomer(customer: Customer): Observable<any> {
    return this.http.post(API_URL + '/cart/ordered', customer);
  }

  createNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(API_URL + '/products/create', product);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + '/products/delete/' + id);
  }

  editProducts(product: Product) {
    return this.http.post<Product>(API_URL + '/products/edit', product);
  }

  getStatisticsWeek(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(API_URL + '/statistics/week');
  }

  getStatisticsMonth(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(API_URL + '/statistics/month');
  }

  getStatisticsYear(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(API_URL + '/statistics/year');
  }

  getStatisticsCustomer(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(API_URL + '/statistics/customer');
  }
  getProduct(startDate: string, endDate: string): Observable<Statistics> {
    return this.http.get<Statistics>(API_URL + '/statistics' + '/' + startDate + '/' + endDate);
  }
}
