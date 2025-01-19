import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDeleteModalComponent } from '../../shared/confirm-delete-modal/confirm-delete-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookFormModalComponent } from '../book-form-modal/book-form-modal.component';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../models/genre.model';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  standalone: false,
  })
export class BookListComponent implements OnInit{

  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'genre',
    'description',
    'status',
    'action',
  ];
  genresMap: Record<number, string> = {}; // Explicit map for genre IDs to names
  constructor(
    private bookService: BookService,private router: Router, private dialog: MatDialog ,  private genreService: GenreService,
  ) {}
  dataSource = new MatTableDataSource();

  ngOnInit(): void {
    // Fetch genres and build the map
    this.genreService.getAllGenres().subscribe((genres: Genre[]) => {
      this.genresMap = genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {} as Record<number, string>);

      // Fetch books and update data source
      this.loadBooks();
    });
  }
  private loadBooks(): void {
    this.bookService.getAllBooks().subscribe((books: Book[]) => {
      // Add genreName for display
      const booksWithGenres = books.map((book) => ({
        ...book,
        genreName: this.genresMap[book.genre] || 'Unknown Genre',
      }));
      this.dataSource.data = booksWithGenres;
    });
  }
  navigateToAddBook(): void {
    console.log('BookformComponent loaded');

    this.router.navigate(['create']);
  }
  open(id: number): void {
    let dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      height: '200px',
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Get the book details first to identify the associated genre
        this.bookService.getBookByid(id).subscribe((book) => {
          const genreId = book.genre; // Assuming `genre` holds the genre ID
  
          // Fetch the genre by ID
          this.genreService.getGenreById(genreId).subscribe((genre) => {
            // Filter out the deleted book from the genre's books list
            const updatedBooks = genre.books.filter((book: Book) => book.id !== id);
            genre.books = updatedBooks;
  
            // Update the genre with the updated books list
            this.genreService.updateGenreById(genreId, genre).subscribe(() => {
              // Now delete the book
              this.bookService.deleteByid(id).subscribe(() => {
                // Reload the books list after deletion
                this.bookService.getAllBooks().subscribe((data) => {
                  this.dataSource.data = data;
                });
              });
            });
          });
        });
      }
    });
  }
  
  navigateToDashboard(): void {
    console.log('DAshboardComponent loaded');

    this.router.navigate(['Dashboard']);
  }
  openToUpdate(id: number): void {
    const dialogConfig = new MatDialogConfig();
    
    this.bookService.getBookByid(id).subscribe((book) => {
      dialogConfig.data = book;
      dialogConfig.width = '600px';
      dialogConfig.height = '500px';
      
      let dialogRef = this.dialog.open(BookFormModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          console.log('Updated Book:', res);
          
          // Fetch the genre before updating the book
          this.genreService.getGenreById(res.genre).subscribe((genre) => {
            // Update the book in the list of books in the genre
            const updatedBooks = genre.books.map((b: Book) => {
              return b.id === id ? res : b; // Replace the updated book
            });
  
            genre.books = updatedBooks;
  
            // Update the genre with the updated book list
            this.genreService.updateGenreById(genre.id, genre).subscribe(() => {
              // Now update the book itself
              this.bookService.updateByid(res, id).subscribe(() => {
                this.genreService.getAllGenres().subscribe((genres: Genre[]) => {
                  this.genresMap = genres.reduce((map, genre) => {
                    map[genre.id] = genre.name;
                    return map;
                  }, {} as Record<number, string>);
            
                  // Fetch books and update data source
                  this.loadBooks();
                });
                
              });
            });
          });
        }
      });
    });
  }
  
  navigateToGenreList(): void {
    this.router.navigate(['/genre']);
  }
  
}
  
