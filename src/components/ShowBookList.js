import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import axios from 'axios';
import swal from 'sweetalert';
class ShowBookList extends Component {
  
    constructor(props){
      super(props);
      this.state={
        books:[]
      };
    }

    componentDidMount()
    {
      axios
        .get('http://localhost:8082/api/books/')
        .then(res=>{
            this.setState({
              books:res.data
            })
        })
        .catch(er=>{
          swal({
            title: "Error",
            text: "Error while feting book",
            icon: "error",
            button: "Done",
          });
        })
      };
  render() {
      const books=this.state.books;
      console.log("Book found" + books);

      let mybook;

      if(!books)
      {
        mybook="No book found.Database is empty";
      }
      else
      {
        mybook=books.map((book,k)=>
          <BookCard book={book} key={k} />
        )
      }
  
    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Books List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-book" className="btn btn-outline-warning float-right">
                + Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
              {mybook}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowBookList;