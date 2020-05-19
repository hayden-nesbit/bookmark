import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSurprise } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import UpdateButton from './UpdateButton.js'
import { useHistory } from "react-router-dom"
import './UserDash.css'
// import Carousel from './GoalCaro.js'


function UserDash(props) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    function setStart(props) {
        //add axios call to add date into DB
        setStartDate(props)
        localStorage.setItem("startDate", JSON.stringify(props))
    }

    function setEnd(props, id) {
        //add axios call to add date into DB
        setEndDate(props)
        sendGoal(props, id)
        localStorage.setItem("endDate", JSON.stringify(props))
    }

    const [view, setView] = useState(0)
    const history = useHistory();


    const user = props.user.user
    let tags = props.tags ? props.tags.tags : props.user.user.tags
    console.log(tags)

    // let want = tags.filter(tag => tag.tag_id === 1)
    // let current = tags.filter(tag => tag.tag_id === 2)
    // let read = tags.filter(tag => tag.tag_id === 3)

    //
    //
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


    function clearGoal(id) {
        console.log(props.goal)
        let update = props.goal.filter(goal => goal.id !== id)
        console.log(update)
        props.storeGoal(update)
        //change to remove item
        // setEnd("")
    }

    console.log(props.goal)

    function setGoal(id, arr) {
        let newGoal = [];
        newGoal.push(arr.find(({ book_id }) => book_id === id))
        console.log(newGoal)

        props.goal !== null ?
            props.storeGoal((props.goal).concat(newGoal))
            :
            props.storeGoal(newGoal)

        // handleClick(0)
    }

    function sendGoal(endDate, id) {
        const data = {
            headers: { Authorization: "Bearer " + props.user.token },
            book_id: id,
            user_id: user.id,
            // start_date: startDate,
            end_date: endDate,
        }
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/setGoal', data)
            .then(function (response) {
                // let tags = response.data.tags
                // console.log(tags)
                let remove = [];
                remove = props.goal.filter(goal => goal.id !== id)
                remove.push(response.data.tags.find(({ book_id }) => book_id === id))
                console.log(remove)
                props.storeGoal(remove)



            })
            .catch(function (error) {
                console.log(error);
            });
    }



    let goalView = props.goal ? props.goal.map((item, index) => {
        let days = (new Date(item.end_date).getTime() - startDate.getTime()) / (1000 * 3600 * 24)

        return (
            <div id={index} className="card mb-5" style={{ width: '18rem' }}>
                <div className="card-body bg-light">
                    <div>
                        <h5 className="card-title text-center">
                            {item.title}
                        </h5>
                        {days !== 0 ?
                            <>
                                <h1 className="card-title text-center display-1">
                                    {Math.ceil(item.pageCount / days)}
                                </h1>
                                <h5 className="card-subtitle mb-2 text-muted text-center">pages/day</h5>
                                <hr />
                                <h3 className="card-subtitle mb-2 text-muted text-center">{Math.ceil((item.pageCount / days) * 1.5)} </h3>
                                <h6 className="card-subtitle mb-2 text-muted text-center">min/day</h6>
                                <div className="form-check pb-5 text-center">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                </div>
                            </>
                            :
                            null
                        }

                        <div>
                            <DatePicker
                                onChange={date => setStart(date)}
                                placeholderText="Select a start date"
                                selected={startDate}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                            <DatePicker
                                onChange={date => setEnd(date, item.book_id)}
                                placeholderText="Select an end date"
                                selected={endDate}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                            />
                            <button onClick={() => clearGoal(item.id)} className="btn btn-outline-danger btn-sm text-center mt-3">Clear goal</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
        :
        <h4>You have no current goals!</h4>


    const [renderList, setRenderList] = useState([]);

    // let renderList = [];
    function showView(view) {
        setRenderList(tags.filter(tag => tag.tag_id === view))
        console.log(renderList)
        setView(view)

    }


    const dashOptions = () => {
        return (
            <ul className="list-unstyled">
                <li className="mb-3"><a href="#" onClick={() => showView(1)}>want-to-read ({tags.filter(tag => tag.tag_id === 1).length})</a></li>
                <li className="mb-3"><a href="#" onClick={() => showView(2)}>currently-reading ({tags.filter(tag => tag.tag_id === 2).length})</a></li>
                <li className="mb-3"><a href="#" onClick={() => showView(3)}>read ({tags.filter(tag => tag.tag_id === 3).length})</a></li>
                {view === 0 ?
                    null
                    :
                    <div>
                        <br />
                        <li className="mb-3"><a href="#" onClick={() => showView(0)}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" /></a></li>
                    </div>
                }
            </ul>
        )
    }


    // let currentView = current.map((book, index) => {
    //     return (
    //         <div id={index} className="container mb-4">
    //             <div className="row">
    //                 <div className="col-sm-6">
    //                     <i>{book.title}</i>, {book.author}
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <UpdateButton
    //                         user={props.user}
    //                         view={view}
    //                         book={book.book_id}
    //                         storeTags={props.storeTags} />
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={() => setGoal(book.book_id, current)} className="btn btn-success btn-sm">Set Goal</button>
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={() => deleteBook(book.book_id, user.id)} className="btn btn-danger btn-sm">Remove</button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })
    // let wantView = want.map((book, index) => {
    //     return (
    //         <div id={index} className="container mb-4">
    //             <div className="row">
    //                 <div className="col-sm-6">
    //                     <i>{book.title}</i>, {book.author}
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <UpdateButton
    //                         user={props.user}
    //                         view={view}
    //                         book={book.book_id}
    //                         storeTags={props.storeTags} />
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={() => setGoal(book.book_id, want)} className="btn btn-success btn-sm">Set Goal</button>
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={() => deleteBook(book.book_id, user.id)} className="btn btn-danger btn-sm">Remove</button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })
    // let readView = read.map((book, index) => {
    //     return (
    //         <div id={index} className="container mb-4">
    //             <div className="row">
    //                 <div className="col-sm-6">
    //                     <i>{book.title}</i>, {book.author}
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <UpdateButton
    //                         user={props.user}
    //                         view={view}
    //                         book={book.book_id}
    //                         storeTags={props.storeTags} />
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={() => setGoal(book.book_id, read)} className="btn btn-success btn-sm">Set Goal</button>
    //                 </div>
    //                 <div className="col-md-2 col-12">
    //                     <button id={index} onClick={() => deleteBook(book.book_id, user.id)} className="btn btn-danger btn-sm">Remove</button>
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
            <div id="goalScroll" className="col-md-8 mt-5">
                {view !== 0 && renderList.length > 0 ?

                    renderList.map((book, index) => {
                        console.log(book)
                        return (
                            <div id={index} className="container mb-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <i>{book.title}</i>, {book.author}
                                    </div>
                                    <div className="col-md-2 col-12">
                                        <UpdateButton
                                            user={props.user}
                                            view={view}
                                            book={book.book_id}
                                            storeTags={props.storeTags} />
                                    </div>
                                    <div className="col-md-2 col-12">
                                        <button id={index} onClick={() => setGoal(book.book_id, renderList)} className="btn btn-success btn-sm">Set Goal</button>
                                    </div>
                                    <div className="col-md-2 col-12">
                                        <button id={index} onClick={() => deleteBook(book.book_id, user.id)} className="btn btn-danger btn-sm">Remove</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <>
                        {goalView}
                        {/* <Carousel 
                        endDate={props.endDate}
                        goal={props.goal}
                    /> */}
                    </>

                }
            </div>
        </div>


    )
}

export default UserDash;











