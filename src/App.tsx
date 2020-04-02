import React from 'react'
import * as BooksAPI from './APIs/BooksAPI'
import './css/App.css'
import AddBook from './views/AddBook'
import BookList from './views/BookList'
import { Route } from 'react-router-dom'
import { IBook, Shelf } from './data/IBook'

export interface IAppState {
  shelvedBooks: IBook[];
  searchedBooks: IBook[];
}

export default class App extends React.Component<any, IAppState> {
  state: IAppState = {
    shelvedBooks: [],
    searchedBooks: []
  }

  //semi-colons aren't required, but good to do for readability
  async componentDidMount() {
    let shelvedBooks = await BooksAPI.getAll();
    
    console.log(this);
    this.setState({
      //shorthand for shelvedBooks: shelvedBooks
      shelvedBooks
    });
  }


  //Alternatively, searchBooks should maybe go in AddBook since it's not used in any other components?

  //this is a regular method definition. with method definitions, the 'this' is not forced to be anything
  //the method is defined in the prototype object
  //the prototype is an object that is how javascript does its inheritence
  //Object has a prototype
  //the object that extends object has a prototype
  //you start at the lowest child and work your way up until it's defined
  //if we use this method, we need to bind 'this' when we pass this function in the props
  //the question is which way is more memory efficient
  async searchBooks(query: string) {

  //this is a lambda function. 'this' is pinned and not maleable in lambda functions
  //here the method is defined in the instance, so every single instance is going to have this function
  //(remember that functions are objects)
  //searchBooks = async (query: string) => {
    if (query.length > 0) {
      let searchedBooks = await BooksAPI.search(query);

      if (searchedBooks.length > 0) {
        this.setState({ 
          searchedBooks 
        });
      } else {
        this.setState({ 
          searchedBooks: [] 
        });
      }
    } else {
      this.setState({
        searchedBooks: []
      })
    }
  }

  async moveBook(book: IBook, shelf: Shelf) {
    await BooksAPI.update(book, shelf);

    if (shelf === 'none') {
      this.setState(prevState => ({
        shelvedBooks: prevState.shelvedBooks.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        shelvedBooks: prevState.shelvedBooks.filter(b => b.id !== book.id).concat(book)
      }));
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList
            shelvedBooks={this.state.shelvedBooks}
            moveBook={this.moveBook.bind(this)}
          />
        )}
        />
        <Route path='/search' render={({ history }) => (
          <AddBook
            searchedBooks={this.state.searchedBooks}
            searchBooks={this.searchBooks.bind(this)}
            moveBook={this.moveBook.bind(this)}
          />
        )} />
      </div>
    )
  }
}
