import React, { useState } from 'react';
import './Landing.css'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faCheckSquare, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom"
import { far } from '@fortawesome/free-regular-svg-icons';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button, Form, FormGroup, Label, Input
} from 'reactstrap';


function Landing(props) {
    // const API_KEY = 'https://gifted-chimera-277819.uc.r.appspot.com/api/'
    const API_KEY = "http://127.0.0.1:8000/api/"


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

        axios.post(API_KEY + 'register', data)
            .then(response => {
                props.setUserData({
                    user: response.data.user,
                    token: response.data.token
                })
                props.setView("dash")
                // history.push("/dash")

            })
            .catch(errors => {
                console.log(errors)
            });
    }

    const Login = (props) => {
        // const API_KEY = 'https://gifted-chimera-277819.uc.r.appspot.com/api/'
        const API_KEY = "http://127.0.0.1:8000/api/"


        const [password, setPassword] = useState("");
        const [email, setEmail] = useState("");
        // const history = useHistory();

        function loginUser(e) {
            e.preventDefault()

            const data = {
                email: email,
                password: password
            };
            axios.post(API_KEY + 'login', data)
                .then(response => {
                    props.setUserData(response.data)
                    props.setView("dash")

                    // history.push("/dash")
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }

        function logoutUser() {
            const data = {
                headers: { Authorization: "Bearer " + props.user.token }
            }
            axios.get(API_KEY + 'logout', data)
                .then(response => {
                    localStorage.clear();
                    props.setView("home")
                    props.clear({
                        user: {},
                        token: ""
                    })

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }

        return (
            <React.Fragment>
                {!props.user.token ?
                    <form onSubmit={loginUser}>
                        <h5>Login</h5>
                        <div className="form-group">
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="nameHelp" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Login</button>
                    </form>
                    :
                    <React.Fragment>
                        <NavLink href="/dash">My Dashboard</NavLink>
                        <Button onClick={logoutUser} color="secondary">Logout</Button>
                    </React.Fragment>
                }
            </React.Fragment>
        );
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
                <div className="col-6 mt-5 mb-5">
                    <Login
                        user={props.user}
                        setUserData={props.setUserData}
                        setView={props.setView}
                    />
                </div>
                <div className="col-6 mt-5 mb-5">
                    <form onSubmit={registerUser}>
                        <h5>Register</h5>
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
