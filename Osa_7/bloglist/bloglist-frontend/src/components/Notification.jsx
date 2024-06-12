import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.content === null) {
    return null
  }
  //currently only two types of notifications, so this good
  const notificationClass = notification.type === 'error' ? 'danger' : 'success'

  return <Alert variant={notificationClass}>{notification.content}</Alert>
}
export default Notification
