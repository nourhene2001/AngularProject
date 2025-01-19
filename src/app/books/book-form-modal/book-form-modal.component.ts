import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../models/book.model';
import { GenreService } from '../../services/genre.service';
import { BookService } from '../../services/book.service'; // Import the BookService

@Component({
  selector: 'app-book-form-modal',
  templateUrl: './book-form-modal.component.html',
  styleUrls: ['./book-form-modal.component.css'],
  standalone: false,
})
export class BookFormModalComponent implements OnInit {
  form!: FormGroup;
  genres: any[] = []; // Array to hold genres

  constructor(
    private dialogRef: MatDialogRef<BookFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book, // Data passed to the modal
    private genreService: GenreService, // Inject the GenreService
    private bookService: BookService // Inject the BookService
  ) {}

  ngOnInit(): void {
    // Initialize form with data
    this.form = new FormGroup({
      id: new FormControl(this.data.id, [Validators.required]),
      title: new FormControl(this.data.title, [Validators.required]),
      author: new FormControl(this.data.author, [Validators.required]),
      description: new FormControl(this.data.description),
      genre: new FormControl(this.data.genre, [Validators.required]),
      status: new FormControl(this.data.status, [Validators.required]),
    });

    // Fetch genres
    this.genreService.getAllGenres().subscribe((data) => {
      this.genres = data; // Populate genres for dropdown
    });
  }

  save() {
    const updatedBook = this.form.value;
    console.log(updatedBook)
    // Get the old genre and the new genre
    const oldGenreId = this.data.genre;
    const newGenreId = updatedBook.genre;

    // Update the genre only if the genre has changed
    if (oldGenreId !== newGenreId) {
      // Fetch both genres (old and new)
      this.genreService.getGenreById(oldGenreId).subscribe((oldGenre) => {
        // Remove the book from the old genre's books array
        oldGenre.books = oldGenre.books.filter((book: Book) => book.id !== updatedBook.id);

        // Update the old genre
        this.genreService.updateGenreById(oldGenre.id, oldGenre).subscribe(() => {
          // Now update the new genre by adding the book to its books array
          this.genreService.getGenreById(newGenreId).subscribe((newGenre) => {
            newGenre.books.push(updatedBook);

            // Update the new genre
            this.genreService.updateGenreById(newGenre.id, newGenre).subscribe(() => {
              // Save the updated book

              this.bookService.updateByid(updatedBook, updatedBook.id).subscribe(() => {
                // Return the updated book after successful update
                
                this.dialogRef.close(updatedBook);
              });
            });
          });
        });
      });
    } else {
      // If genre didn't change, just update the book
      this.bookService.updateByid(updatedBook, updatedBook.id).subscribe(() => {
        this.dialogRef.close(updatedBook);
      });
    }
  }

  close() {
    this.dialogRef.close(); // Close the modal without saving
  }
}
