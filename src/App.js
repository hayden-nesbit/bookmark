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

  var userData = JSON.parse(localStorage.getItem("userData"));
  userData = userData ? userData : {}
  const [user, setUser] = useState(userData);
  const [tags, setTags] = useState(JSON.parse(localStorage.getItem("tagData")));
  const [books, setBooks] = useState(JSON.parse(localStorage.getItem("bookData")));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookList, setBookList] = useState([]);
  const [currentBook, setCurrentBook] = useState(JSON.parse(localStorage.getItem("CurrentBookId")));
 
  function storeTags(props) {
    setTags(props)
    localStorage.setItem("tagData", JSON.stringify(props))
  }
  
  function setUserData(userFromApi) {
    setUser(userFromApi)
    localStorage.setItem("userData", JSON.stringify(userFromApi))
  }

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

  // useEffect(() => {
  //   if (userData) {
  //     setUser(userData.user)
  //     // setToken(userData.token)
  //   }
  // }, [user])

  return (
    <BrowserRouter>
      <ReactNav
        clear={clearLocalStorage}
        setUserData={setUserData}
        user={user}
        // token={token}

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
            user={user}
            // token={token}
            setBookList={setBookList}
            tags={tags}
            storeTags={storeTags}

          />
        </Route>
        <Route path="/(dash|search)/">
          <Home
            setUserData={setUserData}
            user={user}
            currentBook={currentBook}
            storeCurrent={storeCurrent}
            storeBooks={storeBooks}
            setStart={setStart}
            setEnd={setEnd}
            startDate={startDate}
            endDate={endDate}
            bookList={bookList}
            setBookList={setBookList}
            books={books}
            tags={tags}
            storeTags={storeTags}

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
              currentBook={props.currentBook}
              storeCurrent={props.storeCurrent}
              setStart={props.setStart}
              setEnd={props.setEnd}
              startDate={props.startDate}
              endDate={props.endDate}
              bookList={props.bookList}
              setBookList={props.setBookList}
              books={props.books}
              tags={props.tags}
              storeTags={props.storeTags}
            >
            </UserDash>
          </Route>
          <Route path='/search'>
            <BookSearch
              currentBook={props.currentBook}
              storeCurrent={props.storeCurrent}
              books={props.books}
            >
            </BookSearch>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;

