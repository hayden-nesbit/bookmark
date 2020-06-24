import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './UserDash.css'
import Toggle from './Toggle.js';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';



function UserDash(props) {

    // const API_KEY = 'https://gifted-chimera-277819.uc.r.appspot.com/api/'
    const API_KEY = "http://127.0.0.1:8000/api/"


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [check, setCheck] = useState(false);
    const [checkId, setCheckId] = useState([]);

    const [measure, setMeasure] = useState(false);

    function setStart(props) {
        setStartDate(props)
        localStorage.setItem("startDate", JSON.stringify(props))
    }

    function setEnd(props, id, index) {
        setEndDate(props)
        sendGoal(props, id, index)
        localStorage.setItem("endDate", JSON.stringify(props))
    }

    function setInput(input, id) {
        let tempGoal = [...props.goal]
        for (let goal of tempGoal) {
            if (goal.id === id) {
                goal.currentPage = input
            }
        }
        props.storeGoal(tempGoal)
    }

    const [shelfView, setShelfView] = useState(0)


    const user = props.user.user
    let tags = props.tags ? props.tags.tags : props.user.user.tags


    async function deleteBook(id, user, view) {
        const data = {
            headers: { Authorization: "Bearer " + props.user.token },
            book_id: id,
            user_id: user
        }
        await axios.post(API_KEY + 'deleteBook', data)
            .then(function (response) {
                props.storeTags(response.data)
                tags = response.data.tags
                showView(view)

                let resetGoal = props.goal.filter(goal => goal.id !== id)
                props.storeGoal(resetGoal)

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    async function updatePage(id, newPageCount, index, resetPage) {

        const data = {
            id: id,
            pagesLeft: newPageCount ? newPageCount : resetPage,
            user_id: user.id
        }
        await axios.post(API_KEY + 'updatePage', data)
            .then(function (response) {
                let remove = [];
                remove = props.goal.filter(goal => goal.id !== id)
                remove.splice(index, 0, response.data.tags.find(({ book_id }) => book_id === id))

                let first = user.name.split(" ")
                first = first[0]

                let notes = ["Great job, " + first + "!", "Good work today!", "Awesome! See you tomorrow " + first + "!", "One day closer!", "You're on a roll, " + first + "!", "Nice!"]
                let note = notes[Math.floor(Math.random() * notes.length)];
                let tempGoal = [...remove]
                for (let goal of tempGoal) {
                    if (goal.id === id) {
                        goal.phrase = note
                    }
                    //replicate this for "I'm on page" section
                }
                props.storeGoal(tempGoal)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function clearGoal(id, resetPage, tag) {

        const data = {
            book_id: id,
            tag_id: tag,
            user_id: user.id,
            pagesLeft: resetPage
        }
        await axios.post(API_KEY + 'clearGoal', data)
            .then(function (response) {

                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });

        let update = props.goal.filter(goal => goal.id !== id)
        props.storeGoal(update)

    }

    function handleClick(view, check, id, index) {
        setShelfView(view)
        setCheck(check)


        let newCheck = [];
        newCheck.push(id)

        checkId.length > 0 ?
            setCheckId(checkId.concat(newCheck))
            :
            setCheckId(newCheck)

        // let perDiem = (Math.ceil((props.goal[index].pagesLeft) / days))
        let newPageCount = (props.goal[index].pagesLeft) - props.goal[index].currentPage


        updatePage(id, newPageCount, index)

    }

    function setGoal(id, arr) {
        let newGoal = [];
        newGoal.push(arr.find(({ book_id }) => book_id === id))

        props.goal.length > 0 ?
            props.storeGoal((props.goal).concat(newGoal))
            :
            props.storeGoal(newGoal)

        showView(0)
    }

    function sendGoal(endDate, id, index) {
        const data = {
            headers: { Authorization: "Bearer " + props.user.token },
            book_id: id,
            user_id: user.id,
            end_date: endDate,
        }
        axios.post(API_KEY + 'setGoal', data)
            .then(function (response) {
                let remove = [];
                remove = props.goal.filter(goal => goal.id !== id)
                remove.splice(index, 0, response.data.tags.find(({ book_id }) => book_id === id))
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

    const DateDrop = (props) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggle = () => setIsOpen(!isOpen);

        return (
            <div>
                {props.item.pagesLeft < 0 ?
                    <button onClick={() => clearGoal(props.item.id, props.item.pageCount, props.item.tag_id)} className="btn btn-outline-success btn-sm text-center">Done</button>
                    :
                    <>
                        {props.item.end_date === null ?
                            <Button color="outline-success" size="sm" onClick={toggle} style={{ marginBottom: '1rem' }}>Set goal</Button>
                            :
                            <Button color="outline-success" size="sm" onClick={toggle} style={{ marginBottom: '1rem' }}>Update goal</Button>
                        }
                        <Collapse isOpen={isOpen}>
                            <DatePicker
                                onChange={date => setStart(date)}
                                placeholderText="Select a start date"
                                selected={startDate}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                            <DatePicker
                                onChange={date => setEnd(date, props.item.book_id, props.index)}
                                placeholderText="Select an end date"
                                selected={props.end}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                            />

                            <button onClick={() => clearGoal(props.item.id, props.item.pageCount, props.item.tag_id)} className="btn btn-outline-danger btn-sm float-left mt-3">Clear goal</button>
                        </Collapse>
                    </>
                }
            </div>
        );
    }



    let goalView = props.goal.length > 0 ? props.goal.map((item, index) => {
        let days = (new Date(item.end_date).getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        let end = item.end_date !== null ? new Date(item.end_date) : startDate

        return (
            <div key={index} className="col">
                <div id="goalCard" className="mb-5 mt-4" style={{ width: '18rem' }}>
                    {/* <div id="goalHeight" className=""> */}
                    <div className="row">
                        <div className="col">
                            {item.image ?
                                <img src={item.image} className="float-left mb-3" />
                                :
                                <h5 className="text-center float-right">
                                    {item.title}
                                </h5>
                            }

                            <DateDrop
                                item={item}
                                index={index}
                                end={end}
                            />

                        </div>
                        <div className="col pt-2">
                            <div className="row">
                                <div className="col">
                                    {check === true && checkId.includes(item.id) ?
                                        <>
                                            <div className="text-primary text-center mt-3">
                                                <FontAwesomeIcon icon={faThumbsUp} size="3x" />
                                                {item.pagesLeft < 0 ?
                                                    <>
                                                        <h4 className="text-center mt-3 mb-5">Congrats! You're finished!</h4>
                                                    </>
                                                    :
                                                    <h4 className="text-center mt-3 mb-5 px-4">{item.phrase}</h4>
                                                }
                                            </div>
                                        </>
                                        :
                                        <>

                                            {measure === false ?
                                                <>
                                                    <h5 className="card-subtitle text-primary text-center">pages/day</h5>
                                                    <h1 className="card-title text-center display-3 text-primary mt-0">
                                                        {Math.ceil(item.pagesLeft / days)}
                                                    </h1>
                                                </>
                                                :
                                                <>
                                                    <h5 className="card-subtitle text-primary text-center">minutes/day</h5>
                                                    <h1 className="card-title text-center display-3 text-primary mt-0">{Math.ceil((item.pagesLeft / days) * 1.5)} </h1>
                                                </>
                                            }

                                            {end !== startDate ?
                                                <div className="row mt-5">
                                                    <div className="col">
                                                        <p className="text-center mt-1">I'm on page</p>
                                                        <form onSubmit={() => handleClick(0, true, item.id, index)}>
                                                            <input onChange={(e) => setInput(e.target.value, item.id)} type="text" className="form-control form-control-sm col-4 offset-4" id="inputsm" />
                                                        </form>
                                                    </div>
                                                </div>
                                                :
                                                null
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
        :
        <div className="col">
            <h4 className="text-left">You have no current goals!</h4>
        </div>



    function showView(view) {
        props.setRenderList(tags.filter(tag => tag.tag_id === view))
        setShelfView(view)
    }


    const UpdateButton = (props) => {
        const [dropdownOpen, setOpen] = useState(false);


        const toggle = () => setOpen(!dropdownOpen);

        async function updateBook(id) {

            const data = {
                tag_id: id,
                book_id: props.book,
                prev_tag: shelfView,
                user_id: user.id
            }
            await axios.post(API_KEY + 'updateBook', data)
                .then(function (response) {
                    props.storeTags(response.data)
                    tags = response.data.tags
                    showView(props.view)

                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        return (
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret size="sm">
                    Update
              </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => updateBook(1)}>want-to-read</DropdownItem>
                    <DropdownItem onClick={() => updateBook(2)}>currently-reading</DropdownItem>
                    <DropdownItem onClick={() => updateBook(3)}>read</DropdownItem>

                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    // const dashOptions = () => {
    //     return (
    //         <ul className="list-unstyled">
    //             <li className="mb-3"><a className={view === 1 ? "text-muted" : null} href="#" onClick={() => showView(1)}>want-to-read ({tags.filter(tag => tag.tag_id === 1).length})</a></li>
    //             <li className="mb-3"><a className={view === 2 ? "text-muted" : null} href="#" onClick={() => showView(2)}>currently-reading ({tags.filter(tag => tag.tag_id === 2).length})</a></li>
    //             <li className="mb-3"><a className={view === 3 ? "text-muted" : null} href="#" onClick={() => showView(3)}>read ({tags.filter(tag => tag.tag_id === 3).length})</a></li>
    //             {view === 0 ?
    //                 <li>
    //                     <br />
    //                     {props.goal.length > 0 && view === 0 ?
    //                         <Toggle switchMeasure={switchMeasure} />
    //                         :
    //                         null
    //                     }
    //                 </li>
    //                 :
    //                 <div>
    //                     <br />
    //                     <li className="mb-3"><a href="#" onClick={() => showView(0)}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" /></a></li>
    //                 </div>
    //             }
    //         </ul>
    //     )
    // }

    return (

       

                    
                    <>
                        <div className="row d-flex flex-row flex-nowrap">
                            {goalView}
                        </div>
                    </>
                
          



    )


}



export default UserDash;


















