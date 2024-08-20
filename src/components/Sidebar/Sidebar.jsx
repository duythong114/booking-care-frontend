import { useState } from "react";
import "./Sidebar.scss";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/slices/userSlice'
import logoutIcon from '../../assets/icons/logout.svg'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigation = (index, path) => {
        setActiveIndex(index);
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login')
        toast.success("User logged out")
    }

    return (
        <div className="sidebar-container">
            <ul>
                <li
                    className={activeIndex === 0 ? "active" : ""}
                    onClick={() => handleNavigation(0, "/")}
                >
                    Home
                </li>
                <li
                    className={activeIndex === 1 ? "active" : ""}
                    onClick={() => handleNavigation(1, "/management/booking")}
                >
                    Booking Management
                </li>
                <li
                    className={activeIndex === 2 ? "active" : ""}
                    onClick={() => handleNavigation(2, "/management/user")}
                >
                    User Management
                </li>
                <li
                    className={activeIndex === 3 ? "active" : ""}
                    onClick={() => handleNavigation(3, "/history/medical")}
                >
                    Medical history
                </li>
                <li
                    className={activeIndex === 4 ? "active" : ""}
                    onClick={() => handleNavigation(4, "/profile")}
                >
                    Profile
                </li>
                <li
                    id="logout-section"
                    onClick={() => handleLogout()}
                >
                    Logout
                    <img src={logoutIcon} alt="logout-icon" />
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
