import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLayout from './layout/AdminLayout.jsx'
import AppLayout from './layout/AppLayout.jsx'
import { AdminLogin } from './pages/admin/index.admin.js'
import { About, Contact, Home, Login, Signup } from './pages/index.js'
import AuthWrapper from './utils/AuthWrapper.jsx'

function App() {

  return (
    <>
      <Routes>
        {/* User Routes */}
        <Route path='/' element={<AuthWrapper redirect='/auth/login' isAuthenticated={true}><AppLayout /></AuthWrapper>}>
          <Route path='/' index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={<AuthWrapper redirect='/auth/admin' isAdmin={true}><AdminLayout /></AuthWrapper>}>
        </Route>

        {/* Auth Routes */}
        <Route path='/auth/admin' element={<AdminLogin />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
