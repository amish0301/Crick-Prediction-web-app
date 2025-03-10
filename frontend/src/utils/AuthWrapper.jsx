import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const AuthWrapper = ({ children, redirect = '/', isAdmin = null, requiresAuth = false }) => {
    const { user } = useSelector(state => state.user);
    const isAuthenticated = user?.isVerified;

    if ((!isAuthenticated && requiresAuth) || (isAuthenticated && !requiresAuth)) return <Navigate to={redirect} replace />;
    return children ? children : <Outlet />;
}

export default AuthWrapper