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
        const data = {
            headers: { Authorization: "Bearer " + props.token }
        }
        axios.get('http://127.0.0.1:8000/api/logout', data)
            .then(response => {
                localStorage.clear();
                console.log(response)
                props.store({
                    user: "",
                    token: ""
                })
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
                        {!props.token ? <form onSubmit={loginUser}>
                            <div className="form-row align-items-center">
                                <div className="col-auto">
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="form-control mb-2" id="inlineFormInput" placeholder="Email"></input>
                                </div>
                                <div className="col-auto">
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control mb-2" id="inlineFormInput" placeholder="Password"></input>
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-secondary mb-2">Login</button>
                                </div>
                            </div>
                        </form>
                            :
                            <div>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href="/dash">My Dashboard</a>
                                        </li>
                                    </ul>
                                    <div className="col-auto">
                                        <button onClick={logoutUser} type="submit" className="btn btn-secondary mb-2">Logout</button>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar