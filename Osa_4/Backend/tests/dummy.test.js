const listHelper = require('../utils/list_helper')
const { emptyList, listWithOneBlog, multipleBlogs } = require('./blogData');


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(multipleBlogs)
    expect(result).toBe(36)
  })

})

describe('most liked blog', () => {

  test('when empty blog list given', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual(undefined)
  })

  test('should be blog itself, when one blog post given', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when multiple blogs given', () => {
    const result = listHelper.favoriteBlog(multipleBlogs)
    expect(result).toEqual(multipleBlogs[2])
  })

})

describe('author with most blogs', () => {

  test('when no blogs given', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toEqual(undefined)
  })

  test('when one blog given', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when multiple blog given', () => {
    const result = listHelper.mostBlogs(multipleBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })

  })

})

describe('author with most likes', () => {

  test('when no blogs given', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toEqual(undefined)
  })

  test('when one blog given', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when multiple blog given', () => {
    const result = listHelper.mostLikes(multipleBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })

  })

})