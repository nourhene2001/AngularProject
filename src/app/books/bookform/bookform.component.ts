import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './bookform.component.html',
  styleUrls: ['./bookform.component.css'],
  standalone:false
})
export class BookformComponent implements OnInit {
  form!: FormGroup;
  genres: any[] = [];

  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    });

    this.genreService.getAllGenres().subscribe((data) => {
      this.genres = data; // Populate genres dropdown
    });
  }

  sub(): void {
    if (this.form.valid) {
      console.log(this.form.value);
  
      const bookData = {
        ...this.form.value,
        genreId: this.form.value.genre, // Link by genre ID
      };
  
      // First, insert the new book
      this.bookService.insertBook(bookData).subscribe({
        next: (newBook) => {
          console.log('Book added successfully:', newBook);
  
          // Update the genre with the new book
          this.genreService.getGenreById(newBook.genreId).subscribe((genre) => {
            if (genre) {
              // Add the new book to the genre's books array
              genre.books = genre.books || [];
              genre.books.push(newBook);
  
              // Update the genre with the new book
              this.genreService.updateGenreById(newBook.genreId, genre).subscribe({
                next: () => {
                  console.log('Genre updated successfully with the new book');
                  // Redirect after successful operations
                  this.router.navigate(['/book']);
                },
                error: (err) => {
                  console.error('Error updating genre:', err);
                },
              });
            }
          });
        },
        error: (err) => {
          console.error('Error adding book:', err);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
  
}


