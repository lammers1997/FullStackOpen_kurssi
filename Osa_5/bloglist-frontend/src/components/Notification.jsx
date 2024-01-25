const Notification = ({ notification }) => {
    if (notification.message === null) {
        return null
    }
    //currently only two types of notifications, so this good
    const notificationClass = notification.type === 'error' ? 'error' : 'notification'

    return (
        <div className={notificationClass}>
            {notification.message}
        </div>
    )

}

export default Notification