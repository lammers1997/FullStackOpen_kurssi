import { createContext, useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "VOTE":
            return `Anecdote '${action.payload}' voted`
        case "ADD":
            return `Added anecdote '${action.payload}'`
        case "ERROR":
            return action.payload
        case "HIDE":
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                notificationDispatch({ type: 'HIDE' })
            }, 5000)

            // Clean up the timer when the notification changes or component unmounts
            return () => clearTimeout(timer)
        }
    }, [notification, notificationDispatch])

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext