import { useState } from 'react'

const Blog = ({ blog, deleteBlog, addLike, user }) => {
  if (!user || !blog) {
    return null
  }

  //if user exists && if blog.user exists
  const showRemoveButton =
    user && blog.user && user.username === blog.user.username

  return (
    <div>
      <h2>{blog.title} </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={() => addLike(blog)}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <button
        id="removeButton"
        onClick={() => deleteBlog(blog)}
        style={{ display: showRemoveButton ? 'inline-block' : 'none' }}
      >
        remove
      </button>
    </div>
  )
}

export default Blog
