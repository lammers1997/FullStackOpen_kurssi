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
  const [notification, setNotification] = useState({ message: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
      console.log("ReRENDERING")
    }
    )
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

  const addBlog = (blogObject) => {
    console.log("blogs at beginning", blogs)
    blogService
      .create(blogObject)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))

        handleNotification(`a new blog "${createdBlog.title}" by ${createdBlog.author} created!`)
      })
      .catch(error => {
        console.log(error)
        handleNotification(error.response.data.error, 'error')
      })
    console.log("blogs at end:", blogs)
    // blogService.getAll().then(blogs => {
    //   setBlogs(blogs)
    // }
    // )
  }

  const handleDeleteBlog = (blogId) => {
    console.log(blogId)
    blogService
      .deleteBlog(blogId)
      .then(() => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      })
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />

      {!user && loginForm()}
      {user && <div>
        {user.name} logged in<button onClick={handleLogout}>logout</button>



        <h2>create new blog</h2>
        {blogForm()}
        <br />
        {blogs
          .filter(blog => blog.user.username === user.username)
          .map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog={handleDeleteBlog} />
          )}
      </div>
      }
    </div>
  )
}

export default App