import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, errorMessage, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleSubmit}>
        <div>
        username
          <input id="username" type="text" value={username} name="Username" onChange={handleUsernameChange} />
        </div>
        <div>
        password
          <input id="password" type="password" value={password} name="Password" onChange={handlePasswordChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm