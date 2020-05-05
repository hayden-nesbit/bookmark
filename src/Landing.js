import React from 'react'
import './Landing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faCheckSquare, faTrophy } from '@fortawesome/free-solid-svg-icons';



function Landing() {


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
                    <form>
                        <h5>Get started today</h5>
                        <div class="form-group">
                            <input type="name" class="form-control" id="exampleInputEmail1" aria-describedby="nameHelp" placeholder="Name" />
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" class="btn btn-outline-primary">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Landing;
