import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IBook } from '../data/IBook';
import Book from './Book';

export interface IAddBookProps {
  searchedBooks: IBook[]
  searchBooks(query: string): void
}

class AddBook extends Component<IAddBookProps> {
  render() {
    //this line de-structures props (takes 'this' out of the old context)
    const { searchedBooks, searchBooks } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search">Close</button>
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
            {searchedBooks.map((book: IBook) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default AddBook;