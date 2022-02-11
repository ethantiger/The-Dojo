import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useTheme } from './hooks/useTheme'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase/config'
import { useEffect } from 'react'

// styles
import './App.css'

// pages and components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'
import Settings from './pages/settings/Settings'
import Chat from './pages/chat/Chat'



function App() {
  const { user, authIsReady } = useAuthContext()
  const { mode, changeMode, changeColor } = useTheme()

  useEffect (() => {
    if (user) {
      const docRef = doc(db, 'users', user.uid)
      getDoc(docRef)
      .then(doc => {
          changeMode(doc.data().settings.mode)
          changeColor(doc.data().settings.color)
          const root = document.querySelector(':root')
          root.style.setProperty('--primary-color', doc.data().settings.color)
    })
    
  }
  },[user])

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className={`container ${mode ? null:'dark'}`}>
            <Navbar />
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
              <Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/login" />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
              <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
              <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
