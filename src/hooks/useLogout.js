import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { useTheme } from './useTheme'

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch, user } = useAuthContext()
    const { changeMode,changeColor } = useTheme()


    const logout = async () => {
        setError(null)
        setIsPending(true)
        changeMode(true)
        changeColor('#7547f7')
        const root = document.querySelector(':root')
        root.style.setProperty('--primary-color', '#7547f7')

        const { uid } = user
        const docRef = doc(db, 'users', uid)
        await updateDoc(docRef, {
            online: false
        })

        signOut(auth)
            .then(() => {
                dispatch({ type: 'LOGOUT' })

                setIsPending(false)
                setError(null)
            })
            .catch((err) => {
                setError(err.message)
                setIsPending(false)
            })
    }

    return { logout, error, isPending }
}