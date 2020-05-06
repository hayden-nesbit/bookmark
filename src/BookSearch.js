import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import apiKey from './apiKey'
import SearchBar from './SearchBar'
import { useHistory, Redirect } from "react-router-dom"

function BookSearch(props) {

    const history = useHistory();

    function handleClick(e) {
        props.storeCurrent(e.target.id)
        history.push("/books")
    }

    let book = props.books ? props.books.map((item, index) => {
        return (
            <div>
                <li key={index}>
                    <a href={item.id}>{item.volumeInfo.title}</a>
                    <button id={index} onClick={handleClick} className="btn btn-outline-primary float right">View</button>
                </li>
            </div>
        )
    })
        :
        null

    return (
        <div className="row">
            <div className="col-md-4 offset-4 mt-5">
                {book}
            </div>
        </div>


    );
}

export default BookSearch;