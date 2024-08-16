import {
    Routes,
    Route
} from "react-router-dom";

import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import Home from "../components/Home/Home"
import DetailBooking from "../components/DetailPage/DetailBooking/DetailBooking"
import DetailUser from "../components/DetailPage/DetailUser/DetailUser"
import MedicalHistory from "../components/MedicalHistory/MedicalHistory"
import BookingManagement from "../components/Managements/BookingManagement/BookingManagement"
import UserManagement from "../components/Managements/UserManagement/UserManagement"
import Profile from "../components/Profile/Profile"

import PrivateRoute from "./PrivateRoute"

const AppRoutes = () => {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<PrivateRoute element={Home} />} exact />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Detail Page */}
            <Route path="/detail/booking" element={<PrivateRoute element={DetailBooking} />} exact />
            <Route path="/detail/user" element={<PrivateRoute element={DetailUser} />} exact />

            {/* History */}
            <Route path="/history/medical" element={<PrivateRoute element={MedicalHistory} />} exact />

            {/* Managements */}
            <Route path="/management/booking" element={<PrivateRoute element={BookingManagement} />} exact />
            <Route path="/management/user" element={<PrivateRoute element={UserManagement} />} exact />

            {/* Profile */}
            <Route path="/profile" element={<PrivateRoute element={Profile} />} />

            <Route path="*" element={<div>404 NOT FOUND</div>} />
        </Routes>
    );
}

export default AppRoutes;
