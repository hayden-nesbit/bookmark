import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom"

function Navbar(props) {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    function loginUser(e) {
        e.preventDefault()

        const data = {
            email: email,
            password: password
        };
        axios.post('http://127.0.0.1:8000/api/login', data)
            .then(response => {
                props.store({
                    user: response.data.user,
                    token: response.data.token
                })
                history.push("/dash")
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    function logoutUser() {
        axios.get('http://127.0.0.1:8000/api/logout')
            .then(response => {
                console.log(response.data)
                localStorage.clear();
                history.push("/")

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return (
        <div>
            <div >
                <nav className="navbar navbar-expand-lg navbar-light px-5 pt-3 border-bottom">
                    <a id="brand" className="navbar-brand text-dark" href="http://localhost:3000/"><h4><FontAwesomeIcon icon={faBookmark} />  Bookmark</h4></a>
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
                        {!props.user ? <form onSubmit={loginUser}>
                            <div class="form-row align-items-center">
                                <div class="col-auto">
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" class="form-control mb-2" id="inlineFormInput" placeholder="Email"></input>
                                </div>
                                <div class="col-auto">
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" class="form-control mb-2" id="inlineFormInput" placeholder="Password"></input>
                                </div>
                                <div class="col-auto">
                                    <button type="submit" class="btn btn-secondary mb-2">Login</button>
                                </div>
                            </div>
                        </form>
                            :
                            <div class="col-auto">
                                <button onClick={logoutUser} type="submit" class="btn btn-secondary mb-2">Logout</button>
                            </div>}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar