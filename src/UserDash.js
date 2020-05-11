import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';


function UserDash(props) {

let days = (props.endDate.getTime() - props.startDate.getTime()) / (1000 * 3600 * 24)

let tags = props.tags ? props.tags.map((item, index) => {
    return (
        <ul key={index} className="list-unstyled">
            <li className="mb-3"><a href="#">{item.title}</a></li>
        </ul>
    )
})
    :
    null

return (
    <div className="row">
        <div className="col-md-4 mt-5">
            {props.user ?
                <h5>{props.user.name}'s <br />bookshelves</h5>
                :
                <h5>Bookshelves</h5>
            }
            <br />
            {tags}
        </div>
        <div className="col-md-4 mt-5">
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    {props.currentBook ?
                        <div>
                            <h5 className="card-title text-center">
                                {props.books[parseInt(props.currentBook)].volumeInfo.title}
                            </h5>
                            <h1 className="card-title text-center display-1">
                                {Math.ceil(props.books[parseInt(props.currentBook)].volumeInfo.pageCount / days)}
                            </h1>
                            <h6 className="card-subtitle mb-2 text-muted text-center">pages/day</h6>
                            <hr />
                            <h3 className="card-subtitle mb-2 text-muted text-center">{Math.ceil(props.books[parseInt(props.currentBook)].volumeInfo.pageCount / days) * 1.5} </h3>
                            <h6 className="card-subtitle mb-2 text-muted text-center">min/day</h6>
                            <div className="form-check pb-5 text-center">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            </div>
                            <DatePicker
                                onChange={date => props.setStart(date)}
                                placeholderText="Select a start date"
                                selected={props.startDate}
                                selectsStart
                                startDate={props.startDate}
                                endDate={props.endDate}
                            />
                            <DatePicker
                                onChange={date => props.setEnd(date)}
                                placeholderText="Select an end date"
                                selected={props.endDate}
                                selectsEnd
                                startDate={props.start}
                                endDate={props.endDate}
                                minDate={props.startDate}
                            />
                        </div>
                        :
                        <h5 className="card-title text-center">You have no current books!</h5>
                    }

                </div>
            </div>
        </div>
    </div>


)
}

export default UserDash;
