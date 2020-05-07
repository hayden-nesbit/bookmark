import React, { useState } from 'react';
import SearchBar from './SearchBar'
import 'bootstrap/dist/css/bootstrap.css';


function UserDash(props) {

    let tags = props.tags ? props.tags.map((item, index) => {
        return (
            <ul key={index} className="list-unstyled">
                <li className="mb-3"><a href="#">{item.title}</a></li>
            </ul>
        )
    })
        :
        null

    return (
        <div className="row">
            <div className="col-md-4 mt-5">
                {props.user ?
                    <h5>{props.user.name}'s <br />bookshelves</h5>
                    :
                    <h5>Bookshelves</h5>
                }
                <br />
                {tags}
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
                                <hr />
                                <h3 className="card-subtitle mb-2 text-muted text-center">{props.books[parseInt(props.currentBook)].volumeInfo.pageCount * 1.5} </h3>
                                <h6 className="card-subtitle mb-2 text-muted text-center">min/day</h6>
                            </div>
                            :
                            <h5 className="card-title text-center">You have no current books!</h5>
                        }

                        <div className="form-check pb-3 text-center">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default UserDash;
