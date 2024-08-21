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
import NotFound from "../components/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute"
import { useSelector } from "react-redux";

const AppRoutes = () => {
    const userInfo = useSelector(state => state.user.userInfo)
    const roleId = userInfo?.roleId

    const menuRoutes = {
        // roll admin
        1: [
            { path: "/", component: Home },
            { path: "/management/booking", component: BookingManagement },
            { path: "/management/user", component: UserManagement },
        ],
        // roll doctor
        2: [
            { path: "/", component: Home },
            { path: "/management/booking", component: BookingManagement },
            { path: "/profile", component: Profile },
            { path: "/detail/booking", component: DetailBooking },
        ],
        // roll patient
        3: [
            { path: "/", component: Home },
            { path: "/history/medical", component: MedicalHistory },
            { path: "/profile", component: Profile },
            { path: "/detail/booking", component: DetailBooking },
            { path: "/detail/user", component: DetailUser },
        ]
    };

    return (
        <Routes>
            {roleId && menuRoutes[roleId]?.map((item, index) => (
                <Route
                    key={index}
                    path={item.path}
                    element={<PrivateRoute element={item.component} />}
                />
            ))}

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Catch undefined routes */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
