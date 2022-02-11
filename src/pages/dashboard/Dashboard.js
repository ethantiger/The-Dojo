import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import ProjectFilter from './ProjectFilter'
import { useTheme } from '../../hooks/useTheme'


// styles
import './Dashboard.css'


export default function Dashboard() {
  const { documents, error } = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('all')
  const { mode } = useTheme()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const projects = documents ? documents.filter((document) => {
    
    switch (currentFilter) {
      case 'all':
        return true
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        return document.category === currentFilter
      default:
        return true
    }
  }) : null


  return (
    <div className={mode ? null:'dark'}>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter mode={mode} currentFilter={currentFilter} changeFilter={changeFilter}/>}
      {documents && <ProjectList mode={mode} projects={projects}/>}
    </div>
  )
}
