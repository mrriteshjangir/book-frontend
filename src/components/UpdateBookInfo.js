import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import swal from 'sweetalert';

class UpdateBookInfo extends Component {
  constructor(props){
    super(props);
    this.state={
      book_url:'',
      title:'',
      price:'',
      author:'',
      desc:'',
      p_d:'',
      publisher:''
    };
  }

  componentDidMount(){
    axios
      .get("http://localhost:8082/api/books/" + this.props.match.params.id)
      .then(res=>{
        this.setState({
          book_url:res.data.book_url,
          title:res.data.title,
          price:res.data.price,
          author:res.data.author,
          desc:res.data.desc,
          p_d:res.data.p_d,
          publisher:res.data.publisher,
        })
      })
      .catch((er) => {
        swal({
          title: "Error",
          text: "Error while feting book",
          icon: "error",
          button: "Done",
        });
      }); 
    }

    onChange=e=>{
      this.setState({[e.target.name]:e.target.value});
    }
  
    onSubmit=a=>{
      a.preventDefault();
  
      const packg={
        book_url:this.state.book_url,
        title:this.state.title,
        price:this.state.price,
        author:this.state.author,
        desc:this.state.desc,
        p_d:this.state.p_d,
        publisher:this.state.publisher
      };
  
      axios
        .put('http://localhost:8082/api/books/'+this.props.match.params.id,packg)
        .then(res=>{
          swal({
            title: "Success",
            text: "Book updated Sussessfully!",
            icon: "success",
            button: "Done",
          });
         
          // this.props.history.push('/');
        })
        .catch(er=>{
          swal({
            title: "Error",
            text: "Error while updating book",
            icon: "error",
            button: "Done",
          });
        })
    }
  render() {
    return (
      <div className="UpdateBookInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show BooK List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Book</h1>
              <p className="lead text-center">
                  Update Book's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Book Profile Url'
                    name='book_url'
                    className='form-control'
                    value={this.state.book_url}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Title of the Book'
                    name='title'
                    className='form-control'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Price'
                    name='price'
                    className='form-control'
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Author'
                    name='author'
                    className='form-control'
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Describe this book'
                    name='desc'
                    className='form-control'
                    value={this.state.desc}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <span className="text-danger">Old Date is </span> {this.state.p_d}
                <div className='form-group'>
                  <input
                    type='date'
                    placeholder='published_date'
                    name='p_d'
                    className='form-control'
                    value={this.state.p_d}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Publisher of this Book'
                    name='publisher'
                    className='form-control'
                    value={this.state.publisher}
                    onChange={this.onChange}
                  />
                </div>
                <br />
                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateBookInfo;