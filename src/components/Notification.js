const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`error${message.color}`}>
      {message.message}
    </div>
  )
}

export default Notification