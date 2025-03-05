import { Route, Routes } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify';
import './App.css'
import AdminLayout from './layout/AdminLayout.jsx'
import AppLayout from './layout/AppLayout.jsx'
import { AdminLogin } from './pages/admin/index.admin.js'
import { About, Contact, Home, Login, Signup, Dashboard, Live, Upcoming, Completed } from './pages/index.js'
import AuthWrapper from './utils/AuthWrapper.jsx'
import { CustomThemeProvider } from './context/ThemeContext';
import Profile from './components/Profile.jsx';
import GoogleOAuthCallback from './pages/GoogleOAuthCallback.jsx';
import EmailVerifyCallback from './pages/EmailVerifyCallback.jsx';


function App() {

  return (
    <CustomThemeProvider>
      <Routes>
        {/* User Routes */}
        <Route path='/' element={<AuthWrapper redirect='/auth/login' isAuthenticated={true}><AppLayout /></AuthWrapper>}>
          <Route path='/' index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile />} />
          <Route path='dashboard' element={<Dashboard />} />

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
        <Route path='/verify-email' element={<EmailVerifyCallback />} />
        <Route path='/auth/success' element={<GoogleOAuthCallback />} />
      </Routes>

      <ToastContainer position='top-center' theme='dark' transition={Slide} autoClose={2000} />
    </CustomThemeProvider>
  )
}

export default App
