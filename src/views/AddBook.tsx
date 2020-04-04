import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IBook, Shelf } from '../data/IBook';
import Book from './Book';

export interface IAddBookProps {
  shelvedBooks: IBook[]
  searchedBooks: IBook[]
  searchBooks(query: string): void
  moveBook(book: IBook, shelf: Shelf): void
  resetSearch(): void
}

export default class AddBook extends Component<IAddBookProps> {
  render() {
    //this line de-structures props (takes 'this' out of the old context)
    const { shelvedBooks, searchedBooks, searchBooks, moveBook, resetSearch } = this.props;

    //updatedSearchedBooks pulls shelves from shelvedBooks since search books all
    //come back from the API with a shelf of 'none'
    const updatedSearchedBooks = searchedBooks.map(searchedBook => {
      shelvedBooks.map(shelvedBook => {
        if (shelvedBook.id === searchedBook.id) {
          searchedBook.shelf = shelvedBook.shelf;
        }
        return shelvedBook;
      });
      return searchedBook;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search" onClick={resetSearch}>Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by keyword"
              onChange={(event: any) => searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {updatedSearchedBooks.map((book: IBook) => (
              <li key={book.id}>
                <Book book={book} moveBook={moveBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
