import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from 'react-router-dom'
const NavMenu = ({ user, handleLogout }) => {
  //   if (!user) {
  //     return null
  //   }
  const userForm = () => {
    return (
      <>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </>
    )
  }
  const padding = {
    paddingRight: 5,
  }
  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {!user && (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
      {user && userForm()}
    </div>
  )
}
export default NavMenu
