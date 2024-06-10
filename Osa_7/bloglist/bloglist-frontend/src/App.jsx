import { useState, useEffect } from 'react'

import User from './components/User'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import NavMenu from './components/NavMenu'
import Login from './pages/Login'

import Blogs from './pages/Blogs'
import Users from './pages/Users'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  createBlog,
  setVoteBlog,
  setDeleteBlog,
  deleteBlog,
} from './reducers/blogReducer'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from 'react-router-dom'

import { loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/userDataReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })
  const user = useSelector((state) => {
    return state.user.user
  })

  const users = useSelector((state) => {
    return state.users
  })

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  const matchUser = useMatch('/users/:id')
  const userToInspect = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blogToInspect = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  // const handleLogin = async (event) => {
  //   event.preventDefault()
  //   dispatch(loginUser(username, password))
  //   setUsername('')
  //   setPassword('')
  // }

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

  // const loginForm = () => {
  //   const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  //   const showWhenVisible = { display: loginVisible ? '' : 'none' }
  //   return (
  //     <div>
  //       <div style={hideWhenVisible}>
  //         <button onClick={() => setLoginVisible(true)}> log in</button>
  //       </div>
  //       <div style={showWhenVisible}>
  //         <h2>Log in to application</h2>
  //         <LoginForm
  //           username={username}
  //           password={password}
  //           setUsername={setUsername}
  //           setPassword={setPassword}
  //           handleLogin={handleLogin}
  //         />
  //         <button onClick={() => setLoginVisible(false)}> cancel </button>
  //       </div>
  //     </div>
  //   )
  // }

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <NavMenu user={user} handleLogout={handleLogout} />
      <h2>blogs</h2>
      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            <Blogs
              user={user}
              blogs={blogs}
              handleDeleteBlog={handleDeleteBlog}
              addLike={addLike}
              blogForm={blogForm}
            />
          }
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={userToInspect} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blogToInspect}
              deleteBlog={deleteBlog}
              addLike={addLike}
              user={user}
            />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
