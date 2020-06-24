import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
        <footer className="footer mt-auto py-4 bg-light">
            <div className="container">
                <span className="text-muted"><FontAwesomeIcon icon={faBookmark} />  Bookmark by Hayden Nesbit</span>
            </div>
        </footer>
    )
}

export default Footer