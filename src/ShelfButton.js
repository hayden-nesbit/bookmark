import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ShelfButton = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  function addWant(){
    props.storeUserTags({
      "want-to-read": props.currentBook
    })
  }
  function addCurrent(){
    props.storeUserTags({
      "currently-reading": props.currentBook
    })
  }
  function addRead(){
    props.storeUserTags({
      "read": props.currentBook
    })
  }


  return (
    <ButtonDropdown className="mt-3" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret size="sm">
        Add to shelf
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={addWant}>want-to-read</DropdownItem>
        <DropdownItem onClick={addCurrent}>currently-reading</DropdownItem>
        <DropdownItem onClick={addRead}>read</DropdownItem>
        
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default ShelfButton;