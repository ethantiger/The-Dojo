import ChatUsers from './ChatUsers'
import ChatBoard from './ChatBoard'
import { useTheme } from '../../hooks/useTheme'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'


import './Chat.css'

export default function Chat () {
    const [currentUser, setCurrentUser] = useState('')
    const { mode } = useTheme()
    const { user } = useAuthContext()
    const changeUser = (id) => {
        setCurrentUser(id)
    }



    return (
        <div>
            <div >
                <h2 className="page-title">Chat</h2>
                <ChatUsers mode={mode} user={user} changeUser={changeUser} currentUser={currentUser}/>
                <ChatBoard mode={mode} currentUser={currentUser} user={user}/>
            </div>
        </div>
    )
}