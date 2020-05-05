import React, { useState } from 'react';
import './Landing.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faCheckSquare, faTrophy } from '@fortawesome/free-solid-svg-icons';


function Landing(props) {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function registerUser(e) {
        e.preventDefault()

        const data = {
            name: name,
            email: email,
            password: password
        };

        axios.post('http://127.0.0.1:8000/api/register', data)
            .then(response => {
                console.log(response.data);
                props.setUser(response.data.user.name)
                props.setToken(response.data.token)
            })
            .catch(errors => {
                console.log(errors)
            });
    }

    return (
        <div id="main" className="container p-5">
            <div className="row mt-5">
                <div className="col-md-4 text-center">
                    <FontAwesomeIcon className="text-primary" icon={faBookOpen} size="6x" /><br />
                    <h3 className="mt-4 text-secondary">Find your Book</h3>
                </div>
                <div className="col-md-4 text-center">
                    <FontAwesomeIcon className="text-primary" icon={faCheckSquare} size="6x" />
                    <h3 className="mt-4 text-secondary">Stay on Track</h3>
                </div>
                <div className="col-md-4 text-center">
                    <FontAwesomeIcon className="text-primary" icon={faTrophy} size="6x" />
                    <h3 className="mt-4 text-secondary">Meet your Goal</h3>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-4 offset-4 mt-5 mb-5">
                    <form onSubmit={registerUser}>
                        <h5>Get started today</h5>
                        <div class="form-group">
                            <input onChange={(e) => setName(e.target.value)} value={name} type="name" class="form-control" id="exampleInputEmail1" aria-describedby="nameHelp" placeholder="Name" />
                        </div>
                        <div class="form-group">
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                        <div class="form-group">
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" class="btn btn-outline-primary">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Landing;
