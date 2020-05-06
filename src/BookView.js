import React from 'react'
import { useHistory } from "react-router-dom"


function BookView(props) {

    // const history = useHistory();
    const id = parseInt(props.currentBook)
    const book = props.books[id].volumeInfo
    // function goBack() {
    //     history.push("/dash")
    // }
    
    return (
        <div id="main" className="container">
            <div className="row">
                <div className="col-md-3 mt-5">
                    <img src={book.imageLinks.smallThumbnail} /><br/>
                    <button type="button" className="btn btn-primary btn-sm text-center">Add</button>
                </div>
                <div className="col-md-6">
                    <h1 className="mt-5">{book.title}</h1>
                    <h5 className="mt-3 pl-1">by {book.authors}</h5>
                    <p className="mt-5">{book.description}</p>
                    <hr />
                    <p>{book.pageCount} pages</p>
                    <p>Published {book.publishedDate} by {book.publisher}</p>
                    {/* <button className="btn btn-outline-primary" onClick={goBack}>back</button> */}
                </div>
            </div>
        </div>

    )
}
export default BookView;
