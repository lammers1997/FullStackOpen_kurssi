import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  createBlog,
  setVoteBlog,
  setDeleteBlog,
} from './reducers/blogReducer'

import { loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })
  const user = useSelector((state) => {
    return state.user.user
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    console.log('INIT')
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = async () => {
    dispatch(logoutUser())
  }

  const addBlog = async (blogObject) => {
    dispatch(createBlog(blogObject))
  }

  const handleDeleteBlog = async (blog) => {
    const ok = window.confirm(`remove blog "${blog.title}" by ${blog.author}`)
    if (ok) {
      dispatch(setDeleteBlog(blog))
    } else {
      dispatch(setNotification('Delete cancelled', 'notification', 5))
    }
  }

  const addLike = async (blog) => {
    dispatch(setVoteBlog(blog))
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
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

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />

      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}

          <br />
          <ul>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                deleteBlog={handleDeleteBlog}
                user={user}
                addLike={addLike}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
