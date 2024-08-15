import { Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const user = useSelector(state => state.user.user);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated && user ? (
                    <Element />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
}

export default PrivateRoute;
