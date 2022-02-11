import { useEffect, useState } from 'react'
import { db } from '../firebase/config' 
import { doc, onSnapshot } from 'firebase/firestore'

export const useDocument = (col, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for document
    useEffect(() => {
        const docRef = doc(db, col, id)

        const unsub = onSnapshot(docRef, (snapshot) => {
            if (snapshot.data()) {
                setDocument({...snapshot.data(), id: snapshot.id})
                setError(null)
            } else {
                setError('no such document exists')
            }
        }, (err) => {
            console.log(err.message)
            setError('failed to get document')
        })

        return () => unsub()

    }, [col, id])

    return { document, error }
}