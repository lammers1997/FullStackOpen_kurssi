import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: null, type: 'notification' },
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return { content: null, type: 'notification' }
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (content, type, time) => {
  return async (dispatch) => {
    dispatch(showNotification({ content, type }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
