import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useTheme } from '../../hooks/useTheme'

// styles
import './Create.css'


const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
]

export default function Edit({proj}) {
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { mode } = useTheme()

  const [name, setName] = useState(proj.name)
  const [details, setDetails] = useState(proj.details)
  const [dueDate, setDueDate] = useState(proj.dueDate)
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  const customStyles = {
    menu: (styles) => ({
      ...styles,
      backgroundColor: 'rgb(29, 29, 29)',
      color: '#fff',
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: 'rgb(29, 29, 29)',
      display: 'flex'
    }),
    singleValue: (styles) => ({
      ...styles,
      color:'#fff'
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor:'#333',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color:'#fff'
    })
  }


  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('Please select a project category')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign project to at least 1 user')
      return
    } 

    const createdBy = {
      displayName: user.displayName,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        id: u.value.id
      }
    })

    const comments = proj.comments

    const project = {
      name,
      details,
      category: category.value,
      dueDate: new Date(dueDate),
      comments,
      createdBy,
      assignedUsersList
    }
    const docRef = doc(db, 'projects', proj.id)

    await updateDoc(docRef, project)
    navigate('/')
  }

  return (
    <div className={`create-form ${mode ? null:'dark'}`}>
      <h2 className="page-title">Edit an existing project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select 
            styles={mode ? false:customStyles}
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            styles={mode ? false:customStyles}
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Save</button>
        <button className="btn" onClick={() => navigate('/')}>Cancel</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
