import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom"

const ReactNav = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

function loginUser(e) {
    e.preventDefault()

        const data = {
            email: email,
            password: password
        };
        axios.post('http://127.0.0.1:8000/api/login', data)
            .then(response => {
                props.store({
                    user: response.data.user,
                    token: response.data.token
                })
                history.push("/dash")
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        axios.get('http://127.0.0.1:8000/api/tags')
            .then(response => {
                console.log(response.data)
                props.storeTags(response.data.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
}

function logoutUser() {
    const data = {
        headers: { Authorization: "Bearer " + props.token }
    }
    axios.get('http://127.0.0.1:8000/api/logout', data)
        .then(response => {
            localStorage.clear();
            console.log(response)
            props.store({
                user: "",
                token: ""
            })
            history.push("/")

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><h4><FontAwesomeIcon icon={faBookmark} />  Bookmark</h4></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default ReactNav;