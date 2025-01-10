import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDeleteModalComponent } from '../../shared/confirm-delete-modal/confirm-delete-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookFormModalComponent } from '../book-form-modal/book-form-modal.component';

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
  constructor(
    private bookService: BookService,private router: Router, private dialog: MatDialog
  ) {}
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.bookService.getAllBooks().subscribe((data) => {
      this.dataSource.data = data;
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
        this.bookService.deleteById(id).subscribe((data) => {
          this.bookService.getAllBooks().subscribe((data) => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }
  navigateToDashboard(): void {
    console.log('DAshboardComponent loaded');

    this.router.navigate(['Dashboard']);
  }
  openToUpdate(id: string): void {
    const dialogConfig = new MatDialogConfig();
   
    this.bookService.getBookyid(id).subscribe((e) => {
      dialogConfig.data = e;
      console.log('e',e);
      dialogConfig.width = '400px';
      dialogConfig.height = '300px';
      let dialogRef = this.dialog.open(BookFormModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          console.log(res);
          this.bookService.updateByid(res,id).subscribe(() => {
            this.bookService.getAllBooks().subscribe((data) => {
              this.dataSource.data = data;
            });
          });
        }
      });
    });
  }
}
  
