import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
const CreateNewBlog = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }
  return (
    <div className="formDiv">
      <h2>create new blog</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            value={newTitle}
            name="Title"
            onChange={(event) => setNewTitle(event.target.value)}
            id="blog-input-title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            value={newAuthor}
            name="Author"
            onChange={(event) => setNewAuthor(event.target.value)}
            id="blog-input-author"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            value={newUrl}
            name="Url"
            onChange={(event) => setNewUrl(event.target.value)}
            id="blog-input-url"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default CreateNewBlog
