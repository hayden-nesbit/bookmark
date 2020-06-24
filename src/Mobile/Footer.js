import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBookOpen, faHome, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

function Footer(props) {
    return (
        <footer className="footer mt-auto py-4 bg-light">
            <div className="container text-center">
                <div className="row">
                    <div className="col-3 text-muted">
                        <FontAwesomeIcon onClick={() => props.setView(0)} icon={faHome} size="2x" />
                    </div>
                    <div className="col-3 text-muted">
                        <FontAwesomeIcon onClick={() => props.setView("dash")} icon={faCheckSquare} size="2x" />
                    </div>
                    <div className="col-3 text-muted">
                        <FontAwesomeIcon onClick={() => props.setView("search")} icon={faSearch} size="2x" />
                    </div>
                    <div className="col-3 text-muted">
                        <FontAwesomeIcon onClick={() => props.setView("shelf")} icon={faBookOpen} size="2x" />
                    </div>
                </div>
                {/* <span className="text-muted"><FontAwesomeIcon icon={faBookmark} />  Bookmark by Hayden Nesbit</span> */}
            </div>
        </footer>
    )
}

export default Footer
