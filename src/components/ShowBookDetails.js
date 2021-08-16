import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
class showBookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book:{},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8082/api/books/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          book: res.data,
        });
      })
      .catch((er) => {
        swal({
          title: "Error",
          text: "Error while feting book",
          icon: "error",
          button: "Done",
        });
      });
  };

  onDeleteClick(id){
    axios
      .delete("http://localhost:8082/api/books/"+id)
      .then((res)=>{
        swal({
          title: "Done",
          text: "Book Deleted Successfully",
          icon: "success",
          button: "Done",
        })
        .catch((er) => {
          swal({
            title: "Error",
            text: "Error while delteing book",
            icon: "error",
            button: "Done",
          });
        });
        this.props.history.push('/');
      });
  }

  render() {
    const book = this.state.book;

    return (
      <div className="ShowBookDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Book List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Book's Record</h1>
              <p className="lead text-center">View Book's Info</p>
              <hr /> <br />
            </div>
          </div>
          <div className="row mb-5">
              <div className="col-md-3">
                <img src={book.book_url} alt="this book img" />
              </div>
              <div className="col-md-9">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{book.title} by <p>{book.author}</p> </li>
                  <li className="list-group-item">{book.price}</li>
                  <li className="list-group-item">{book.p_d}</li>
                  <li className="list-group-item">{book.desc}</li>
                </ul>
              </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-outline-danger btn-lg btn-block"
                onClick={this.onDeleteClick.bind(this,book._id)}
              >
                Delete Book
              </button>
              <br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-book/${book._id}`} className="btn btn-outline-info btn-lg btn-block">
                Edit Book
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default showBookDetails;
