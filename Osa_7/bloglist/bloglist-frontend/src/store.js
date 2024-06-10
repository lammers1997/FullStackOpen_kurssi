import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

import notificationReducer from './reducers/notificationReducer'
import userDataReducer from './reducers/userDataReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: userDataReducer,
  },
})

export default store
