import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'
import MenuAppBar from './Appbar.js'
import BottomAppBar from './Bottomnav.js'

const authenticatedOptions = (
  <Fragment>
    <Tooltip title="Add a Screenshot" aria-label="Add a Screenshot">
      <Nav.Link href="#screenshots"><span className="material-icons">add_a_photo</span></Nav.Link>
    </Tooltip>
    <Tooltip title="View your screenshots" aria-label="View your screenshots">
      <Nav.Link href="#index-screenshots"><span className="material-icons">view_list</span></Nav.Link>
    </Tooltip>
    <MenuAppBar/>
    {/* <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link> */}
    <BottomAppBar />
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Tooltip title="Home" aria-label="Home">
      <Nav.Link href="#/"><span className="material-icons">home</span></Nav.Link>
    </Tooltip>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      Stalgiac
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
