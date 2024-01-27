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
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
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
    const changedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    try {
      const response = await blogService.addLike(blog.id, changedBlog)
      setBlogs(blogs
        .map(b =>
          b.id !== blog.id ? b : { ...b, likes: response.likes }))

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

  //First I thought that only the logged in users blogs should be showed
  //Then I realised that is not necessary. But gonna leave this here, if ever needed:)
  const blogsToShow = (!user)
    ? blogs
    : blogs.filter(blog => blog.user.username === user.username)

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />

      {!user && loginForm()}
      {user &&
        <div>
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          {blogForm()}


          <br />
          <ul>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <li key={blog.id}>
                  <Blog
                    blog={blog}
                    deleteBlog={handleDeleteBlog}
                    user={user}
                    addLike={addLike}
                  />
                </li>
              )}
          </ul>
        </div>
      }
    </div>


  )
}

export default App




