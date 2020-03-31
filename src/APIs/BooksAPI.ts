import { IBook, Shelf } from "../data/IBook";

const api = "https://reactnd-books-api.udacity.com"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

//you can async await instead of .then
/*
export const get = (bookId: string): Promise<IBook> =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)
*/
export async function get(bookId: string): Promise<IBook> {
  let res = await fetch(`${api}/books/${bookId}`, { headers });
  let data = await res.json();
  return data.book;
}

/*
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)
*/
//it looks like we're returning books, but we're actually returning a promise that returns books
//we know that because any function marked async returns a promise
export async function getAll(): Promise<IBook[]> {
  let res = await fetch(`${api}/books`, { headers });
  let data = await res.json();
  return data.books;
}

/*
export const update = (book: IBook, shelf: Shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())
*/
export async function update(book: IBook, shelf: Shelf) {
  let res = await fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  });
}

/*
export const search = (query: any) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data.books)
*/
export async function search(query: string): Promise<IBook[]> {
  let res = await fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });
  let data = await res.json();
  return data.books;
}