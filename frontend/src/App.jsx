import { Route, Routes } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify';
import './App.css'
import AdminLayout from './layout/AdminLayout.jsx'
import AppLayout from './layout/AppLayout.jsx'
import { AdminLogin } from './pages/admin/index.admin.js'
import { About, Contact, Home, Login, Signup, Dashboard, Live, Upcoming, Completed } from './pages/index.js'
import AuthWrapper from './utils/AuthWrapper.jsx'
import { CustomThemeProvider } from './context/ThemeContext';
// import { Dashboard } from '@mui/icons-material';
// import { GoogleLogin } from '@react-oauth/google';

function App() {

  return (
//     <GoogleLogin
//   onSuccess={credentialResponse => {
//     console.log(credentialResponse);
//   }}
//   onError={() => {
//     console.log('Login Failed');
//   }}
// />,
    <CustomThemeProvider>
      <Routes>
        {/* User Routes */}
        <Route path='/' element={<AuthWrapper redirect='/auth/login' isAuthenticated={true}><AppLayout /></AuthWrapper>}>
          <Route path='/' index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
          <Route path='dashboard' element={<Dashboard/>} />

      {/* Tournament routes */}
      <Route path="/tournament/live" element={<Live />} />
      <Route path="/tournament/upcoming" element={<Upcoming />} />
      <Route path="/tournament/completed" element={<Completed />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={<AuthWrapper redirect='/auth/admin' isAdmin={true}><AdminLayout /></AuthWrapper>}>
        </Route>

        {/* Auth Routes */}
        <Route path='/auth/admin' element={<AdminLogin />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>

      <ToastContainer position='top-center'  theme='dark' transition={Slide}/>
    </CustomThemeProvider>
  )
}

export default App
