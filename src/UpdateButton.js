import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom"


const UpdateButton = (props) => {
//   const history = useHistory();
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  function updateBook(id, view) {
    
    const data = {
        tag_id: id,
        book_id: props.book,
        prev_tag: props.view,
        user_id: props.user.user.id
      }
    
    axios.post('http://127.0.0.1:8000/api/updateBook', data)
      .then(function (response) {
        props.storeTags(response.data)
        props.showView(view)

      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret size="sm">
          Update
      </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => updateBook(1)}>want-to-read</DropdownItem>
          <DropdownItem onClick={() => updateBook(2)}>currently-reading</DropdownItem>
          <DropdownItem onClick={() => updateBook(3)}>read</DropdownItem>

        </DropdownMenu>
      </ButtonDropdown>
    );
  }

  export default UpdateButton;