import React, { useState } from 'react';
import SearchBar from './SearchBar'
import 'bootstrap/dist/css/bootstrap.css';


function UserDash(props) {
    return (
        <div className="row">
            <div className="col-md-4 mt-5">
                <h5>{props.user.name}'s <br />bookshelves</h5>
            </div>
            <div className="col-md-4 mt-5">
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">Book Title</h5>
                        <h1 className="card-title text-center display-1">5</h1>
                        <h6 className="card-subtitle mb-2 text-muted text-center">pages/day</h6>
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
