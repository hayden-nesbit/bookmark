import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import UpdateButton from './UpdateButton.js'
import './UserDash.css'
import Toggle from './Toggle.js';


function UserDash(props) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [check, setCheck] = useState(false);
    const [checkId, setCheckId] = useState([]);

    const [measure, setMeasure] = useState(false);
    // const [id, setId] = useState(0);

    function setStart(props) {
        setStartDate(props)
        localStorage.setItem("startDate", JSON.stringify(props))
    }

    function setEnd(props, id) {
        setEndDate(props)
        sendGoal(props, id)
        localStorage.setItem("endDate", JSON.stringify(props))
    }

    const [view, setView] = useState(0)


    const user = props.user.user
    let tags = props.tags ? props.tags.tags : props.user.user.tags
    console.log(tags, user)



    async function deleteBook(id, user, view) {
        console.log(id)
        const data = {
            headers: { Authorization: "Bearer " + props.user.token },
            book_id: id,
            user_id: user
        }
        console.log(data)
        await axios.post('http://127.0.0.1:8000/api/deleteBook', data)
            .then(function (response) {
                props.storeTags(response.data)
                console.log(response.data);
                tags = response.data.tags
                showView(view)

            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(props)
    }


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


    function clearGoal(id) {
        console.log(props.goal)
        let update = props.goal.filter(goal => goal.id !== id)
        console.log(update)
        props.storeGoal(update)
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

        showView(0)
    }

    function sendGoal(endDate, id) {
        const data = {
            headers: { Authorization: "Bearer " + props.user.token },
            book_id: id,
            user_id: user.id,
            end_date: endDate,
        }
        console.log(data)
        axios.post('http://127.0.0.1:8000/api/setGoal', data)
            .then(function (response) {
                let remove = [];
                remove = props.goal.filter(goal => goal.id !== id)
                remove.push(response.data.tags.find(({ book_id }) => book_id === id))
                props.storeGoal(remove)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function switchMeasure() {
        measure === true ?
            setMeasure(false)
            :
            setMeasure(true)
    }

    let goalView = props.goal.length > 0 ? props.goal.map((item, index) => {
        let days = (new Date(item.end_date).getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        console.log(item)


        return (
            <div id={index} className="card border-primary mb-5" style={{ width: '18rem' }}>
                {/* <img class="card-img-top" src={item.image} style={{ height: '8rem' }} alt="Card image cap" /> */}
                <div className="card-body">
                    <div>
                        <h5 className="card-title text-center">
                            {item.title}
                        </h5>
                        {check === true && checkId.includes(item.id) ?
                            <>
                                <h4 className="text-center mt-5 mb-5">Nice job!</h4>
                                <button onClick={() => clearGoal(item.id)} className="btn btn-outline-danger btn-sm text-center mt-3">Clear goal</button>
                            </>

                            :
                            <>
                                {measure === false ?
                                    <>
                                        <h1 className="card-title text-center display-1">
                                            {Math.ceil(item.pageCount / days)}
                                        </h1>
                                        <h5 className="card-subtitle mb-2 text-muted text-center">pages/day</h5>
                                    </>
                                    :
                                    <>
                                        <h1 className="card-title text-center display-1">{Math.ceil((item.pageCount / days) * 1.5)} </h1>
                                        <h5 className="card-subtitle mb-2 text-muted text-center">minutes/day</h5>
                                    </>
                                }
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


    const [renderList, setRenderList] = useState([]);

    function showView(view) {
        setRenderList(tags.filter(tag => tag.tag_id === view))
        setView(view)
    }
    console.log(renderList)


    const dashOptions = () => {
        return (
            <ul className="list-unstyled">
                <li className="mb-3 active"><a href="#" onClick={() => showView(1)}>want-to-read ({tags.filter(tag => tag.tag_id === 1).length})</a></li>
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
    console.log(renderList)
    return (
        <>
            <div id="switchButton" className="row">
                <div className="col-4 offset-4">
                    {props.goal.length > 0 && view === 0 ?
                        <Toggle switchMeasure={switchMeasure} />
                        :
                        null
                    }
                </div>
            </div>
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
                    {view !== 0 && renderList.length > 0
                        ?
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
                                                storeTags={props.storeTags}
                                                showView={showView}
                                                id={book.tag_id} />
                                        </div>
                                        <div className="col-md-2 col-12">
                                            <button id={index} onClick={() => setGoal(book.book_id, renderList)} className="btn btn-success btn-sm mt-1">Set Goal</button>
                                        </div>
                                        <div className="col-md-2 col-12">
                                            <button id={index} onClick={() => deleteBook(book.book_id, user.id, book.tag_id)} className="btn btn-danger btn-sm mt-1">Remove</button>
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
        </>


    )


}





export default UserDash;



