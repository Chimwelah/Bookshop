import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NgFor, NgIf } from '@angular/common';
import { BookService } from './book.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface Book {
  id: number;
  author: string;
  title: string;
  year?: number;
  category: string;
  description: string;
}

interface IBook {
  author: string;
  title: string;
  year?: number;
  category: string;
  description: string;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzTableModule,
    NzDividerModule,
    NgFor,
    NzModalModule,
    NgIf,
    FormsModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private fb: NonNullableFormBuilder
  ) {}

  books: Book[] = [];

  isVisible = false;

  isOpen = false;

  @Output() close = new EventEmitter<void>();

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }

  goBackToDashboard() {
    // Implement your logic to go back to the dashboard
    this.closeModal();
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  book = {
    author: '',
    title: '',
    year: null,
    category: '',
    description: '',
  };

  onSubmit() {
    console.log('Book added:', this.book);
    // Implement the logic to handle the form submission, e.g., sending the data to a server
    this.addBook({
      title: this.book.title,
      author: this.book.author,
      year: this.book.year!,
      category: this.book.category,
      description: this.book.description,
    });

    this.resetForm();
    this.isOpen = false;
    this.close.emit();
  }

  resetForm() {
    this.book = {
      author: '',
      title: '',
      year: null,
      category: '',
      description: '',
    };
  }

  addBook(book: IBook) {
    this.bookService.addBook(book).subscribe((newBook) => {
      this.books.push(newBook);
    });
  }

  updateBook(book: Book) {
    this.bookService.updateBook(book).subscribe(() => {
      const index = this.books.findIndex((b) => b.id === book.id);
      this.books[index] = book;
    });
  }

  deleteBook(book: Book) {
    console.log('Deleting book...', book);

    this.bookService.deleteBook(book.id).subscribe(() => {
      this.books = this.books.filter((b) => b.id !== book.id);
      console.log('Book deleted!');
    });
  }
}
