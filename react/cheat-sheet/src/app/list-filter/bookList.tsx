'use client'

import React from "react";
import { Book } from "./bookData";

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p className="no-results">No books found matching your search.</p>
      ) : (
        <ul className="books">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">By: {book.author}</p>
              <p className="book-genre">Genre: {book.genre}</p>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .book-list {
          margin-top: 20px;
        }
        .books {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .book-item {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 8px;
          background-color: #f9f9f9;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .book-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .book-title {
          margin: 0 0 10px 0;
          font-size: 1.2em;
          color: #333;
        }
        .book-author {
          margin: 5px 0;
          color: #666;
          font-style: italic;
        }
        .book-genre {
          margin: 5px 0;
          color: #888;
          font-size: 0.9em;
        }
        .no-results {
          text-align: center;
          color: #999;
          font-size: 1.1em;
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default BookList;