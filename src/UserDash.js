import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import apiKey from './apiKey'


function UserDash(props) {

    const [search, setSearch] = useState("");
    // const [books, setBooks] = useState([]);

    function handleChange(e) {
        e.preventDefault()
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()

          axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=' + apiKey + "&maxResults=40")
            .then(response => {
                console.log(response)
                props.setBooks(response.data.items);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    console.log(props.books)

    let book = props.books.map((item, index) => {
        console.log(item.volumeInfo.title)
        return(
            <li key={index}>{item.volumeInfo.title}</li>
        )
    })

    return (
        <div>
            <div id="main" className="container mt-4">
                <div className="row">
                    <div className="col-md-4 offset-4 mb-4">
                        <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0 mt-3">
                            <input className="form-control mr-sm-2" type="search" onChange={handleChange} placeholder="Find your next book" aria-label="Search" />
                            <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-4 mt-5">
                        {!props.books.length ? 
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title text-center">Book Title</h5>
                                <h1 className="card-title text-center display-1">6</h1>
                                <h6 className="card-subtitle mb-2 text-muted text-center">pages/day</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <div className="form-check pb-3 text-center">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    {/* <label class="form-check-label" for="exampleCheck1">Check me out</label> */}
                                </div>
                            </div>
                        </div>
                        :
                        book
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}


export default UserDash;
