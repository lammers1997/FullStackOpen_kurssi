import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    likes: 123,
    author: 'Matti Rönkä',
    title: 'Tuottavuutta uutisista',
    url: 'www.yle.fi/tuottavuutta-uutisista',
    user: '10923809usdif9sa0dfasdf9a',
    id: 'asoi09i8d09as8d09i131212as'
  }

  // render(<Blog blog={blog}/>)
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
test('clicking the "view" button calls event handler once', async () => {
  const blog = {
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

  //show us what we got
  screen.debug()

})