import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.content === null) {
    return null
  }
  //currently only two types of notifications, so this good
  const notificationClass =
    notification.type === 'error' ? 'error' : 'notification'

  return <div className={notificationClass}>{notification.content}</div>
}
export default Notification
