import { useCollection } from '../../hooks/useCollection'

import './Chat.css'

export default function ChatUsers({mode, user, changeUser, currentUser}) {
    const { error, documents } = useCollection('users',['id', '!=', user.uid])

    const handleClick = (id) => {
        changeUser(id)
    }

    return (
        <div className={`users-filter ${mode ? '':'dark'}`}>
            <nav>
                <p>Chat with: </p>
                {error && <p className="error">{error}</p>}
                {documents && documents.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => handleClick(user.id)}
                        className={currentUser === user.id ? 'active': ''}
                    >
                    {user.displayName}
                    </button>
                ))}
            </nav>
        </div>
    )
}