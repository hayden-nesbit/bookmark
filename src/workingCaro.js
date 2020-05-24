
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
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';




function UserDash(props) {

    // const API_KEY = 'https://gifted-chimera-277819.uc.r.appspot.com/api/'
    const API_KEY = "http://127.0.0.1:8000/api/"


    const [input, setInput] = useState();
    

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

    const [view, setView] = useState(0)


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
                }
                props.storeGoal(tempGoal)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function clearGoal(id, resetPage, tag) {
        let update = props.goal.filter(goal => goal.id !== id)
        updatePage(id, resetPage)

        const data = {
            book_id: id,
            tag_id: tag,
            user_id: user.id
        }
        await axios.post(API_KEY + 'clearGoal', data)
            .then(function (response) {

                console.log(response.data)

                // props.storeGoal(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });

        props.storeGoal(update)

    }

    console.log(input)

    function handleClick(view, check, id, index) {
        setView(view)
        setCheck(check)


        let newCheck = [];
        newCheck.push(id)

        checkId.length > 0 ?
            setCheckId(checkId.concat(newCheck))
            :
            setCheckId(newCheck)

        // let perDiem = (Math.ceil((props.goal[index].pagesLeft) / days))
        let newPageCount = (props.goal[index].pagesLeft) - input

        console.log(input)

        updatePage(id, newPageCount, index)
        setInput("")

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

        console.log(props.item)
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



    // const items = [
    //   {
    //     src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    //     altText: 'Slide 1',
    //     caption: 'Slide 1'
    //   },
    //   {
    //     src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    //     altText: 'Slide 2',
    //     caption: 'Slide 2'
    //   },
    //   {
    //     src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    //     altText: 'Slide 3',
    //     caption: 'Slide 3'
    //   }
    // ];

    const Caro = (props) => {
        const [activeIndex, setActiveIndex] = useState(0);
        const [animating, setAnimating] = useState(false);

        const next = () => {
            if (animating) return;
            const nextIndex = activeIndex === props.goal.length - 1 ? 0 : activeIndex + 1;
            setActiveIndex(nextIndex);
        }

        const previous = () => {
            if (animating) return;
            const nextIndex = activeIndex === 0 ? props.goal.length - 1 : activeIndex - 1;
            setActiveIndex(nextIndex);
        }

        const goToIndex = (newIndex) => {
            if (animating) return;
            setActiveIndex(newIndex);
        }

        let slides = props.goal.length > 0 ? props.goal.map((item, index) => {
            let days = (new Date(item.end_date).getTime() - startDate.getTime()) / (1000 * 3600 * 24)
            let end = item.end_date !== null ? new Date(item.end_date) : startDate
            return (
                <CarouselItem
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}
                    key={item.src}
                >
                    <div id={index} className="col">
                        <div id="goalCard" className="mb-5" style={{ width: '18rem' }}>
                            {/* <div id="goalHeight" className=""> */}
                            <div className="row">
                                <div className="col-4">
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
                                <div className="col-8 pt-2">
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
                                                            <h6 className="card-subtitle text-muted text-center">minutes/day</h6>
                                                            <h1 className="card-title text-center display-3 text-primary mt-0">{Math.ceil((item.pagesLeft / days) * 1.5)} </h1>
                                                        </>
                                                    }

                                                    {/* <div className="form-check mb-5 text-center">
                                                <input type="checkbox" onClick={() => handleClick(0, true, item.id, index, days)} className="form-check-input" id="exampleCheck1" />
                                            </div> */}
                                                    <div className="row mt-5">
                                                        <div className="col">
                                                            <p className="text-center mt-1">I'm on page</p>
                                                            <form onSubmit={() => handleClick(0, true, item.id, index)}>
                                                                {/* <div className="form-control form-control-sm col-md-6 offset-3"> */}
                                                                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className="form-control form-control-sm col-4 offset-4" id="inputsm" />
                                                                {/* </div> */}
                                                            </form>
                                                        </div>
                                                    </div>


                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        })
            :
            <div className="col">
                <h4 className="text-left">You have no current goals!</h4>
            </div>

        return (
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={props.goal} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl color="primary" direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        );
    }


const [renderList, setRenderList] = useState([]);

function showView(view) {
    setRenderList(tags.filter(tag => tag.tag_id === view))
    setView(view)
}


const UpdateButton = (props) => {
    const [dropdownOpen, setOpen] = useState(false);


    const toggle = () => setOpen(!dropdownOpen);

    async function updateBook(id) {

        const data = {
            tag_id: id,
            book_id: props.book,
            prev_tag: view,
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

const dashOptions = () => {
    return (
        <ul className="list-unstyled">
            <li className="mb-3"><a className={view === 1 ? "text-muted" : null} href="#" onClick={() => showView(1)}>want-to-read ({tags.filter(tag => tag.tag_id === 1).length})</a></li>
            <li className="mb-3"><a className={view === 2 ? "text-muted" : null} href="#" onClick={() => showView(2)}>currently-reading ({tags.filter(tag => tag.tag_id === 2).length})</a></li>
            <li className="mb-3"><a className={view === 3 ? "text-muted" : null} href="#" onClick={() => showView(3)}>read ({tags.filter(tag => tag.tag_id === 3).length})</a></li>
            {view === 0 ?
                <li>
                    <br />
                    {props.goal.length > 0 && view === 0 ?
                        <Toggle switchMeasure={switchMeasure} />
                        :
                        null
                    }
                </li>
                :
                <div>
                    <br />
                    <li className="mb-3"><a href="#" onClick={() => showView(0)}><FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" /></a></li>
                </div>
            }
        </ul>
    )
}

return (
    <>
        <div class="row">
            <div className="col-md-4 col-12 mt-4">
                {props.user ?
                    <h5>{user.name}'s <br />bookshelves</h5>
                    :
                    <h5>Bookshelves</h5>
                }
                <br />
                {props.user ? dashOptions() : null}
            </div>
            <div id="goalScroll" className="col-md-8 col-12 mt-4">
                {view !== 0
                    /* && renderList.length > 0  */
                    ?
                    renderList.map((book, index) => {
                        return (
                            <div id="booktable" className="row py-3">
                                <div className="col-sm-5">
                                    <i>{book.title}</i>, {book.author}
                                </div>
                                <div className="col-md-2 col-2">
                                    <UpdateButton
                                        user={props.user}
                                        view={view}
                                        book={book.book_id}
                                        storeTags={props.storeTags}
                                        showView={showView}
                                        id={book.tag_id}
                                        tags={tags}

                                    />
                                </div>
                                <div className="col-md-2 col-2">
                                    <button id={index} onClick={() => setGoal(book.book_id, renderList)} className="btn btn-success btn-sm">Add Goal</button>
                                </div>
                                <div className="col-md-2 col-2">
                                    <button id={index} onClick={() => deleteBook(book.book_id, user.id, book.tag_id)} className="btn btn-danger btn-sm">Remove</button>
                                </div>
                            </div>

                        )
                    })

                    :
                    <>
                        <div className="row d-flex flex-row flex-nowrap">
                            <Caro 
                                goal={props.goal}
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    </>


)


}



export default UserDash;










