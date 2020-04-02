import React, { Component } from 'react';
import { IBook, Shelf } from '../data/IBook';
import Book from './Book';

export interface IBookshelfProps {
  books: IBook[];
  title: string;
  moveBook(book: IBook, shelf: Shelf): void;
}

//inside the angle brackets, first argument is props type, second is state type
export default class Bookshelf extends Component<IBookshelfProps> {
  render() {
    const { books, title, moveBook } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
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
