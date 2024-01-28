import { useState } from 'react'

const CreateNewBlog = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }
  return (
    <div className='formDiv'>
      <h2>create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={newTitle}
            name='Title'
            onChange={event => setNewTitle(event.target.value)}
            id='blog-input-title'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newAuthor}
            name='Author'
            onChange={event => setNewAuthor(event.target.value)}
            id='blog-input-author'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newUrl}
            name='Url'
            onChange={event => setNewUrl(event.target.value)}
            id='blog-input-url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateNewBlog