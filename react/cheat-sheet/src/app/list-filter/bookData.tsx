export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
}

export const bookList: Book[] = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction" },
  { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance" },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction" },
  { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
  { id: 7, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy" },
  { id: 8, title: "Animal Farm", author: "George Orwell", genre: "Political Satire" },
  { id: 9, title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy" },
  { id: 10, title: "Jane Eyre", author: "Charlotte Brontë", genre: "Classic" },
];