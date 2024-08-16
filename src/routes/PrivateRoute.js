import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const user = useSelector(state => state.user.user);

    return (isAuthenticated && user) ? <Element /> : <Navigate to="/login" />;
}

export default PrivateRoute;
