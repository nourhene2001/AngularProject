import { Genre } from './genre.model';

export class Book {
  id: number;
  title: string;
  author: string;
  description: string;
  status: string;
  genre: number; // Reference to the Genre model

  constructor(
    id: number,
    title: string,
    author: string,
    description: string,
    status: string,
    genre: number // Accept Genre as an object
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.status = status;
    this.genre = genre;
  }
}
