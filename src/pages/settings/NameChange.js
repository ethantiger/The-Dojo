import './Settings.css'


import { db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useState } from 'react'

export default function NameChange({mode}) {
    const { user } = useAuthContext()
    const [newName, setNewName] = useState('')
    const handleSubmit = async(e) => {
        e.preventDefault()
        const docRef = doc(db, 'users', user.uid)
        await updateDoc(docRef, {
            displayName:newName
        })
        updateProfile(user, { displayName:newName })
        setNewName('')
    }


    return (
        <div className={`theme-buttons ${mode ? null:'dark'}`}>
            <p className="settings-title">Change Display Name:</p>
            <div className="name-form">
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>New Name: </span>
                        <input
                            type="text"
                            onChange={(e) => setNewName(e.target.value)}
                            value={newName}
                        />
                    </label>
                    <button className={`${mode ? null:'dark'} btn`}>Save</button>
              </form>
            </div>
        </div>
    )
}