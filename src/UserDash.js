import React, { useReducer } from 'react'

function UserDash(props) {
    return (
        <div id="main" className="container">
            <div className="row">
                {/* <aside className="col-md-3 mt-5">
                    <h5>Book shelves</h5>
                </aside> */}
                <div className="col mt-5 text-center">
                    <h1>Welcome, {props.user.name}</h1>
                </div>
            </div>
        </div>
    )
}
export default UserDash;
