import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IBook } from '../data/IBook';
import Book from './Book';
import * as BooksAPI from '../APIs/BooksAPI'

export interface IAddBookState {
  searchedBooks: IBook[]
}

class AddBook extends Component<any, IAddBookState> {
  //when do I need to put this in a constructor?
  state = {
    searchedBooks: []
  }

  async searchBooks(query: string) {
    if (query.length > 0) {
      let searchedBooks = await BooksAPI.search(query);
      this.setState({
        searchedBooks
      });
    } else {
      this.setState({
        searchedBooks: []
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input type="text"
              placeholder="Search by title or author"
              onChange={(event: any) => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map((book) => (
              <li>
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