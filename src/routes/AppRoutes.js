import {
    Routes,
    Route
} from "react-router-dom";

import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div>404 NOT FOUND</div>} />
        </Routes>
    );
}

export default AppRoutes;
