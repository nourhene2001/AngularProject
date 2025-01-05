import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {}

  //REQURST GET

  getAllBooks(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/books');
  }
  insertBook(book: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/books', book);
  }
  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/books/${id}`);
  }
  getBookyid(id: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/books/${id}`);
  }
  updateByid(book: any, id: string): Observable<any> {
    return this.httpClient.put<any>(
      `http://localhost:3000/books/${id}`,
      book
    );
  }
}