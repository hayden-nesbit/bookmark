import React from 'react'
import { useHistory } from "react-router-dom"


function BookView(props) {

    const history = useHistory();
    const id = props.currentBook.currentBook

    function goBack() {
        history.push("/dash")
    }

    return (
            <div id="main" className="container">
                <h1 className="mt-5 text-center">{props.books[id].volumeInfo.title}</h1>
                <button className="btn btn-outline-primary" onClick={goBack}>back</button>
            </div>
        )
    }
export default BookView;
