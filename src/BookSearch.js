import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import apiKey from './apiKey'
import SearchBar from './SearchBar'
import './BookSearch.css'
import axios from 'axios'

function BookSearch(props) {

    const [search, setSearch] = useState("");

    function handleChange(e) {
        e.preventDefault()
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()

        axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=' + apiKey + "&maxResults=40")
            .then(response => {
                console.log(response.data.items)
                props.storeBooks(response.data.items)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            props.setView("search")
    }


    function handleClick(id) {
        props.storeCurrent(id)
        
        props.setView("bookview")
    }

    let book = props.books ? props.books.map((item, index) => {
        return (
            <div>
                <div className="card border-0">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-4">
                                {item.volumeInfo.imageLinks ?
                                    <img src={item.volumeInfo.imageLinks.smallThumbnail} />
                                    :
                                    null
                                }
                            </div>
                            <div className="col-sm-8">
                                <h6>{item.volumeInfo.title}</h6>
                                {item.volumeInfo.authors ?
                                    <p>by {item.volumeInfo.authors}</p>
                                    :
                                    null
                                }
                                <button id={index} onClick={() => handleClick(index)} className="btn btn-outline-primary btn-sm">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
        :
        null

    return (
        <div id="main" className="container">
            <div className="row">
                <div className="col mb-4">
                    <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0 mt-3">
                        <input className="form-control mr-sm-2" type="search" onChange={handleChange} placeholder="Find your next book" aria-label="Search" />
                        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div id="search" className="col-md-8 offset-2 mt-2">
                {book}
            </div>
        </div>


    );
}

export default BookSearch;