import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '../hooks/useTheme'

// styles and images
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Cog from '../assets/settings-svgrepo-com.svg'
import Chat from '../assets/chat-svgrepo-com.svg'

export default function Sidebar() {
    const { user } = useAuthContext()
    const { mode } = useTheme()
    return (
        <div className={`sidebar ${mode ? null:'dark'}`}>
            <div className="sidebar-content">
                <div className="user">
                    <NavLink to="/settings">
                        <img className="cog" src={Cog} alt="settings icon"/>
                    </NavLink>
                    <p>Hey {user.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink to="/">
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="add project icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/chat">
                                <img src={Chat} alt="Chat icon" className="chatIcon"/>
                                <span>Chat</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}