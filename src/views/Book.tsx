import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IBook, Shelf } from '../data/IBook';

export interface IBookProps {
  book: IBook;
  moveBook(book: IBook, shelf: Shelf): void
}

export default class Book extends Component<IBookProps> {
  render() {
    const { book, moveBook } = this.props;
    if (!book.shelf) {
      book.shelf = Shelf.None;
    }

    return (
      <div className="book" >
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks
                  ? book.imageLinks.thumbnail
                  : 'icons/book-placeholder.svg'
                })`
            }}
          />
          <div className="book-shelf-changer">
            <select value = {book.shelf} onChange={(event: any) => moveBook(book, event.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(', ') : 'Unknown Author'}
        </div>
      </div>
    )
  }
}