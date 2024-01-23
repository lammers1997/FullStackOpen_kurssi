const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

const Blog = require('../models/blog')

describe('Some initial blogs', () => {


  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'root', passwordHash})
    await user.save()


  })

  describe('4.8, All blogs are returned in correct format ', () => {
    test('blogs are returned as json', async () => {

      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })


    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      const usersAtStart = await helper.usersInDb()
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

  })

  describe('4.9', () => {
    test('returned blogs identifier should be id, not _id', async () => {
      const response = await api.get('/api/blogs')

      response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
      })
    })
  })

  describe('4.10', () => {

    beforeEach(async () => {
      //login
      const loginCredentials = {
        username: "root",
        password: "salainen"
      }
      const res = await api
        .post('/api/login')
        .send(loginCredentials)

      userToken = res.body.token

      const newBlog = {
        title: 'On Types',
        author: 'Robert C. Martin',
        url: 'https://blog.cleancoder.com/uncle-bob/2021/06/25/OnTypes.html',
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${userToken}`)
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

      const loginCredentials = {
        username: "root",
        password: "salainen"
      }
      const res = await api
        .post('/api/login')
        .send(loginCredentials)

      userToken = res.body.token

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${userToken}`)
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
      const loginCredentials = {
        username: "root",
        password: "salainen"
      }
      const res = await api
        .post('/api/login')
        .send(loginCredentials)

      userToken = res.body.token

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newBlog)
        .expect(400)


      const anotherBlog = {
        author: 'Robert Downey Jr.',
        url: 'https://blog.cleancoder.com/uncle-bob/2021/06/25/OnTypes.html',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${userToken}`)
        .send(anotherBlog)
        .expect(400)
    })

  })

  describe('4.13', () => {
    test('deletion of blog succeeds with status code 204 if id`s are valid', async () => {

      //Login to create new blog and then delete it
      const loginCredentials = {
        username: "root",
        password: "salainen"
      }
      const res = await api
        .post('/api/login')
        .send(loginCredentials)


      userToken = res.body.token
      //create new blog to delete
      const newBlog = {
        title: 'On Types',
        author: 'Robert C. Martin',
        url: 'https://blog.cleancoder.com/uncle-bob/2021/06/25/OnTypes.html',
        likes: 5,
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      await api
        .delete(`/api/blogs/${response.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

      const foundBlog = blogsAtEnd.find(blog => blog.id === response.body.id)
      expect(foundBlog).toBeUndefined()
    })
  })

  describe('4.14', () => {
    test('blogs likes can be modified', async () => {


      const blogs = await helper.blogsInDb()
      const blogToModify = blogs[0]
      blogToModify.likes = 123

      await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(blogToModify)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      const foundBlog = blogsAtEnd.find(blog => blog.id === blogToModify.id)
      expect(foundBlog.likes).toBe(123)
    })
  })

})


//4.15 --->
describe('4.15. --> User creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('4.15 creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'lammers',
      name: 'Timo Lamminen',
      password: 'top_Secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('4.16 creation fails with proper statuscode and message when username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('4.16 creation fails with proper statuscode and message when password is too short', async () => {
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'ba'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters long')
  })
  test('4.16 creation fails with proper statuscode and message when username is too short', async () => {
    const newUser = {
      username: 'ro',
      name: 'Medium User',
      password: 'babylonia'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(`User validation failed`)
  })
  test('4.16 creation fails with proper statuscode and message when username or password missing', async () => {
    const newUser = {
      username: 'rosa',
      name: 'Medium User',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(`password missing`)

    const newUser2 = {
      name: 'Medium User',
      password: 'auiaasd'
    }
    const result2 = await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result2.body.error).toContain('User validation failed: username: Path `username` is required.')
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})
