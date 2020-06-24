import React, { useState } from 'react';

const Shelves = (props) => {

    function showView(view) {
        props.setRenderList(props.tags.filter(tag => tag.tag_id === view))
        props.setView(view)
    }
    
    const dashOptions = () => {
        return (
            <ul className="list-unstyled">
                <li className="mb-3"><a className={props.view === 1 ? "text-muted" : null} href="#" onClick={() => showView(1)}>want-to-read ({props.tags.filter(tag => tag.tag_id === 1).length})</a></li>
                <li className="mb-3"><a className={props.view === 2 ? "text-muted" : null} href="#" onClick={() => showView(2)}>currently-reading ({props.tags.filter(tag => tag.tag_id === 2).length})</a></li>
                <li className="mb-3"><a className={props.view === 3 ? "text-muted" : null} href="#" onClick={() => showView(3)}>read ({props.tags.filter(tag => tag.tag_id === 3).length})</a></li>
                {props.view === 0 ?
                    <li>
                        <br />
                        {props.goal.length > 0 && props.view === 0 ?
                            {/* <Toggle switchMeasure={switchMeasure} /> */}
                            :
                            null
                        }
                    </li>
                    :
                    <div>
                        <br />
                        <li className="mb-3"><a href="#" onClick={() => showView(0)}>back</a></li>
                    </div>
                }
            </ul>
        )
    }

    return (
        <div className="col mt-4">
            {props.user.user && props.view === "shelf" ?
                <h5>{props.user.name}'s <br />bookshelves</h5>
                :
                <h5>Bookshelves</h5>
            }
            <br />
            {props.user.user && props.view === "shelf" ? dashOptions() : null}
        </div>
    );
}

export default Shelves;