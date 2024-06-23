import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' }, // Redirect to BooksComponent
  { path: 'books', component: BooksComponent },
];
