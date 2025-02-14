import { Navigate, Outlet } from "react-router-dom"

const AuthWrapper = ({ children, redirect = '/', isAdmin = null, isAuthenticated = null }) => {

    // for user
    if ((!isAuthenticated && isAdmin === null) || (!isAdmin && isAuthenticated === null)) return <Navigate to={redirect} replace />
    // if(!isAdmin && isAuthenticated === null) return <Navigate to={redirect} replace/>


    return children ? children : <Outlet />;
}

export default AuthWrapper