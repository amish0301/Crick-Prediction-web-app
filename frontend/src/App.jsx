import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import './App.css';
import Profile from './components/Profile.jsx';
import { CustomThemeProvider } from './context/ThemeContext';
import AdminLayout from './layout/AdminLayout.jsx';
import AppLayout from './layout/AppLayout.jsx';
import { AdminLogin, AdminDashboard, PlayerManagement, TeamManagement, TournamentManagement, TournamentTeams, AddPlayerPage, MatchManagement, UserManagement, CoinManagementPage } from './pages/admin/index.admin.js';
import EmailVerifyCallback from './pages/EmailVerifyCallback.jsx';
import GoogleOAuthCallback from './pages/GoogleOAuthCallback.jsx';
import { About, Completed, Contact, Dashboard, Home, Live, Login, Signup, Upcoming } from './pages/index.js';
import AuthWrapper from './utils/AuthWrapper.jsx';
import AdminWrapper from './utils/AdminWrapper.jsx';
import Prediction from './pages/Prediction.jsx';




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
          <Route path='/tournament/team' element={<Upcoming />} />
          <Route path='/predict/' element={<Prediction />} />
        </Route>

        {/* Admin Routes - First declare the login route outside of AdminLayout */}

        {/* Then declare the protected admin routes */}
        <Route path='/admin' element={<AdminWrapper redirect='/admin/login'><AdminLayout /></AdminWrapper>}>
          {/* Admin dashboard and other protected admin routes would go here */}
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path="admin/player/:playerId" element={<PlayerManagement />} />
          <Route path='/admin/players' element={<PlayerManagement />} />
          <Route path='/admin/teams' element={<TeamManagement />} />
          <Route path='/admin/tournaments' element={<TournamentManagement />} />
          <Route path='/admin/tournament/team' element={<TournamentTeams />} />
          <Route path='/admin/match-management' element={<MatchManagement />} />
          <Route path='/admin/teams/assign/:teamId' element={<AddPlayerPage />} />
          <Route path='/admin/rewards' element={<CoinManagementPage />} />
          <Route path='/admin/users' element={<UserManagement />} />
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