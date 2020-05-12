import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';


function UserDash(props) {

    // let days = (props.endDate.getTime() - props.startDate.getTime()) / (1000 * 3600 * 24)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tags') 
        .then(function (response) {
            props.setBookList(response.data)
            console.log(response.data);
            // history.push("/dash")
          })
          .catch(function (error) {
            console.log(error);
          });
        
      }, [])

    let list1 = props.bookList.wantToRead ? props.bookList.wantToRead.length : 0
    let list2 = props.bookList.currentlyReading ? props.bookList.currentlyReading.length : 0
    let list3 = props.bookList.read ? props.bookList.read.length : 0
    console.log(list1)

    // let tags = props.tags ? props.tags.map((item, index) => {
    //     return (
    //         <ul key={index} className="list-unstyled">
    //             <li className="mb-3"><a href="#">{item.title} ({list1})</a></li>
    //         </ul>
    //     )
    // })
    // :
    // null

    return (
        <div className="row">
            <div className="col-md-4 mt-5">
                {props.user ?
                    <h5>{props.user.name}'s <br />bookshelves</h5>
                    :
                    <h5>Bookshelves</h5>
                }
                <br />
                <ul className="list-unstyled">
                    <li className="mb-3"><a href="/bookdash">want-to-read ({list1})</a></li>
                    <li className="mb-3"><a href="/bookdash">currently-reading ({list2})</a></li>
                    <li className="mb-3"><a href="/bookdash">read ({list3})</a></li>
                </ul>
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
                                    {/* {Math.ceil(props.books[parseInt(props.currentBook)].volumeInfo.pageCount / days)} */}
                                </h1>
                                <h6 className="card-subtitle mb-2 text-muted text-center">pages/day</h6>
                                <hr />
                                {/* <h3 className="card-subtitle mb-2 text-muted text-center">{Math.ceil(props.books[parseInt(props.currentBook)].volumeInfo.pageCount / days) * 1.5} </h3> */}
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
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    minDate={props.startDate}
                                />
                            </div>
                            :
                            <h5 className="card-title text-center">You have no current goal!</h5>
                        }

                    </div>
                </div>
            </div>
        </div>


    )
}

export default UserDash;
