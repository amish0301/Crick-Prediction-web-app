import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout.jsx'
import { Home, Contact, About } from './pages/index.js'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route path='/' index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
