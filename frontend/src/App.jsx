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


function App() {

  return (
    <CustomThemeProvider>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<AppLayout />}>

          {/* Public Routes - Accessible to All Users */}
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />

          {/* Protected Routes */}
          <Route path="profile" element={<AuthWrapper redirect='/auth/login' requiresAuth={true}><Profile /></AuthWrapper>} />
          <Route path="dashboard" element={<AuthWrapper redirect='/auth/login' requiresAuth={true}><Dashboard /></AuthWrapper>} />

          <Route path="/tournament" element={<AuthWrapper redirect="/auth/login" requiresAuth={true} />}>
            <Route path="live" element={<Live />} />
            <Route path="upcoming" element={<Upcoming />} />
            <Route path="completed" element={<Completed />} />
          </Route>
        </Route>


        {/* Redirect Authenticated Users Away from Login/Signup */}
        <Route path="/auth">
          <Route path="login" element={<AuthWrapper redirect="/" requiresAuth={false}><Login /></AuthWrapper>} />
          <Route path="signup" element={<AuthWrapper redirect="/" requiresAuth={false}><Signup /></AuthWrapper>} />
        </Route>


        {/* Admin Routes */}
        <Route path='/admin' element={<AuthWrapper redirect='/auth/admin' isAdmin={true}><AdminLayout /></AuthWrapper>}>
        </Route>

        {/* Auth Routes */}
        <Route path='/auth/admin/login' element={<AdminLogin />} />
        {/* <Route path='/auth/signup' element={<AuthWrapper redirect='/'><Signup /></AuthWrapper>} /> */}
        {/* <Route path='/auth/login' element={<AuthWrapper redirect='/'><Login /></AuthWrapper>} /> */}
        <Route path='/verify-email' element={<EmailVerifyCallback />} />
        <Route path='/auth/success' element={<GoogleOAuthCallback />} />
      </Routes>

      <ToastContainer position='top-center' theme='dark' transition={Slide} autoClose={2000} />
    </CustomThemeProvider>
  )
}

export default App
