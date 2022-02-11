import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { auth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { doc, setDoc } from 'firebase/firestore'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = (email, password, displayName, settings) => {
        setError(null)
        setIsPending(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {

                // const storageRef = ref(storage,`thumbnails/${res.user.uid}/${thumbnail.name}`)
                // const uploadTask = uploadBytesResumable(storageRef, thumbnail);

                // uploadTask.on(
                //     "state_changed",
                //     () => {
                //         getDownloadURL(uploadTask.snapshot.ref)
                //             .then((url) => updateProfile(res.user, { displayName, photoURL: url }))
                //     }
                // )
                
                updateProfile(res.user, { displayName })

                // create user document
                const docRef = doc(db, 'users', res.user.uid)
                setDoc(docRef, {
                    online: true,
                    displayName,
                    id:res.user.uid,
                    settings
                })

                // dispatch
                dispatch({type:'LOGIN', payload:res.user})

                setIsPending(false)
            })
            .catch((err) => {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            })
    }
    

    return { error, isPending, signup }
}