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

function App() {

  const [userData, setLocalStorage] = useState(JSON.parse(localStorage.getItem("userData")));
  const [user, setUser] = useState({ user: null });
  const [token, setToken] = useState("");
  // const [tags, setTags] = useState("")
  const [books, setBooks] = useState(JSON.parse(localStorage.getItem("bookData")));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookList, setBookList] = useState([]);
  const [currentBook, setCurrentBook] = useState(JSON.parse(localStorage.getItem("CurrentBookId")));
  // const [tags, setTags] = useState(JSON.parse(localStorage.getItem("tagData")));
  // const [userTags, setUserTags] = useState(JSON.parse(localStorage.getItem("UserTagData")));

  function setUserData(props) {
    setUser(props.user)
    setToken(props.token)
    setLocalStorage(JSON.stringify(props))
    localStorage.setItem("userData", JSON.stringify(props))
  }

  // function storeTags(props) {
  //   setTags(props)
  //   localStorage.setItem("tagData", JSON.stringify(props))
  // }

  // function storeUserTags(props) {
  //   setUserTags(props)
  //   localStorage.setItem("UserTagData", JSON.stringify(props))
  // }

  function setStart(props) {
    //add axios call to add date into DB
    setStartDate(props)
    localStorage.setItem("startDate", JSON.stringify(props))
  }

  function setEnd(props) {
    //add axios call to add date into DB
    setEndDate(props)
    localStorage.setItem("endDate", JSON.stringify(props))
  }

  function clearLocalStorage(props) {
    setUser(props.user)
    setToken(props.token)
    setLocalStorage(JSON.stringify(props))
  }

  function storeCurrent(props) {
    setCurrentBook(props)
    localStorage.setItem("CurrentBookId", JSON.stringify(props))
  }

  function storeBooks(props) {
    setBooks(props)
    localStorage.setItem("bookData", JSON.stringify(props))
  }

  useEffect(() => {
    if (userData) {
      setUser(userData.user)
      setToken(userData.token)
    }
  }, [user])

  return (
    <BrowserRouter>
      <ReactNav
        clear={clearLocalStorage}
        setUserData={setUserData}
        user={user}
        token={token}
        // storeTags={storeTags}
        // tags={tags}

      />
      <Switch>
        <Route exact path="/">
          <Landing setUserData={setUserData} />
        </Route>
        <Route path='/books'>
          <BookView
            books={books}
            currentBook={currentBook}
            setCurrentBook={setCurrentBook}
            // storeUserTags={storeUserTags}
            // tags={tags}
            user={user}
            token={token}
            setBookList={setBookList}

          />
        </Route>
        <Route path="/(dash|search)/">
          <Home
            setUserData={setUserData}
            user={user}
            books={books}
            currentBook={currentBook}
            storeCurrent={storeCurrent}
            storeBooks={storeBooks}
            // storeTags={storeTags}
            // tags={tags}
            setStart={setStart}
            setEnd={setEnd}
            startDate={startDate}
            endDate={endDate}
            bookList={bookList}
            setBookList={setBookList}

          >
          </Home>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
function Home(props) {
  return (
    <div>
      <div id="main" className="container mt-4">
        <SearchBar storeBooks={props.storeBooks} />
        <Switch>
          <Route path='/dash'>
            <UserDash
              setUserData={props.setUserData}
              user={props.user}
              books={props.books}
              currentBook={props.currentBook}
              storeCurrent={props.storeCurrent}
              // storeTags={props.storeTags}
              // tags={props.tags}
              setStart={props.setStart}
              setEnd={props.setEnd}
              startDate={props.startDate}
              endDate={props.endDate}
              bookList={props.bookList}
              setBookList={props.setBookList}
            >
            </UserDash>
          </Route>
          <Route path='/search'>
            <BookSearch
              books={props.books}
              currentBook={props.currentBook}
              storeCurrent={props.storeCurrent}
            >
            </BookSearch>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;

