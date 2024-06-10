import LoginForm from '../components/Login'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
//ToDo: Hide Login form, when user is logged IN!
const Login = (user) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  const dispatch = useDispatch()
  if (window.localStorage.getItem('loggedBlogappUser')) {
    return null
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}> log in</button>
      </div>
      <div style={showWhenVisible}>
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        <button onClick={() => setLoginVisible(false)}> cancel </button>
      </div>
    </div>
  )
}

export default Login
