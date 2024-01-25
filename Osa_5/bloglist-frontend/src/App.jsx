import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
      //Filter logged in user's blogs. Might not work, when user is saved in browser. :/
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    // try {
    //   const blogObject = newBlog
    //   blogService.create(blogObject)
    //     .then(returnedBlog => {
    //       setBlogs(blogs.concat(returnedBlog))
    //       setNewBlog({
    //         title: '',
    //         author: '',
    //         url: '',
    //       })
    //     })
    // } catch (error) {
    //   console.log(error)
    // }
    const createdBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(createdBlog))
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })

    //Manual re fetch to immediately show new blog in web page:
    const updatedBlogs = await blogService.getAll();
    setBlogs(updatedBlogs);

  }

  if (user === null) {
    return (
      <div>
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