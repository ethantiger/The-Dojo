import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '../hooks/useTheme'

import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()
    const { mode } = useTheme()
    return (
        <div className={`navbar ${mode ? null:'dark'}`}>
            <ul>
                <li className="logo">
                    <img src={Temple} alt="dojo logo" />
                    <span>The dojo</span>
                </li>

                {!user && <li><Link to="/login">Login</Link></li>}
                {!user && <li><Link to="/signup">Signup</Link></li>}
                {user && 
                    <li>
                        {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                        {isPending && <button className="btn" disabled>Logging out...</button>}
                    </li>
                }
            </ul>
        </div>
    )
}
