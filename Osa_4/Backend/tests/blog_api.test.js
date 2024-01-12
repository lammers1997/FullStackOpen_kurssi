const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const Blog = require('../models/blog')


const api = supertest(app)

describe('Some initial blogs', () => {


  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('4.8', () => {
    test('blogs are returned as json', async () => {
      console.log('entered test')
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })


    //Tehtävä: 4.8
    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

  })

  describe('4.9', () => {
    //ToDo: Tehtävästä 4.9 eteenpäin
    test('returned blogs identifier should be id, not _id', async () => {
      const response = await api.get('/api/blogs')

      response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
      })
    })
  })

  describe('4.10', () => {

    beforeEach(async () => {
      const newBlog = {
        title: 'On Types',
        author: 'Robert C. Martin',
        url: 'https://blog.cleancoder.com/uncle-bob/2021/06/25/OnTypes.html',
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })

    test('database size is increased by one', async () => {
      //database length is increased by one
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('added blog is found from database, with correct info', async () => {
      const blogs = await helper.blogsInDb()

      const foundBlog = blogs.find(blog => blog.title === 'On Types')
      expect(foundBlog).toBeDefined()
      expect(foundBlog.author).toBe('Robert C. Martin')
      expect(foundBlog.url).toBe('https://blog.cleancoder.com/uncle-bob/2021/06/25/OnTypes.html')
      expect(foundBlog.likes).toBe(5)
      expect(foundBlog.id).toBeDefined()


    })
  })

  describe('4.11', () => {
    test('if likes does not have value, 0 is set by default', async () => {
      const newBlog = {
        title: 'On Types',
        author: 'Robert Downey Jr.',
        url: 'https://blog.cleancoder.com/uncle-bob/2021/06/25/OnTypes.html',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()

      const foundBlog = blogs.find(blog => blog.title === 'On Types')
      expect(foundBlog.likes).toBe(0)
    })

  })


  describe('4.12', () => {
    test('HTTP POST returns 400 Bad Request, when title or url not given', async () => {
      const newBlog = {
        title: 'On Types',
        author: 'Robert Downey Jr.',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)


      const anotherBlog = {
        author: 'Robert Downey Jr.',
        url: 'https://blog.cleancoder.com/uncle-bob/2021/06/25/OnTypes.html',
      }

      await api
        .post('/api/blogs')
        .send(anotherBlog)
        .expect(400)
    })

  })

  describe('4.13', () => {
    test('deletion of blog succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      console.log(blogToDelete)

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const foundBlog = blogsAtEnd.find(blog => blog.id === blogToDelete.id)
      expect(foundBlog).toBeUndefined()
    })
  })

  describe('4.14', () => {
    test('blogs likes can be modified', async () => {


      const blogs = await helper.blogsInDb()
      const blogToModify = blogs[0]
      console.log("Blog, before modifications:", blogToModify)
      blogToModify.likes = 123

      await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(blogToModify)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      const foundBlog = blogsAtEnd.find(blog => blog.id === blogToModify.id)
      expect(foundBlog.likes).toBe(123)
      console.log(foundBlog)
    })
  })

})
afterAll(async () => {
  await mongoose.connection.close()
})
