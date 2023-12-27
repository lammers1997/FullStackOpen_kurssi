const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="alert">
      {message}
    </div>
  )
}
export default Notification