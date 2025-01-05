import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule, routes } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { MatMomentDateModule } from '@angular/material-moment-adapter'; // Import this

import { MatSortModule } from '@angular/material/sort';

import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './login/login.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { MatCardModule } from '@angular/material/card';
import { FirebaseModule } from '../FirebaseModule';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { BookformComponent } from './books/bookform/bookform.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDeleteModalComponent } from './shared/confirm-delete-modal/confirm-delete-modal.component';
import { BookFormModalComponent } from './books/book-form-modal/book-form-modal.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookListComponent,
    BookformComponent,
    ConfirmDeleteModalComponent,
    BookFormModalComponent,
    DashboardComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    
    
    MatIconModule,
    
    MatSidenavModule,
    MatToolbarModule,
    MatOption,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    FirebaseModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,   
    RouterModule.forRoot(routes),  // RouterModule imported here
    ReactiveFormsModule, // Include ReactiveFormsModule
    MatMomentDateModule, // Use MomentDateAdapter
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    NgChartsModule
    
    
  ],
  providers: [provideHttpClient(),provideNativeDateAdapter(),{provide: MatDialogRef,useValue: {}
  },{ provide: MAT_DIALOG_DATA, useValue: {} },], // Add this],
  bootstrap: [AppComponent],
  
})
export class AppModule { }