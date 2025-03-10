import { Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import './App.css';
import Profile from './components/Profile.jsx';
import { CustomThemeProvider } from './context/ThemeContext';
import AdminLayout from './layout/AdminLayout.jsx';
import AppLayout from './layout/AppLayout.jsx';
import { AdminLogin } from './pages/admin/index.admin.js';
import EmailVerifyCallback from './pages/EmailVerifyCallback.jsx';
// import AdminSignin from './pages/admin/AdminSignin.jsx';


function App() {

  return (
    <CustomThemeProvider>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<AppLayout />}>

          {/* Tournament routes */}
          <Route path="/tournament/live" element={<Live />} />
          <Route path="/tournament/upcoming" element={<Upcoming />} />
          <Route path="/tournament/completed" element={<Completed />} />


          {/* Admin Routes - Wrapped Inside AdminLayout */}
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
        <Route path='/auth/admin' element={<AdminLogin />} />
        {/* <Route path='/admin/signin' element={<AdminSignin />} /> */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/verify-email' element={<EmailVerifyCallback />} />
        <Route path='/auth/success' element={<GoogleOAuthCallback />} />
      </Routes>

      <ToastContainer position='top-center' theme='dark' transition={Slide} autoClose={2000} />
    </CustomThemeProvider>
  )
}

export default App
