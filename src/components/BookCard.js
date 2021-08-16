import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
const BookCard = (props) => {
    return(
        <div className="card-container">
            <img src={props.book.book_url} alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/show-book/${props.book._id}`}>
                        {props.book.title}
                    </Link>
                </h2>
                <h3 className="text-success">{props.book.price}</h3>
                <h3>{props.book.author}</h3>
                <p>{props.book.desc}</p>
            </div>
        </div>
    )
};

export default BookCard;