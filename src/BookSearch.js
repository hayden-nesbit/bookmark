// import React, { useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.css';

// function BookSearch() {

// const [search, setSearch] = useState("");
// const [response, setResponse] = useState([]);
// const [apiKey] = useState("AIzaSyALST-ecLuont_6Gy4dH9ejWfusNi1fEzQ");

// function handleChange(e) {
//     e.preventDefault()
//     let search = e.target.value;
//     setSearch(search);
// }

// function handleSubmit(e) {
//     e.preventDefault()

//     axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=' + apiKey + "&maxResults=40")
//         .then(response => {
//             console.log(response)
//             setResponse(response.data.items);
//         });
// }

// let book = response.map((item, index) => (
//     <div>
//         <li key={index}>{item.volumeInfo.title}</li>
//     </div>
// ))

// return (
//     <div>
//         <div className="container mt-5">
//             <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
//                 <input className="form-control mr-sm-2" type="search" onChange={handleChange} placeholder="Search" aria-label="Search" />
//                 <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
//             </form>
//         </div>
//         <div className="container mt-3">
//             {book}
//         </div>
//     </div>
// );
// }

// export default BookSearch