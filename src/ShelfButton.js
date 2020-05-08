import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';

const ShelfButton = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  function tagBook(id) {
    const data = {
      dataObj: { 
        uniqueBook: props.currentBook.id,
        tagId: props.tags[id].id,
        userId: props.user.id,
        bookTitle: props.currentBook.volumeInfo.title,
        bookImage: props.currentBook.volumeInfo.imageLinks.smallThumbnail,
        bookPage: props.currentBook.volumeInfo.pageCount,
        bookAuthor: props.currentBook.volumeInfo.authors,
        bookCat: props.currentBook.volumeInfo.categories,
        bookPubDate: props.currentBook.volumeInfo.publishedDate,
        bookPub: props.currentBook.volumeInfo.publisher}
      }
      console.log(data)
    axios.post('/tagBook', data)
      .then(function (response) {
        console.log(response);
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