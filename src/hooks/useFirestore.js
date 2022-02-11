import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'


export const useFirestore = (col) => {

    // collection ref
    const ref = collection(db, col)

    // add a document
    const addDocument = async (doc) => {
        const createdAt = new Date()
        await addDoc(ref, {...doc, createdAt})
    }

    // delete a document
    const deleteDocument = async (id) => {
        const docRef = doc(db, col, id)
        await deleteDoc(docRef)
    }

    // update a document
    const updateDocument = async(id, updates) => {
        const docRef = doc(db, col, id)
        await updateDoc(docRef, updates)
    }

    return { addDocument, deleteDocument, updateDocument }
}