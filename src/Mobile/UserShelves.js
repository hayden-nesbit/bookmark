import React, { useState } from 'react';

const Shelves = (props) => {

    const user = props.user.user
    let tags = props.tags ? props.tags.tags : props.user.user.tags

    function showView(view) {
        props.setRenderList(tags.filter(tag => tag.tag_id === view))
        props.setView(view)
    }
    console.log(props.user)

    
    const dashOptions = () => {
        return (
            <ul className="list-unstyled">
                <li className="mb-3"><a className={props.view === 1 ? "text-muted" : null} href="#" onClick={() => showView(1)}>
                    Want to read ({tags.filter(tag => tag.tag_id === 1).length})</a></li>
                <li className="mb-3"><a className={props.view === 2 ? "text-muted" : null} href="#" onClick={() => showView(2)}>currently-reading ({tags.filter(tag => tag.tag_id === 2).length})</a></li>
                <li className="mb-3"><a className={props.view === 3 ? "text-muted" : null} href="#" onClick={() => showView(3)}>read ({tags.filter(tag => tag.tag_id === 3).length})</a></li>
            </ul>
        )
    }

    return (
        <div className="col mt-4">
            {user ?
                <h5 className="text-center">{user.name}'s <br />bookshelves</h5>
                :
                <h5>Bookshelves</h5>
            }
            <br />
            {dashOptions()}
        </div>
    );
}

export default Shelves;