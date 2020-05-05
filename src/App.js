import React, { useState } from 'react';
import Navbar from './Navbar'
import Landing from './Landing'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");


  return (
    <div>
      <Navbar setUser={setUser} setToken={setToken}/>
      <Landing setUser={setUser} setToken={setToken}/>
      <Footer />
    </div>
  );
}

export default App;
