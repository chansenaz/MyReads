import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import AddBook from './AddBook'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  //runs after the component mounts
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  addBook = (book) => {
    
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={ListBooks} />
        
        <Route path='/addbook' render={({ history }) => (
          <AddBook
            onAddBook={(book) => {
              //this.addBook(book)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
