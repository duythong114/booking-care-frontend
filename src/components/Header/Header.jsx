import "./Header.scss"
import logo from "../../assets/icons/logo.svg"
import bellIcon from "../../assets/icons/bell.svg"
import avatar from "../../assets/icons/Avatar.svg"
import { useSelector } from "react-redux"

const Header = () => {
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <div className="header-container">
            <div className="header-logo">
                <img src={logo} alt="Logo" />
                <span>Booking Care</span>
            </div>
            <div className="header-slogan">
                <span>Live healthy, live happy – with us Comprehensive care, healthy future</span>
            </div>
            <div className="header-infor">
                <img src={bellIcon} alt="Notification" />
                <span>Welcome, <strong>{userInfo?.fullName}</strong></span>
                <div className="header-infor-avatar">
                    <img src={userInfo?.avatarUrl ? userInfo.avatarUrl : avatar} alt="Avatar" />
                </div>
            </div>
        </div>
    )
}

export default Header