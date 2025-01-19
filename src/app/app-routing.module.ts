import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookFormModalComponent } from './books/book-form-modal/book-form-modal.component';
import { BookformComponent } from './books/bookform/bookform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenreComponent } from './genre/genre.component';

export const routes: Routes = [
  {
    path: 'book',
    pathMatch: 'full',
    component: BookListComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'create',
    component: BookformComponent,
  },
  {
    path: 'book/edit/:id',
    pathMatch: 'full',
    component: BookFormModalComponent,
  },
  {
    path: 'Dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'genre',
    pathMatch: 'full',
    component: GenreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
