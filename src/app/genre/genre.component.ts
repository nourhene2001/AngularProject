import { Component, OnInit } from '@angular/core';
import { GenreService } from '../services/genre.service';
import { Genre } from '../models/genre.model';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
  standalone:false,
})
export class GenreComponent implements OnInit {
  genres: Genre[] = [];
  selectedGenre: Genre | null = null;

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getAllGenres().subscribe((data) => {
      this.genres = data;
    });
  }

  viewBooksByGenre(genre: Genre): void {
    this.genreService.getGenreById(genre.id).subscribe((data) => {
      this.selectedGenre = data;
    });
  }

  clearSelectedGenre(): void {
    this.selectedGenre = null;
  }
}
