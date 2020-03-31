import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IBook } from '../data/IBook';

export interface IBookProps {
  book: IBook;
}

export default class Book extends Component<IBookProps> {
  render() {
    const { book } = this.props;

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
            <select>
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