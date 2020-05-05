import React, { useState } from 'react';
import Navbar from './Navbar'
import Landing from './Landing'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <div>
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
