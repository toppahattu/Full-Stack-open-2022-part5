import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const loadAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }

  useEffect(() => {
    loadAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create({ ...blogObj, user })
    loadAllBlogs()
    setErrorMessage({ message: `a new blog ${blogObj.title} by ${blogObj.author} added`, color: 'Green' })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({ message: 'wrong credentials', color: 'Red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLike = async (blog) => {
    await blogService.update(blog)
    loadAllBlogs()
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog)
      loadAllBlogs()
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          errorMessage={errorMessage}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
        :
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage} />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
          )}
        </div>
      }
    </div>
  )
}

export default App
