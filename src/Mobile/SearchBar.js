import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import apiKey from '../apiKey'
import { useHistory } from "react-router-dom"


function SearchBar(props) {

    const [search, setSearch] = useState("");
    const history = useHistory();


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
        history.push("/search")
    }

    return (

        <div className="row">
            <div className="col mb-4">
                <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0 mt-3">
                    <input className="form-control mr-sm-2" type="search" onChange={handleChange} placeholder="Find your next book" aria-label="Search" />
                    <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </div>

    )
}
export default SearchBar;
