import React, { Component } from 'react'
import { IBook, Shelf } from '../data/IBook'
import Bookshelf from './Bookshelf'
import AddBookButton from './AddBookButton'

export interface IBookListProps {
  shelvedBooks: IBook[];
  moveBook(book: IBook, shelf: Shelf): void
}

//inside the angle brackets, first argument is props type, second is state type
export default class BookList extends Component<IBookListProps> {
  render() {
    const { shelvedBooks, moveBook } = this.props
    let currentlyReadingBooks = shelvedBooks.filter(book => book.shelf === Shelf.CurrentlyReading);
    let wantToReadBooks = shelvedBooks.filter(book => book.shelf === Shelf.WantToRead);
    let readBooks = shelvedBooks.filter(book => book.shelf === Shelf.Read);

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf books={currentlyReadingBooks} title="Currently Reading" moveBook={moveBook} />
            <Bookshelf books={wantToReadBooks} title="Want to Read" moveBook={moveBook} />
            <Bookshelf books={readBooks} title="Read" moveBook={moveBook} />
          </div>
        </div>

        <AddBookButton />
      </div>
    )
  }
}
