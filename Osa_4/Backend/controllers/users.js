const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//Get all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

//Add new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password === undefined) { //make sure password exists
    return response.status(400).json({ error: 'password missing' })
  }
  if (password.length < 3) { //make sure password is long enough
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter