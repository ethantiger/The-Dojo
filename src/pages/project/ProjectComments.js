import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComments({mode, project}) {
    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()
    const { updateDocument } = useFirestore('projects')

    const handleSubmit = async (e) => {
        e.preventDefault() 

        const commentToAdd = {
            displayName: user.displayName,
            content: newComment,
            createdAt: new Date(),
            id: Math.random()
        }
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        setNewComment('')
    }

    return (
        <div className={`project-comments ${mode ? null:'dark'}`}>
            <h4>Project Comments</h4>

            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                        <div className="comment=content">
                            <p>{comment.content}</p> 
                        </div>
                    </li>
                ))}
            </ul>

            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment:</span>
                    <textarea
                        required
                        onChange={e => setNewComment(e.target.value)}
                        value={newComment}
                        
                    ></textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}