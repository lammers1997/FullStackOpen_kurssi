const CreateNewBlog = ({
    newBlog,
    setNewBlog,
    handleCreateBlog
}) => {
    return (
        <form onSubmit={handleCreateBlog}>
            <div>
                title:
                <input
                    type='text'
                    value={newBlog.title}
                    name='Title'
                    onChange={({ target }) => setNewBlog(prevState => ({ ...prevState, title: target.value }))}
                />
            </div>
            <div>
                author:
                <input
                    type='text'
                    value={newBlog.author}
                    name='Author'
                    onChange={({ target }) => setNewBlog(prevState => ({ ...prevState, author: target.value }))}
                />
            </div>
            <div>
                url:
                <input
                    type='text'
                    value={newBlog.url}
                    name='Url'
                    onChange={({ target }) => setNewBlog(prevState => ({ ...prevState, url: target.value }))}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default CreateNewBlog