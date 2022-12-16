import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonStyle = {
    backgroundColor: '#318ce7'
  }

  return (
    <div style={blogStyle}>
      {showDetails ?
        <div className='showTitle'>
          {blog.title} {blog.author} <button onClick={handleVisibility}>hide</button>
          <div className='showUrl'>
            {blog.url}
          </div>
          <div className='showLikes'>
            likes {blog.likes}<button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div className='showName'>
            {blog.user.name}
          </div>
          <button onClick={() => handleRemove(blog)} style={buttonStyle}>remove</button>
        </div>
        :
        <div>
          {blog.title} {blog.author} <button onClick={handleVisibility}>view</button>
        </div>
      }
    </div>
  )
}

export default Blog