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
  NavbarText,
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom"

const ReactNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/"><h4><FontAwesomeIcon icon={faBookmark} />  Bookmark</h4></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {/* <NavLink href="/components/"></NavLink> */}
            </NavItem>
            <NavItem>
              {/* <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink> */}
            </NavItem>
          </Nav>
          <Login 
            clear={props.clear}
            setUserData={props.setUserData}
            storeTags={props.storeTags}
            // token={props.token}
            user={props.user}
            />
        </Collapse>
      </Navbar>
    </div>
  );
}

const Login = (props) => {
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
        console.log(response.data)
        props.setUserData(response.data)
        history.push("/dash")
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  function logoutUser() {
    const data = {
      headers: { Authorization: "Bearer " + props.user.token }
    }
    axios.get('http://127.0.0.1:8000/api/logout', data)
      .then(response => {
        localStorage.clear();
        console.log(response)
        history.push("/")
        props.clear({
          user: {},
          token: ""
        })

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  console.log(props)
  return (
    <React.Fragment>
      {!props.user.token ?
        <Form onSubmit={loginUser} inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2"></Label>
            <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="exampleEmail" placeholder="Email" />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePassword" className="mr-sm-2"></Label>
            <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="examplePassword" placeholder="Password" />
          </FormGroup>
          <Button>Login</Button>
        </Form>
        :
        <React.Fragment>
            <NavLink href="/dash">My Dashboard</NavLink>
          <Button onClick={logoutUser} color="secondary">Logout</Button>
        </React.Fragment>
      }
    </React.Fragment>
  );
}
export default ReactNav;