import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form-modal',
  templateUrl: './book-form-modal.component.html',
  styleUrls: ['./book-form-modal.component.css'],
  standalone: false,
})
export class BookFormModalComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<BookFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book // The data passed into the modal
  ) {}

  ngOnInit(): void {
    // Initialize the form after receiving data
    this.form = new FormGroup({
      id: new FormControl(this.data.id, [Validators.required]),
      title: new FormControl(this.data.title, [Validators.required]),
      author: new FormControl(this.data.author, [Validators.required]),
      description: new FormControl(this.data.description),
      genre: new FormControl(this.data.genre),
      status: new FormControl(this.data.status, [Validators.required]),
    });

    console.log('Form initialized with:', this.form.value); // Log the form values to ensure it's populated
  }

  save() {
    this.dialogRef.close(this.form.value); // Close the dialog and pass the form data
  }

  close() {
    this.dialogRef.close(); // Close the dialog without passing any data
  }
}
