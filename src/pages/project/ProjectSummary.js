import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Edit from '../create/Edit'

// images
import EditIcon from '../../assets/edit-svgrepo-com.svg'

export default function ProjectSummary({mode, project}) {
    const [edit, setEdit] = useState(false)
    const { deleteDocument } = useFirestore('projects')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    let isCreator = false
    if (user.uid === project.createdBy.id) {
        isCreator = true
    }

    const handleClick = (e) => {
        deleteDocument(project.id)
        navigate('/')
    }

    return (
        
        <div>
            {edit ? <Edit proj={project} /> :
                <div className={`project-summary ${mode ? null:'dark'}`}>
                    <h2 className="page-title">{project.name}</h2>
                    {isCreator ? <img className={'edit-icon'} src={EditIcon} alt="Edit Icon" onClick={() => setEdit(true)}/>: null}
                    <p>By {project.createdBy.displayName}</p>
                    <p className="due-date">
                        Project due by {project.dueDate.toDate().toDateString()}
                    </p>
                    <p className="details">
                        {project.details}
                    </p>
                    <h4>Project is assigned to:</h4>
                    <div className="assigned-users">
                        {project.assignedUsersList.map((user) => (
                            <div key={user.id}>
                                {user.displayName}
                            </div>
                        ))}
                    </div>
                </div>
            }
            {edit ? null:
                <>
                {user.uid === project.createdBy.id && (
                    <button className={`btn ${mode ? null:'dark'}`} onClick={handleClick}>Mark as Complete</button>
                )}
                </>
            }
        </div>
    )
}