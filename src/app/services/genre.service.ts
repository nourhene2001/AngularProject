import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre.model';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private baseUrl = 'http://localhost:3000/genres';

  constructor(private httpClient: HttpClient) {}

  getAllGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(this.baseUrl);
  }

  getGenreById(id: number): Observable<Genre> {
    return this.httpClient.get<Genre>(`${this.baseUrl}/${id}`);
  }

  insertGenre(genre: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, genre);
  }

  updateGenreById(id: number, genre: Genre): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, genre);
  }
}
