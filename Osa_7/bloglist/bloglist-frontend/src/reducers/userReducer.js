import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = {
  loggedIn: false,
  user: null,
}

const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

const userSlice = createSlice({
  name: 'user',
  initialState: storedUser
    ? { loggedIn: true, user: storedUser }
    : initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true
      state.user = action.payload
    },
    logout(state) {
      state.loggedIn = false
      state.user = null
    },
  },
})

export const { login, logout } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const userCreds = await loginService.login({
        username,
        password,
      })
      blogService.setToken(userCreds.token)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(userCreds)
      )
      dispatch(login(userCreds))
      dispatch(setNotification(`Welcome ${userCreds.name}`, 'notification', 5))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)

    dispatch(logout())
  }
}
export default userSlice.reducer
