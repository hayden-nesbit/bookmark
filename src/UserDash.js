import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSurprise } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import UpdateButton from './UpdateButton.js'
import { useHistory } from "react-router-dom"


function UserDash(props) {

    const [view, setView] = useState(0)
    const history = useHistory();


    const user = props.user.user
    let tags = props.tags ? props.tags.tags : props.user.user.tags

    let want = tags.filter(tag => tag.tag_id === 1)
    let current = tags.filter(tag => tag.tag_id === 2)
    let read = tags.filter(tag => tag.tag_id === 3)
    // let tagView = tags.filter(tag => tag.tag_id === view)
    // console.log(tagView)

    function deleteBook(id, user) {
        console.log(id)
        const data = {
            headers: { Authorization: "Bearer " + props.user.token },
            book_id: id,
            user_id: user
        }
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/deleteBook', data)
            .then(function (response) {
                props.storeTags(response.data)
                console.log(response.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    // const setList = (id, view) => {
    //     let list = tags.filter(tag => tag.tag_id === id)
    //     console.log(list)
    //     setView(view)
    //     return list.map((book, index) => {
    //         return (
    //             <div id={index} className="container mb-4">
    //                 <div className="row">
    //                     <div className="col-sm-8">
    //                         <b>{book.title}</b>, {book.author}
    //                     </div>
    //                     <div className="col-md-2 col-12">
    //                         <button id={index} onClick={() => setGoal(book.book_id, list)} className="btn btn-outline-success btn-sm">Set Goal</button>
    //                     </div>
    //                     <div className="col-md-2 col-12">
    //                         <button id={index} onClick={deleteBook} className="btn btn-outline-danger btn-sm">Remove</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     })
    // }


    // let renderList =[]
    function handleClick(view) {
        setView(view)
        // renderList = setList(id)
    }

    function clearGoal(id) {
        console.log(id)
        props.storeGoal("")
    }


    function setGoal(id, arr) {
        // let currentGoal = renderList.find(({book_id}) => book_id === id);
        let goal = arr.find(({ book_id }) => book_id === id);
        props.storeGoal(goal)
        handleClick(0)
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
                <li className="mb-3"><a href="#" onClick={() => handleClick(1)}>want-to-read ({list1})</a></li>
                <li className="mb-3"><a href="#" onClick={() => handleClick(2)}>currently-reading ({list2})</a></li>
                <li className="mb-3"><a href="#" onClick={() => handleClick(3)}>read ({list3})</a></li>
                {view === 0 ?
                    null
                    :
                    <div>
                        <br />
                        <li className="mb-3"><a href="#" onClick={() => handleClick(0)}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" /></a></li>
                    </div>
                }
            </ul>
        )
    }


    let currentView = current.map((book, index) => {
        return (
            <div id={index} className="container mb-4">
                <div className="row">
                    <div className="col-sm-6">
                        <b>{book.title}</b>, {book.author}
                    </div>
                    <div className="col-md-2 col-12">
                        <UpdateButton
                            user={props.user}
                            view={view}
                            book={book.book_id}
                            storeTags={props.storeTags} />
                    </div>
                    <div className="col-md-2 col-12">
                        <button id={index} onClick={() => setGoal(book.book_id, current)} className="btn btn-success btn-sm">Set Goal</button>
                    </div>
                    <div className="col-md-2 col-12">
                        <button id={index} onClick={() => deleteBook(book.book_id, user.id)} className="btn btn-danger btn-sm">Remove</button>
                    </div>
                </div>
            </div>
        )
    })
    let wantView = want.map((book, index) => {
        return (
            <div id={index} className="container mb-4">
                <div className="row">
                    <div className="col-sm-6">
                        <b>{book.title}</b>, {book.author}
                    </div>
                    <div className="col-md-2 col-12">
                        <UpdateButton
                            user={props.user}
                            view={view}
                            book={book.book_id}
                            storeTags={props.storeTags} />
                    </div>
                    <div className="col-md-2 col-12">
                        <button id={index} onClick={() => setGoal(book.book_id, want)} className="btn btn-success btn-sm">Set Goal</button>
                    </div>
                    <div className="col-md-2 col-12">
                        <button id={index} onClick={() => deleteBook(book.book_id, user.id)} className="btn btn-danger btn-sm">Remove</button>
                    </div>
                </div>
            </div>
        )
    })
    let readView = read.map((book, index) => {
        return (
            <div id={index} className="container mb-4">
                <div className="row">
                    <div className="col-sm-6">
                        <b>{book.title}</b>, {book.author}
                    </div>
                    <div className="col-md-2 col-12">
                        <UpdateButton
                            user={props.user}
                            view={view}
                            book={book.book_id}
                            storeTags={props.storeTags} />
                    </div>
                    <div className="col-md-2 col-12">
                        <button id={index} onClick={() => setGoal(book.book_id, read)} className="btn btn-success btn-sm">Set Goal</button>
                    </div>
                    <div className="col-md-2 col-12">
                        <button id={index} onClick={() => deleteBook(book.book_id, user.id)} className="btn btn-danger btn-sm">Remove</button>
                    </div>
                </div>
            </div>
        )
    })

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
                {view === 1 ? wantView : view === 2 ? currentView : view === 3 ? readView
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
                                {props.goal ?
                                <div>
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
                                <button onClick={() => clearGoal(props.goal.id)} className="btn btn-danger btn-sm text-center mt-3">Clear goal</button>
                                </div>
                                :
                                null
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>


    )
}

export default UserDash;
