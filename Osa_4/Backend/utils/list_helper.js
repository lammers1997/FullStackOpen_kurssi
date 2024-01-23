const _ = require('lodash')


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (total, item) => {
    return total + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (maxLikes, current) => {
    return current.likes > maxLikes.likes ? current : maxLikes
  }
  return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  //Group blogs based on author
  const blogsByAuthor = _.groupBy(blogs, 'author')

  //Find author that has most blogs
  const authorWithMostBlogs = _.chain(blogsByAuthor)
    .map((blogs, author) => ({ author, blogs: blogs.length }))
    .maxBy('blogs')
    .value()

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {

  const authorLikes = _.groupBy(blogs, 'author')

  const authorWithMostLikes = _.chain(authorLikes)
    .map((blogs, author) => ({ author, likes: _.sumBy(blogs, 'likes') }))
    .maxBy('likes')
    .value()

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}