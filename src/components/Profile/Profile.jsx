import "./Profile.scss"
import avatar from "../../assets/icons/Avatar.svg"
import editIcon from "../../assets/icons/edit.svg"
import { useSelector } from "react-redux"


const Profile = () => {
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <div className="profile-container">
            <h1 className="profile-name">Profile</h1>
            <div className="profile-name-infor">
                <div className="infor-avatar">
                    <img className="infor-img-avatar" src={userInfo?.avatarUrl ? userInfo.avatarUrl : avatar}use alt="Avatar" />  
                    <img className="infor-img-edit" src={editIcon} alt="Edit" />
                </div>
                <div className="info-fields">
                    <span>{userInfo?.fullName}</span>
                </div>
                <div className="info-fields">
                    <span>{userInfo?.dob}</span>
                </div>
                <div className="info-fields">
                    <span>{userInfo?.gender}</span>
                </div>
                <div className="info-fields">
                    <span>{userInfo?.phone}</span>
                </div>
                <div className="info-fields">
                    <span>{userInfo?.email}</span>
                </div>
                <div className="info-fields">
                    <span>{userInfo?.address}</span>
                </div>
            </div>
        </div>
    )
}

export default Profile