import React from 'react'
import * as BooksAPI from './APIs/BooksAPI'
import './css/App.css'
import AddBook from './views/AddBook'
import BookList from './views/BookList'
import { Route } from 'react-router-dom'
import { IBook, Shelf } from './data/IBook'

export interface IAppState {
  shelvedBooks: IBook[];
  readBooks: IBook[];
  wantToReadBooks: IBook[];
  currentlyReadingBooks: IBook[];
}

export default class App extends React.Component<any, IAppState> {
  state: IAppState = {
    shelvedBooks: [],
    readBooks: [],
    wantToReadBooks: [],
    currentlyReadingBooks: []
  }

  //runs after the component mounts
  //.then is equivalent to await
  /*
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }*/

  //semi-colons aren't required, but good to do for readability
  async componentDidMount() {
    let shelvedBooks = await BooksAPI.getAll();
    let readBooks = shelvedBooks.filter(book => book.shelf === Shelf.Read);
    let wantToReadBooks = shelvedBooks.filter(book => book.shelf === Shelf.WantToRead);
    let currentlyReadingBooks = shelvedBooks.filter(book => book.shelf === Shelf.CurrentlyReading);

    this.setState({
      //shorthand for books: books etc., only works if they're the same name
      shelvedBooks, readBooks, wantToReadBooks, currentlyReadingBooks
    });
  }

  async moveBook(book: IBook, shelf: Shelf) {
    await BooksAPI.update(book, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList
            currentlyReadingBooks={this.state.currentlyReadingBooks}
            wantToReadBooks={this.state.wantToReadBooks}
            readBooks={this.state.readBooks}
          />
        )}
        />
        <Route path='/addbook' render={({ history }) => (
          <AddBook/>
        )} />
      </div>
    )
  }
}
