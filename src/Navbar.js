import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

function Navbar() {

    const [name, setName] = useState("");
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            email: 'hayden.nesbit@campusoutreach.org',
            password: 'sankey37'
        };

        axios.post('http://127.0.0.1:8000/api/login', data)
            .then(response => {
                console.log(response.data.user);
                setUser(response.data.user)
            })
    }

    return (
        <div>
            <div >
                <nav className="navbar navbar-expand-lg navbar-light px-5 pt-3 border-bottom">
                    <a id="brand" className="navbar-brand text-dark" href="#"><h4><FontAwesomeIcon icon={faBookmark} />  Bookmark</h4></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#"></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"></a>
                            </li>

                            <li className="nav-item">
                                <a href="http://localhost:3000/" className="nav-link mt-1">
                                    
                                    </a>
                            </li>

                        </ul>
                        <form>
                            <div class="form-row align-items-center">
                                <div class="col-auto">
                                    <input type="text" class="form-control mb-2" id="inlineFormInput" placeholder="Email"></input>
                                </div>
                                <div class="col-auto">
                                    <input type="password" class="form-control mb-2" id="inlineFormInput" placeholder="Password"></input>
                                </div>
                                <div class="col-auto">
                                    <button onClick={handleSubmit} type="submit" class="btn btn-secondary mb-2">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar