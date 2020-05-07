import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
// import ReactNav from './ReactNav'
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

  const [store, setLocalStorage] = useState(JSON.parse(localStorage.getItem("userData")));
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [books, setBooks] = useState(JSON.parse(localStorage.getItem("bookData")));
  const [currentBook, setCurrentBook] = useState(JSON.parse(localStorage.getItem("CurrentBookId")));
  const [tags, setTags] = useState(JSON.parse(localStorage.getItem("tagData")));
  const [userTags, setUserTags] = useState(JSON.parse(localStorage.getItem("UserTagData")));


  function useLocalStorage(props) {
    setUser(props.user)
    setToken(props.token)
    setLocalStorage(JSON.stringify(props))
    localStorage.setItem("userData", JSON.stringify(props))
  }

  function storeCurrent(props) {
    setCurrentBook(props)
    localStorage.setItem("CurrentBookId", JSON.stringify(props))
  }

  function storeBooks(props) {
    setBooks(props)
    localStorage.setItem("bookData", JSON.stringify(props))
  }

  function storeTags(props){
    setTags(props)
    localStorage.setItem("tagData", JSON.stringify(props))
  }

  function storeUserTags(props){
    setUserTags(props)
    localStorage.setItem("UserTagData", JSON.stringify(props))
  }

  useEffect(() => {
    if (store) {
      setUser(store.user)
      setToken(store.token)
    }
  }, [user])
  return (
    <BrowserRouter>
      <Navbar
        store={useLocalStorage}
        user={user}
        token={token}
        storeTags={storeTags}
        tags={tags} />
      <Switch>
        <Route exact path="/">
          <Landing store={useLocalStorage} />
        </Route>
        <Route path='/books'>
          <BookView
            books={books}
            currentBook={currentBook}
            setCurrentBook={setCurrentBook}
            storeUserTags={storeUserTags}
            userTags={userTags}
          />
        </Route>
        <Route path="/(dash|search)/">
          <Home
            store={useLocalStorage}
            user={user}
            books={books}
            currentBook={currentBook}
            storeCurrent={storeCurrent}
            storeBooks={storeBooks}
            storeTags={storeTags}
            tags={tags}>
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
              store={props.store}
              user={props.user}
              books={props.books}
              currentBook={props.currentBook}
              storeCurrent={props.storeCurrent}
              storeTags={props.storeTags}
              tags={props.tags}>
            </UserDash>
          </Route>
          <Route path='/search'>
            <BookSearch
              books={props.books}
              currentBook={props.currentBook}
              setCurrentBook={props.setCurrentBook}
              storeCurrent={props.storeCurrent}>
            </BookSearch>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;
