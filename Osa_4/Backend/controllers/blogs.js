const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.post('/',  async (request, response) => {
  //middleware.validateInput make my test long. So thats why not used here, even tho makes code prettier :)
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'Both, title and url are required' });
  }
  const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const {likes} = request.body
  
  const modifiedBlog = await Blog.findByIdAndUpdate(request.params.id, {likes}, { new: true })
  response.json(modifiedBlog)
})

module.exports = blogsRouter