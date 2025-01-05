import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './bookform.component.html',
  styleUrls: ['./bookform.component.css'],
  standalone: false,

})
export class BookformComponent implements OnInit {
  constructor(
    private bookService: BookService, // Inject your BookService
    private router: Router // Router for navigation after form submission
  ) {}

  form!: FormGroup; // Form group for the form controls

  ngOnInit(): void {
    // Initialize an empty form for creating a new book
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      
      status: new FormControl(null, [Validators.required]),
    });
  }

  // Method to handle form submission for creating a new book
  sub(): void {
    if (this.form.valid) {
      // If form is valid, call the insertBook method from BookService
      this.bookService.insertBook(this.form.value).subscribe(() => {
        this.router.navigate(['/book']); // Navigate to the books list after successful submission
      });
    } else {
      console.error('Form is invalid'); // Handle invalid form submission
    }
    console.log(this.form.value); // Log the form value for debugging
  }
}

