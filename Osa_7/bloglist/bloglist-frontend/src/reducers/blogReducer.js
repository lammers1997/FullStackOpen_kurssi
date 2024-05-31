import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

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
  },
})

export const { voteBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const setVoteBlog = (blog) => {
  return async (dispatch) => {
    const blogToLike = { ...blog, likes: blog.likes + 1 }
    const newBlog = await blogService.addLike(blog.id, blogToLike)
    dispatch(voteBlog(blog))
  }
}

export default blogSlice.reducer
