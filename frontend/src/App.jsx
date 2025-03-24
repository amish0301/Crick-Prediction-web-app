import { Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import './App.css';
import Profile from './components/Profile.jsx';
import { CustomThemeProvider } from './context/ThemeContext';
import AdminLayout from './layout/AdminLayout.jsx';
import AppLayout from './layout/AppLayout.jsx';
import { AdminLogin } from './pages/admin/index.admin.js';
import EmailVerifyCallback from './pages/EmailVerifyCallback.jsx';
import GoogleOAuthCallback from './pages/GoogleOAuthCallback.jsx';
import { About, Completed, Contact, Dashboard, Home, Live, Login, Signup, Upcoming } from './pages/index.js';
import AuthWrapper from './utils/AuthWrapper.jsx';
import AdminWrapper from './utils/AdminWrapper.jsx';


function App() {

  return (
    <CustomThemeProvider>
      <Routes>
        {/* User Routes */}
        <Route path='/' element={<AuthWrapper redirect='/auth/login' requiresAuth={true}><AppLayout /></AuthWrapper>}>
          <Route index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile />} />
          <Route path='dashboard' element={<Dashboard />} />

          {/* Tournament routes */}
          <Route path="tournament/live" element={<Live />} />
          <Route path="tournament/upcoming" element={<Upcoming />} />
          <Route path="tournament/completed" element={<Completed />} />
        </Route>

        {/* Admin Routes - First declare the login route outside of AdminLayout */}

        {/* Then declare the protected admin routes */}
        <Route path='/admin' element={<AdminWrapper redirect='/admin/login'><AdminLayout /></AdminWrapper>}>
          {/* Admin dashboard and other protected admin routes would go here */}
          <Route index element={<div>Admin Dashboard</div>} />
        </Route>

        {/* Auth Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/auth/signup' element={<AuthWrapper requiresAuth={false}><Signup /></AuthWrapper>} />
        <Route path='/auth/login' element={<AuthWrapper requiresAuth={false}><Login /></AuthWrapper>} />
        <Route path='/verify-email' element={<EmailVerifyCallback />} />
        <Route path='/auth/success' element={<GoogleOAuthCallback />} />
      </Routes>

      <ToastContainer position='top-center' theme='dark' transition={Slide} autoClose={2000} />
    </CustomThemeProvider>
  )
}

export default App