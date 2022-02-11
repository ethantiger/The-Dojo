import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { doc, updateDoc } from 'firebase/firestore'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async(email, password) => {
        setError(null)
        setIsPending(true)
        

        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {

                const docRef = doc(db, 'users', res.user.uid)
                updateDoc(docRef, {
                    online: true,
                })

                dispatch({ type: 'LOGIN', payload: res.user})

                setIsPending(false)
                setError(null)
            })
            .catch((err) => {
                setError(err.message)
                setIsPending(false)
            })


    }

    return { login, error, isPending }
}