import React from 'react'
import ShelfButton from './ShelfButton'


function BookView(props) {

    const id = parseInt(props.currentBook)
    const book = props.books[id].volumeInfo

    return (
        <div id="main" className="container">
            <div className="row">
                <div className="col-md-3 mt-5">
                    {book.imageLinks ?
                        <img src={book.imageLinks.smallThumbnail} />
                        :
                        null
                    }
                    <br/>
                    <ShelfButton 
                        storeUserTags={props.storeUserTags}
                        // userTags={props.userTags}
                        currentBook={props.books[id]}
                        tags={props.tags}
                        user={props.user}
                        token={props.token}
                        setBookList={props.setBookList}

                        />
                </div>
                <div className="col-md-6">
                    <h1 className="mt-5">{book.title}</h1>
                    <h5 className="mt-3 pl-1">by {book.authors}</h5>
                    <p className="mt-5">{book.description}</p>
                    <hr />
                    <p>{book.pageCount} pages</p>
                    <p>Published {book.publishedDate} by {book.publisher}</p>
                </div>
            </div>
        </div>
    )
}
export default BookView;
