import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import Landing from './Landing'
import Footer from './Footer'
// import BookSearch from './BookSearch'
import UserDash from './UserDash'
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
  const [token, setToken] = useState("token");

  function useLocalStorage(props) {
    setUser(props.user)
    setToken(props.token)
    setLocalStorage(JSON.stringify(props))
    localStorage.setItem("userData", JSON.stringify(props))
  }
  
  useEffect(() => {
    if(store) {
      setUser(store.user)
      setToken(store.token)
    }
  }, [user])

  return (
    <BrowserRouter>
        <Navbar store={useLocalStorage} user={user} />
        <Switch>
          <Route exact path="/">
            <Landing store={useLocalStorage} />
          </Route>
          <Route path='/dash'>
            <UserDash store={useLocalStorage} user={user}  />
          </Route>
        </Switch>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
