import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  addBook(book: IBook) {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  updateBook(book: Book) {
    return this.http.put<Book>(`${this.apiUrl}/books/${book.id}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete<Book>(`${this.apiUrl}/books/${id}`);
  }

  searchBooks(query: string) {
    return this.http.get<Book[]>(`${this.apiUrl}/books/search?q=${query}`);
  }
}
