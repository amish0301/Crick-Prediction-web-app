import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminWrapper = ({ children, redirect = '/' }) => {
    const { user } = useSelector(state => state.user);

    if (user.role === 'user') return <Navigate to={redirect} replace />;
    return children ? children : <Outlet />;
}

export default AdminWrapper