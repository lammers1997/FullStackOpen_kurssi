import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {

        showNotification(state, action) {
            return action.payload
        },
        hideNotification() {
            return null
        },
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(showNotification(content))
        setTimeout(() => {
            dispatch(hideNotification());
        }, time*1000);    }
  }

export default notificationSlice.reducer