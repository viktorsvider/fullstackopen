import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return <div>
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={ handleUsernameChange}
        ></input>
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  </div>
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm