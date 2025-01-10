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
    private bookService: BookService, 
    private router: Router 
  ) {}

  form!: FormGroup; 

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      
      status: new FormControl(null, [Validators.required]),
    });
  }

  sub(): void {
    if (this.form.valid) {
      this.bookService.insertBook(this.form.value).subscribe(() => {
        this.router.navigate(['/book']);
      });
    } else {
      console.error('Form is invalid'); 
    }
    console.log(this.form.value); 
  }
}

