import { Link } from "react-router-dom";
import React from 'react'

export default function AddBookButton() {
  return (
    <div className="open-search">
      <Link to='/search'>
        <button>Add Book</button>
      </Link>
    </div>
  );
}