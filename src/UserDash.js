import React, { useState } from 'react';
import SearchBar from './SearchBar'
import 'bootstrap/dist/css/bootstrap.css';


function UserDash(props) {

    return (
        <div className="row">
            <div className="col-md-4 mt-5">
                <h5>{props.user.name}'s <br />bookshelves</h5>
                <br />
                <ul className="list-unstyled">
                    <li className="mb-3"><a href="#">want-to-read</a></li>
                    <li className="mb-3"><a href="#">currently-reading</a></li>
                    <li><a href="#">read</a></li>
                </ul>
            </div>
            <div className="col-md-4 mt-5">
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        {props.currentBook ?
                            <div>
                                <h5 className="card-title text-center">
                                    {props.books[parseInt(props.currentBook)].volumeInfo.title}
                                </h5>
                                <h1 className="card-title text-center display-1">
                                    {props.books[parseInt(props.currentBook)].volumeInfo.pageCount}
                                </h1>
                                <h6 className="card-subtitle mb-2 text-muted text-center">pages/day</h6>
                            </div>
                            :
                            <h5 className="card-title text-center">You have no current books!</h5>
                        }
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <div className="form-check pb-3 text-center">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}


export default UserDash;
