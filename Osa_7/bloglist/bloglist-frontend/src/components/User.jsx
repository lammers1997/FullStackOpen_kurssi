import { useState } from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs &&
          user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User
