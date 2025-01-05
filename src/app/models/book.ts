export class Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    
    description: string;
    status : string ;
  
    constructor(id:number ,title: string, author: string, genre: string, description: string, status: string) {
      this.id=id;
      this.title = title;
      this.author = author;
      this.genre = genre;
      
      this.description = description;
      this.status = status;
    }
  }
  
