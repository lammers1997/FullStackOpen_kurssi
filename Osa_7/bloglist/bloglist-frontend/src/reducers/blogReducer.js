import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    voteBlog(state, action) {
      const id = action.payload.id
      const blogToChange = state.find((a) => a.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }

      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    commentBlog(state, action) {
      const { id, blog } = action.payload
      const changedBlog = {
        ...blog,
      }

      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
  },
})

export const { voteBlog, appendBlog, setBlogs, deleteBlog, commentBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          `a new blog "${newBlog.title}" by ${newBlog.author} created!`,
          'notification',
          5
        )
      )
    } catch (error) {
      dispatch(setNotification('Error adding blog', 'error', 5))
    }
  }
}

export const setVoteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const blogToLike = { ...blog, likes: blog.likes + 1 }
      const newBlog = await blogService.addLike(blog.id, blogToLike)

      dispatch(voteBlog(blog))
      dispatch(setNotification(`you liked ${blog.title}`, 'notification', 5))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

export const setDeleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.deleteBlog(blog.id)
      dispatch(deleteBlog(blog.id))
      dispatch(
        setNotification(
          ` Blog "${blog.title}" by ${blog.author} deleted`,
          'notification',
          5
        )
      )
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

export const setCommentBlog = (blog, newComment) => {
  return async (dispatch) => {
    try {
      const response = await blogService.commentBlog(blog.id, newComment)
      dispatch(commentBlog({ id: blog.id, blog: response }))
      dispatch(
        setNotification(`You commented on ${blog.title}`, 'notification', 5)
      )
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

export default blogSlice.reducer
