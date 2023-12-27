const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="tooMany">
        {message}
      </div>
    )
  }
  export default Notification