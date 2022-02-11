import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useFirestore } from '../../hooks/useFirestore'


import './Chat.css'
import { formatDistanceToNow } from 'date-fns'

export default function ChatBoard ({mode, currentUser, user}) {
    const [messagesSent, setMessagesSent] = useState([])
    const [messagesReceived, setMessagesReceived] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const { addDocument } = useFirestore('messages')

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (newMessage) {
            const message = {
                content: newMessage,
                from: user.uid,
                fromName: user.displayName,
                to: currentUser
            }
            await addDocument(message)
        }
        setNewMessage('')
 
    }

    useEffect(() => {
        let ref = collection(db, 'messages')
        ref = query(ref, where('from', '==', user.uid), where('to', '==', currentUser))
        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            setMessagesSent(results)
    
        })
        return () => unsub()
    },[setMessagesSent, user, currentUser]) 


    useEffect(() => {
        let ref = collection(db, 'messages')
        ref = query(ref, where('to', '==', user.uid), where('from', '==', currentUser))
        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            setMessagesReceived(results)
    
        })
        return () => unsub()
    },[setMessagesReceived, user, currentUser])

    const allMessages = [...messagesSent,...messagesReceived]
    let sortedMessages = allMessages.sort((a, b) => {
        return b.createdAt.seconds - a.createdAt.seconds
    })
    return (
        <div className={`message-board ${mode ? '':'dark'}`}>
            <ul>
                {sortedMessages.length > 0 && sortedMessages.map((message) => (
                    <li key={message.id}>
                        <div className="message-author">
                            <p>{message.fromName}</p>
                        </div>
                        <div className="message-date">
                            <p>{formatDistanceToNow(message.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                        <div className="message-content">
                            <p>{message.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            {currentUser && <form onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={(e) => setNewMessage(e.target.value)}
                className="input-message"
                value={newMessage}
            />
            </form>}
        </div>
    )
}