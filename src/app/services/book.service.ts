import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:3000/books';

  constructor(private httpClient: HttpClient) {}

  getAllBooks(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);
  }

  insertBook(book: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, book);
  }

  deleteByid(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  getBookByid(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  updateByid(book: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, book);
  }
}
