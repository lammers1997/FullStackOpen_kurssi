const Blog = require('../models/blog')

const User = require('../models/user')

const initialBlogs = [
  {
    title: "Toka plogi",
    author: "Matti",
    url: "tokapolgi.com/polg",
    likes: 0,
    id: "65a813d298b909a3a3a48b8b"
  },
  {
    title: "Toka plogi",
    author: "Matti",
    url: "tokapolgi.com/polg",
    likes: 0,
    id: "65a81475dcf9e3730ba28b5e"
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}