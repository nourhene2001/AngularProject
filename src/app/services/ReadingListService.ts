import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReadingListService {
  constructor() {}

  getReadingList(): Observable<any[]> {
    // Mock data
    const books = [
      { id: 1, title: 'Book A', genre: 'Fiction', author: 'Author A', status: 'read' },
      { id: 2, title: 'Book B', genre: 'Fiction', author: 'Author B', status: 'to be read' },
      { id: 3, title: 'Book C', genre: 'Mystery', author: 'Author C', status: 'ongoing' },
      { id: 4, title: 'Book D', genre: 'Fantasy', author: 'Author D', status: 'read' },
    ];
    return of(books);
  }
}
