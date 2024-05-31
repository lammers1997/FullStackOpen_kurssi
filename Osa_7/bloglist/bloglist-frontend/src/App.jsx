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
} from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (message, type = 'notification') => {
    dispatch(setNotification(message, type, 5)) // message, type, time
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      handleNotification('Invalid username or password', 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      handleNotification(
        `a new blog "${blogObject.title}" by ${blogObject.author} created!`
      )
      console.log(blogs)
    } catch (error) {
      console.log('ERROR!')
      handleNotification('Error adding blog', 'error')
    }
  }

  const handleDeleteBlog = async (blog) => {
    const ok = window.confirm(`remove blog "${blog.title}" by ${blog.author}`)
    if (ok) {
      const response = await blogService.deleteBlog(blog.id)
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id))
      handleNotification(` Blog "${blog.title}" by ${blog.author} deleted`)
    } else {
      console.log('delete cancelled')
    }
  }

  const addLike = async (blog) => {
    try {
      dispatch(setVoteBlog(blog))
      handleNotification(`you liked ${blog.title}`)
    } catch (error) {
      handleNotification(error.response.data.error, 'error')
    }
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
