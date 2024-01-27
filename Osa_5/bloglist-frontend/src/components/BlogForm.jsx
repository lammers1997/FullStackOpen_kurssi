import { useState } from 'react'

const CreateNewBlog = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    })
    const addBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog({
            title: '',
            author: '',
            url: ''
        })
    }
    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    type='text'
                    value={newBlog.title}
                    name='Title'
                    onChange={event => setNewBlog({ ...newBlog, title: event.target.value })}
                />
            </div>
            <div>
                author:
                <input
                    type='text'
                    value={newBlog.author}
                    name='Author'
                    onChange={event => setNewBlog({ ...newBlog, author: event.target.value })}
                />
            </div>
            <div>
                url:
                <input
                    type='text'
                    value={newBlog.url}
                    name='Url'
                    onChange={event => setNewBlog({ ...newBlog, url: event.target.value })}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default CreateNewBlog