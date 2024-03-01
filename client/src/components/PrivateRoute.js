import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// This function provides route protection, allowing only authenticated users to access certain routes.
const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);
    const location = useLocation();

    if (authUser) {
        return <Outlet />
    } else {
        return <Navigate to="/signin" state={{ from: location.pathname }} />
    }
}

export default PrivateRoute;
