import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSurprise } from '@fortawesome/free-solid-svg-icons';


function UserDash(props) {

    const [view, setView] = useState("dash")

    const user = props.user.user
    let tags = props.tags ? props.tags.tags : props.user.user.tags

    let want = tags.filter(tag => tag.tag_id === 1)
    let current = tags.filter(tag => tag.tag_id === 2)
    let read = tags.filter(tag => tag.tag_id === 3)


    const setList = (id) => {
        let list = tags.filter(tag => tag.tag_id === id)
        console.log(list)
        // setView(view)
        list.map((book, index) => {
            return (
                <div id={index} className="container mb-4">
                    <div className="row">
                        <div className="col-sm-8">
                            <b>{book.title}</b>, {book.author}
                        </div>
                        <div className="col-md-2 col-12">
                            <button id={index} onClick={() => setGoal(book.book_id)} className="btn btn-outline-success btn-sm">Set Goal</button>
                        </div>
                        <div className="col-md-2 col-12">
                            <button id={index} onClick={deleteBook} className="btn btn-outline-danger btn-sm">Remove</button>
                        </div>
                    </div>
                </div>
            )
        })
    }


    function handleClick(id, view) {
        setView(view)
        setList(id)
    }

    
    function setGoal(id) {
        //what to call this now?
        current = current.find(({book_id}) => book_id === id);
        props.storeGoal(current)
        handleClick("dash")
    }

    function deleteBook() {
    }

    let days = props.bookList ? (props.endDate.getTime() - props.startDate.getTime()) / (1000 * 3600 * 24) : 0
    let pages = props.bookList && props.goal ? (Math.ceil(props.goal.pageCount / days)) : 0
    let minutes = props.bookList && props.goal ? (Math.ceil(props.goal.pageCount / days) * 1.5) : 0
    let title = props.goal ? (props.goal.title) : "You have no current goals!" 


    const dashOptions = () => {

        let list1 = want ? want.length : 0
        let list2 = current ? current.length : 0
        let list3 = read ? read.length : 0
        return (
            <ul className="list-unstyled">
                <li className="mb-3"><a href="#" onClick={() => handleClick(1, "want")}>want-to-read ({list1})</a></li>
                <li className="mb-3"><a href="#" onClick={() => handleClick(2, "current")}>currently-reading ({list2})</a></li>
                <li className="mb-3"><a href="#" onClick={() => handleClick(3, "read")}>read ({list3})</a></li>
                {view === "dash" ?
                    null
                    :
                    <div>
                        <br />
                        <li className="mb-3"><a href="#" onClick={() => handleClick("dash")}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" /></a></li>
                    </div>
                }
            </ul>
        )
    }

    // let currentView = current.map((book, index) => {
    //     return (
    //         <div id={index} className="container mb-4">
    //             <div className="row">
    //                 <div className="col-sm-8">
    //                     <b>{book.title}</b>, {book.author}
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={() => setGoal(book.book_id)} className="btn btn-outline-success btn-sm">Set Goal</button>
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={deleteBook} className="btn btn-outline-danger btn-sm">Remove</button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })
    // let wantView = want.map((book, index) => {
    //     return (
    //         <div id={index} className="container mb-4">
    //             <div className="row">
    //                 <div className="col-sm-8">
    //                     <b>{book.title}</b>, {book.author}
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={handleClick} className="btn btn-outline-success btn-sm">Set Goal</button>
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={handleClick} className="btn btn-outline-danger btn-sm">Remove</button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })
    // let readView = read.map((book, index) => {
    //     return (
    //         <div id={index} className="container mb-4">
    //             <div className="row">
    //                 <div className="col-sm-8">
    //                     <b>{book.title}</b>, {book.author}
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={handleClick} className="btn btn-outline-success btn-sm">Set Goal</button>
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={handleClick} className="btn btn-outline-danger btn-sm">Remove</button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })

    return (
        <div className="row">
            <div className="col-md-4 mt-5">
                {props.user ?
                    <h5>{user.name}'s <br />bookshelves</h5>
                    :
                    <h5>Bookshelves</h5>
                }
                <br />
                {props.user ? dashOptions() : null}
            </div>
            <div className="col-md-8 mt-5">
                {view === "current" || view === "want" || view === "read" ? setList()
                    :
                    <div className="card mb-5" style={{ width: '18rem' }}>
                        <div className="card-body">

                            <div>
                                <h5 className="card-title text-center">
                                    {title}
                                </h5>
                                <h1 className="card-title text-center display-1">
                                    {pages}
                                </h1>
                                <h5 className="card-subtitle mb-2 text-muted text-center">pages/day</h5>
                                <hr />
                                <h3 className="card-subtitle mb-2 text-muted text-center">{minutes} </h3>
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
                        </div>
                    </div>
                }
            </div>
        </div>


    )
}

export default UserDash;
