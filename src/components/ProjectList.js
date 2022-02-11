import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

import './ProjectList.css'

export default function ProjectList ({mode, projects}) {
    const { user } = useAuthContext()
    const assignedProjects = projects.filter((project) => {
        let isIn = false
        const creator = project.createdBy.id

        project.assignedUsersList.forEach((u) => {
            if (u.id === user.uid) {
                isIn = true
            } else if (creator === user.uid) {
                isIn = true
            }
        })
        return isIn
    })

    return (
        <div className={`project-list ${mode ? null:'dark'}`}>
            {assignedProjects.length === 0 && <p>No projects yet!</p>}
            {assignedProjects.map(project => (
                <Link to={`/projects/${project.id}`} key={project.id}>
                    <h4>{project.name}</h4>
                    <p>Due by {project.dueDate.toDate().toDateString()}</p>
                    <div className="assigned-to">
                        {project.assignedUsersList.map(user => (
                            <li key={user.id}>
                                {user.displayName}
                            </li>       
                        ))}
                    </div>
                </Link>
            ))}
        </div>
    )
}