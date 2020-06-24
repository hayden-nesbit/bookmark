import React, { useState, useEffect } from 'react';
import ReactNav from './ReactNav'
import Landing from './Landing'
import Footer from './Footer'
import BookView from './BookView'
import UserDash from './UserDash'
import BookSearch from './BookSearch'
import SearchBar from './SearchBar'
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css'
import Shelves from './UserShelves'


function App() {

  var userData = JSON.parse(localStorage.getItem("userData"));
  userData = userData ? userData : {}
  const [user, setUser] = useState(userData);
  const [tags, setTags] = useState(JSON.parse(localStorage.getItem("tagData")));
  const [books, setBooks] = useState(JSON.parse(localStorage.getItem("bookData")));
  const [bookList, setBookList] = useState([]);
  const [currentBook, setCurrentBook] = useState(JSON.parse(localStorage.getItem("CurrentBookId")));
  var goalData = JSON.parse(localStorage.getItem("goalData"));
  goalData = goalData ? goalData : []
  const [goal, setGoal] = useState(goalData);
  const [view, setView] = useState(0)
  const [renderList, setRenderList] = useState([]);

  function storeTags(props) {
    setTags(props)
    localStorage.setItem("tagData", JSON.stringify(props))
  }

  function storeGoal(props) {
    // setGoal(props => props.concat(JSON.parse(goal.data)));
    setGoal(props)
    localStorage.setItem("goalData", JSON.stringify(props))
  }

  function setUserData(userFromApi) {
    setUser(userFromApi)
    localStorage.setItem("userData", JSON.stringify(userFromApi))
  }


  function clearLocalStorage(props) {
    setUser(props.user)
    // setToken(props.token)
    // setLocalStorage(JSON.stringify(props))
    localStorage.removeItem("userData")
  }

  function storeCurrent(props) {
    setCurrentBook(props)
    localStorage.setItem("CurrentBookId", JSON.stringify(props))
  }

  function storeBooks(props) {
    setBooks(props)
    localStorage.setItem("bookData", JSON.stringify(props))
  }

  return (
    <>
      <div id="whole">
        <ReactNav
          clear={clearLocalStorage}
          setUserData={setUserData}
          user={user}
        />

        {view === 0 ?
          <Landing
            setUserData={setUserData}
            user={user}
            setView={setView}
          />

          : view === "search" ?
            <BookSearch
              currentBook={currentBook}
              storeCurrent={storeCurrent}
              books={books}
              setView={setView}
              storeBooks={storeBooks}
            />

            : view === "bookview" ?
              <BookView
                books={books}
                currentBook={currentBook}
                setCurrentBook={setCurrentBook}
                user={user}
                setBookList={setBookList}
                tags={tags}
                storeTags={storeTags}
                setView={setView}

              />
              : view === "dash" ?
                <UserDash
                  setUserData={setUserData}
                  user={user}
                  currentBook={currentBook}
                  storeCurrent={storeCurrent}
                  storeBooks={storeBooks}
                  bookList={bookList}
                  setBookList={setBookList}
                  books={books}
                  tags={tags}
                  storeTags={storeTags}
                  goal={goal}
                  storeGoal={storeGoal}
                  setView={setView}
                  renderList={renderList}
                  setRenderList={setRenderList}
                />
                : view === "shelf" ?
                  <Shelves
                    tags={tags}
                    renderList={renderList}
                    setRenderList={setRenderList}
                    user={user}
                    setView={setView}
                  />
                  : null
        }
      </div>
      <Footer
        view={view}
        setView={setView}
      />
    </>
  );
}

export default App;

