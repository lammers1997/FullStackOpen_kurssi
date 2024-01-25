import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [notification, setNotification] = useState({ message: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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

  const handleCreateBlog = (event) => {
    event.preventDefault()
    blogService
      .create(newBlog)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        setNewBlog({
          title: '',
          author: '',
          url: '',
        })
        handleNotification(`a new blog "${createdBlog.title}" by ${createdBlog.author} created!`)
      })
      .catch(error => {
        console.log(error)
        handleNotification(error.response.data.error, 'error')
      })

    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    }
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} logged in<button onClick={handleLogout}>logout</button>

      </div>
      <h2>create new</h2>
      <BlogForm
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        handleCreateBlog={handleCreateBlog}
      />
      <br />
      {blogs
        .filter(blog => blog.user.username === user.username)
        .map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App