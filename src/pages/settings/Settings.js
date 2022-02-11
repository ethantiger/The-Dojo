import { useTheme } from '../../hooks/useTheme'
import { db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import Themes from './Themes'
import NameChange from './NameChange'

import './Settings.css'

export default function Settings () {
    const { changeMode, changeColor, mode, color } = useTheme()
    const { user } = useAuthContext()

    const handleClick = async() => {
        const docRef = doc(db, 'users', user.uid)
        await updateDoc(docRef, {
            settings: {
                mode,
                color
            }
        })
    }

    return (
        <div className="settings-page">
            <h2 className={`page-title ${mode ? null:'dark'}`}>Settings</h2>
            <Themes 
                changeMode={changeMode} 
                changeColor={changeColor} 
                mode={mode} 
                color={color} 
                handleClick={handleClick}
            />
            <NameChange mode={mode} />
        </div>
    )
}