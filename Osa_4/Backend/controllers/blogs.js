const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {userExtractor} = require('../utils/middleware')

//get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//add new blog with authorization
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
 
  const user = request.user
  //Make sure title and url exists
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Both, title and url are required' })
  }
  //Create new blog
  const blog = new Blog({
    author: body.author,
    url: body.url,
    title: body.title,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  //add blog to User data
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


//Delete blog with authorization
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const userid = request.user._id

  const blog = await Blog.findById(request.params.id)

  //authored user must be the same as user that added the blog
  if (blog.user.toString() === userid.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
  }else{
    response.status(403).json({error: 'you can only delete your own blogs'})
  }
  response.status(204).end()
})

//Modify likes of a blog. Authorization not included
blogsRouter.put('/:id', async (request, response) => {
  const { title, url, author, likes  } = request.body

  const modifiedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, url, author, likes  }, { new: true })
  response.json(modifiedBlog)
})

module.exports = blogsRouter