'use client'

import React, { useState } from "react";
import { bookList } from "./bookData";
import BookList from "./bookList";

export default function BookFilterPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on search term (searches in title, author, and genre)
  const filteredBooks = bookList.filter((book) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      book.genre.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="book-filter-container">
      <h1>Book Library</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by title, author, or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="clear-button"
          >
            Clear
          </button>
        )}
      </div>
      <p className="results-count">
        Showing {filteredBooks.length} of {bookList.length} books
      </p>
      <BookList books={filteredBooks} />
      <style jsx>{`
        .book-filter-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }
        .search-section {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }
        .search-input {
          flex: 1;
          padding: 12px 20px;
          font-size: 16px;
          border: 2px solid #ddd;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.3s;
        }
        .search-input:focus {
          border-color: #4a90e2;
        }
        .clear-button {
          padding: 12px 24px;
          background-color: #e74c3c;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        .clear-button:hover {
          background-color: #c0392b;
        }
        .results-count {
          text-align: center;
          color: #666;
          font-size: 0.9em;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}