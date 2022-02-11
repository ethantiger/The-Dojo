import { useCollection } from '../hooks/useCollection'
import { useTheme } from '../hooks/useTheme'
// import { useState } from 'react'
// import { useAuthContext } from '../hooks/useAuthContext'

// styles
import './OnlineUsers.css'
// import Chat from '../assets/chat-svgrepo-com.svg'

export default function OnlineUsers() {
    // const {user} = useAuthContext()
    // const [showChat, setShowChat] = useState(false)
    // const [chatUser, setChatUser] = useState(null)
    const { error, documents } = useCollection('users')
    const { mode } = useTheme()

    // const handleClick = (e) => {
    //     if (e.target.classList[0] === 'trigger') {
    //         e.target.classList.toggle('active')
    //         e.target.previousSibling.classList.toggle('active')
    //     } else {
    //         e.target.parentElement.classList.toggle('active')
    //         e.target.parentElement.previousSibling.classList.toggle('active')
    //     }
    // }
    return (
        <div className={`user-list ${mode ? null:'dark'}`}>
            <h2>All Users</h2>
            {error && <div className="error">{error}</div>}
            {documents && documents.map((user) => (
                <div key={user.id} className="user-list-item">
                    {/* <div className="content" onClick={() => {
                        setShowChat(true)
                        setChatUser(user)
                    }}>
                        <img src={Chat} alt="Chat Icon"/>
                    </div> */}
                    <div className="trigger" /*onClick={handleClick}*/>
                        {user.online && <span className="online-user"></span>}
                        <span>{user.displayName}</span>
                    </div>

                </div>
            ))}
            {/* {(showChat && chatUser.id !== user.uid) && 
                <div>
                    <div>Quick chat {chatUser.displayName}</div>

                    <button className={`${mode ? null:'dark'} btn`} onClick={() => setShowChat(false)}>Close</button>
                </div>
            } */}
        </div>
    )
}