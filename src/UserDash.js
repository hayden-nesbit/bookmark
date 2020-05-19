
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

    const [check, setCheck] = useState(false);
    const [checkId, setCheckId] = useState([]);


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

    let want = tags.filter(tag => tag.tag_id === 1)
    let current = tags.filter(tag => tag.tag_id === 2)
    let read = tags.filter(tag => tag.tag_id === 3)

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





    // let renderList = props.goal
    function handleClick(view, check, id) {
        setView(view)
        setCheck(check)

        let newCheck = [];
        newCheck.push(id)
        console.log(newCheck)
        
        checkId.length > 0 ?
        setCheckId(checkId.concat(newCheck))
        :
        setCheckId(newCheck)
        
    }
    console.log(checkId)

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

        props.goal.length > 0 ?
            props.storeGoal((props.goal).concat(newGoal))
            :
            props.storeGoal(newGoal)

        handleClick(0)
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


    let goalView = props.goal.length > 0 ? props.goal.map((item, index) => {
        let days = (new Date(item.end_date).getTime() - startDate.getTime()) / (1000 * 3600 * 24)

        return (
            <div id={index} className="card mb-5" style={{ width: '18rem' }}>
                <div className="card-body bg-light">
                    <div>
                        <h5 className="card-title text-center">
                            {item.title}
                        </h5>
                        {check === true && checkId.includes(item.id) ?
                            <h4 className="text-center mt-5 mb-5">Nice job!</h4>
                           
                            :
                            <>
                                <h1 className="card-title text-center display-1">
                                    {Math.ceil(item.pageCount / days)}
                                </h1>
                                <h5 className="card-subtitle mb-2 text-muted text-center">pages/day</h5>
                                <hr />
                                <h3 className="card-subtitle mb-2 text-muted text-center">{Math.ceil((item.pageCount / days) * 1.5)} </h3>
                                <h6 className="card-subtitle mb-2 text-muted text-center">min/day</h6>
                                <div className="form-check pb-5 text-center">
                                    <input type="checkbox" onClick={() => handleClick(0, true, item.id)} className="form-check-input" id="exampleCheck1" />
                                </div>
                        

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
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    })
        :
        <h4>You have no current goals!</h4>





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
            <div id="goalScroll" className="col-md-8 mt-5">
                {view === 1 ? wantView : view === 2 ? currentView : view === 3 ? readView
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
