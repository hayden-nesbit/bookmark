import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom"


const ShelfButton = (props) => {
  const history = useHistory();
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  function tagBook(id) {
    const book = props.currentBook.volumeInfo
    const data = {
      headers: { Authorization: "Bearer " + props.token },
        uniqueBook: props.currentBook.id,
        tagId: props.tags[id].id,
        userId: props.user.id,
        bookTitle: book.title,
        bookImage: book.imageLinks.smallThumbnail,
        bookPage: book.pageCount,
        bookAuthor: book.authors[0],
        bookCat: book.categories[0],
        bookPubDate: book.publishedDate,
        bookPub: book.publisher,
        bookDescription: book.description
      }
      // console.log(data)
    axios.post('http://127.0.0.1:8000/api/tagBook', data)
      .then(function (response) {
        console.log(response.data);
        history.push("/dash")

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    return (
      <ButtonDropdown className="mt-3" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret size="sm">
          Add to shelf
      </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => tagBook(0)}>want-to-read</DropdownItem>
          <DropdownItem onClick={() => tagBook(1)}>currently-reading</DropdownItem>
          <DropdownItem onClick={() => tagBook(2)}>read</DropdownItem>

        </DropdownMenu>
      </ButtonDropdown>
    );
  }

  export default ShelfButton;