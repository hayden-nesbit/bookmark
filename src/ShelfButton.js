import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ShelfButton = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret size="sm">
        Add to shelf
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>want-to-read</DropdownItem>
        <DropdownItem>currently-reading</DropdownItem>
        <DropdownItem>read</DropdownItem>
        
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default ShelfButton;