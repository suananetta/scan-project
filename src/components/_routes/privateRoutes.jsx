import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivatRoutes = () => {
    const userAuth = useSelector((state) => state.user.active);
    return (
        userAuth? <Outlet/> : <Navigate to='/' />
    )
}

export default PrivatRoutes;