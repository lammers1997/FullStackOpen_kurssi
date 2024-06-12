import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

const NavMenu = ({ user, handleLogout }) => {
  //   if (!user) {
  //     return null
  //   }
  const userForm = () => {
    return (
      <>
        {user.name} logged in<Button onClick={handleLogout}>logout</Button>
      </>
    )
  }
  const padding = {
    paddingRight: 5,
    textDecoration: 'none',
    color: 'gray',
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">Blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="container-fluid">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>

          <Nav.Link href="#users" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>

          <Nav.Link href="#" as="span" className="ms-auto">
            {!user && (
              <Link style={padding} to="/login">
                login
              </Link>
            )}
            {user && userForm()}{' '}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavMenu
