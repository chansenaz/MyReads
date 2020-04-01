import React, { Component } from 'react'
import { IBook } from '../data/IBook'
import Bookshelf from './Bookshelf'
import AddBookButton from './AddBookButton'

export interface IBookListProps {
  readBooks: IBook[];
  wantToReadBooks: IBook[];
  currentlyReadingBooks: IBook[];
}

//inside the angle brackets, first argument is props type, second is state type
export default class BookList extends Component<IBookListProps> {
  render() {
    const { currentlyReadingBooks, wantToReadBooks, readBooks } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf books={currentlyReadingBooks} title="Currently Reading" />
            <Bookshelf books={wantToReadBooks} title="Want to Read" />
            <Bookshelf books={readBooks} title="Read" />
          </div>
        </div>

        <AddBookButton />
      </div>
    )
  }
}
