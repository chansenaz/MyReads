import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import AddBook from './AddBook'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={ListBooks} />
        <Route path='/addbook' component={AddBook} />
      </div>
    )
  }
}

export default BooksApp
