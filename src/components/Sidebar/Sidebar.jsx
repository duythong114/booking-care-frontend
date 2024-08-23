import { useEffect, useState } from "react";
import "./Sidebar.scss";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/slices/userSlice'
import logoutIcon from '../../assets/icons/logout.svg'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const roleId = userInfo?.roleId;

    const menuItems = {
        // roll admin
        1: [
            { label: "Home", path: "/" },
            { label: "Booking Management", path: "/management/booking" },
            { label: "User Management", path: "/management/user" },
        ],
        // roll doctor
        2: [
            { label: "Home", path: "/" },
            { label: "Booking Management", path: "/management/booking" },
            { label: "Profile", path: "/profile" },
        ],
        // roll patient
        3: [
            { label: "Home", path: "/" },
            { label: "Medical history", path: "/history/medical" },
            { label: "Profile", path: "/profile" },
        ]
    };

    const handleNavigation = (index, path) => {
        setActiveIndex(index);
        navigate(path);
        localStorage.setItem("currentPath", path)
        localStorage.setItem("currentIndex", index)
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
        toast.success("User logged out");
    };

    useEffect(() => {
        const currentPath = localStorage.getItem("currentPath");
        const currentIndex = localStorage.getItem("currentIndex");

        if (!currentIndex) {
            setActiveIndex(0)
        }

        if (currentPath && currentIndex) {
            setActiveIndex(+currentIndex);
            navigate(currentPath);
        }
    }, [navigate])

    return (
        <div className="sidebar-container">
            <ul className="menu-container">
                {roleId && menuItems[roleId]?.map((item, index) => (
                    <li
                        key={index}
                        className={activeIndex === index ? "active" : ""}
                        onClick={() => handleNavigation(index, item.path)}
                    >
                        {item.label}
                    </li>
                ))}
                <li id="logout-section" onClick={handleLogout}>
                    Logout
                    <img src={logoutIcon} alt="logout-icon" />
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
