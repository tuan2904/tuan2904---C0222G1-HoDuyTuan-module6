import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from '../model/book';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Booktype} from '../model/booktype';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getAllBook(): Observable<Book[]> {
      return this.http.get<Book[]>(API_URL + '/list-book');
  }
  getAllBookType(): Observable<Booktype[]> {
    return this.http.get<Booktype[]>(API_URL + '/list-book-type');
  }
  delete(id: number): Observable<Book> {
    return this.http.delete<Book>(`${API_URL}/remove/${id}`);
  }
  save(book: Book): Observable<Book> {
    return this.http.post<Book>(API_URL + '/create', book);
  }
  checkCode(code: string): Observable<string> {
    return this.http.get<string>(API_URL + '/check/' + code);
  }
}
