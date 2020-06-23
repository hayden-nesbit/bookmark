import React, { useState } from 'react';
import './Landing.css'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faCheckSquare, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom"
import { far } from '@fortawesome/free-regular-svg-icons';


function Landing(props) {
    // const API_KEY = 'https://gifted-chimera-277819.uc.r.appspot.com/api/'
    const API_KEY = "http://127.0.0.1:8000/api/"


    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();


    function registerUser(e) {
        e.preventDefault()

        const data = {
            name: name,
            email: email,
            password: password
        };

        axios.post(API_KEY + 'register', data)
            .then(response => {
                props.setUserData({
                    user: response.data.user,
                    token: response.data.token
                })
                history.push("/dash")

            })
            .catch(errors => {
                console.log(errors)
            });
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6 text-right">
                    <FontAwesomeIcon icon={faBookOpen} className="text-primary" size="6x" /><br />
                </div>
                <div className="col-6 text-left">
                    <h3 className="mt-2 mb-4 text-secondary">Find your Book</h3>
                </div>
            </div>
            <div className="row mt-3 ">
                <div className="col-6 text-right pr-4">
                    <FontAwesomeIcon className="text-primary" icon={faCheckSquare} size="6x" />
                </div>
                <div className="col-6 text-left">
                    <h3 className="mt-2 mb-4 text-secondary">Track your Progress</h3>
                </div>
            </div>
            <div className="row mt-3 ">
                <div className="col-6 text-right">
                    <FontAwesomeIcon className="text-primary" icon={faTrophy} size="6x" />
                </div>
                <div className="col-6 text-left">
                    <h3 className="mt-2 mb-4 text-secondary">Meet your Goal</h3>
                </div>
            </div>

            <div className="row mt-3 text-center">
                <div className="col mt-5 mb-5">
                    <form onSubmit={registerUser}>
                        <h5>Get started today</h5>
                        <div className="form-group">
                            <input onChange={(e) => setName(e.target.value)} value={name} type="name" className="form-control" id="exampleInputEmail1" aria-describedby="nameHelp" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Landing;
