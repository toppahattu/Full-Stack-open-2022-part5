import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    const blogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(blogObj)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input className='inputTitle' type="text" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div>
          author:
          <input className='inputAuthor' type="text" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div>
          url:
          <input className='inputUrl' type="text" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm