import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let blog
  beforeEach(() => {
    //our test blog
    blog = {
      likes: 123,
      author: 'Matti Rönkä',
      title: 'Tuottavuutta uutisista',
      url: 'www.yle.fi/tuottavuutta-uutisista',
      user: {
        name: 'Test User',
        username: 'testuser'
      },
      id: 'asoi09i8d09as8d09i131212as'
    }
  })

  test('renders content', () => {
    //Render our blog

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')

    //Expect title and author to be rendered
    expect(div).toHaveTextContent(
      'Tuottavuutta uutisista'
    )
    expect(div).toHaveTextContent(
      'Matti Rönkä'
    )

    //expect url and likes NOT to be rendered
    expect(div).not.toHaveTextContent(
      'www.yle.fi/tuottavuutta-uutisista'
    )
    expect(div).not.toHaveTextContent(
      123
    )
  })
  test('clicking the view button renders more elements', async () => {
    //Render our blog
    const { container } = render(<Blog blog={blog} />)

    //virtually click "view" button
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.toggleMoreInfo')
    expect(div).not.toHaveStyle('display: none')

    //expect url, likes and user to be rendered, when view is clicked
    expect(div).toHaveTextContent(
      'www.yle.fi/tuottavuutta-uutisista'
    )
    expect(div).toHaveTextContent(
      '123'
    )
    expect(div).toHaveTextContent(
      'Test User'
    )

  })
  test('clicking "like" button twice calls event handler twice', async () => {
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} addLike={mockHandler} />)

    const user = userEvent.setup()

    //Open more info to access like button
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    //Click like button twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)


  })
})

describe('<BlogForm />', () => {
  test('updates parent state and calls onSubmit', async () => {
    //create new session with userEvent
    const user = userEvent.setup()
    //mock-function upon creation
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)
    //find textbox
    //const input = screen.getByRole('textbox')
    // const title = container.querySelector('.titleTextbox')
    // const author = container.querySelector('.authorTextbox')
    // const url = container.querySelector('.urlTextbox')
    const inputs = screen.getAllByRole('textbox')


    //find create button
    const sendButton = screen.getByText('create')

    //insert title, author and url
    // await user.type(title, 'Test Title')
    // await user.type(author, 'Test Author')
    // await user.type(url, 'Test Url')
    await user.type(inputs[0], 'Test data')
    await user.type(inputs[1], 'Test data')
    await user.type(inputs[2], 'Test data')



    await user.click(sendButton)

    //Make sure createBlog is called
    expect(createBlog.mock.calls).toHaveLength(1)
    //Expect correct data to exist
    expect(createBlog.mock.calls[0][0].title).toBe('Test data')
    expect(createBlog.mock.calls[0][0].author).toBe('Test data')
    expect(createBlog.mock.calls[0][0].url).toBe('Test data')

  })
})