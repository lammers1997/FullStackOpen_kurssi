import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [blogsToShow, setBlogsToShow] = useState([])

  const [notification, setNotification] = useState({ message: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  // useEffect(() => {
  //   console.log("second")
  //   setBlogsToShow(blogs.filter(blog => blog.user.username === user.username))
  // }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (message, type = 'notification') => {
    setNotification({
      message, type
    })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleNotification('Invalid username or password!', 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async (blogObject) => {

    try {
      const newBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(newBlog))

      //This feels like unnecessary fetch from the backend
      //But for some odd reason, it makes the code work
      //Otherwise it wouldnt update the blogs, when new is added
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)

      handleNotification(`a new blog "${newBlog.title}" by ${newBlog.author} created!`)

    } catch (error) {
      handleNotification(error.response.data.error, 'error')
    }
  }

  const handleDeleteBlog = async (blogId) => {

    const response = await blogService.deleteBlog(blogId)
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId))
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
          <Notification notification={notification} />
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
    <Togglable buttonLabel='new blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogsToShow = (!user)
    ? blogs
    : blogs.filter(blog => blog.user.username === user.username)

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
        {blogForm()}
      </div>
      }

      <br />
      <ul>
        {blogsToShow
          .map(blog =>
            <li key={blog.id}>
              <Blog
                blog={blog}
                deleteBlog={handleDeleteBlog}
              />
            </li>
          )}
      </ul>

    </div>


  )
}

export default App