import LoginForm from '../components/Login'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
//ToDo: Hide Login form, when user is logged IN!
const Login = (user) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()
  if (window.localStorage.getItem('loggedBlogappUser')) {
    return null
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  )
}

export default Login
