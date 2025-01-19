import { Book } from "./book.model";

export class Genre {
  id: number;
  name: string;
  books: Book[]; // Relationship with books
  description: string

  constructor(id: number, name: string, books: Book[] = [],description:string) {
    this.id = id;
    this.name = name;
    this.books = books;
    this.description = description;
  }
}
