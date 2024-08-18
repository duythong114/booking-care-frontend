import "./Profile.scss"
import avatar from "../../assets/icons/Avatar.svg"
import editIcon from "../../assets/icons/edit.svg"

const Profile = () => {
    return (
        <div className="profile-container">
            <h1 className="profile-name">personal information</h1>
            <div className="profile-name-infor">
                <div className="infor-avatar">
                    <img className="infor-img-avatar" src={avatar} alt="Avatar" />  
                    <img className="infor-img-edit" src={editIcon} alt="Edit" />
                </div>
                <div className="info-fields">
                    <span>Nguyen Van A</span>
                </div>
                <div className="info-fields">
                    <span>dd/mm/yyyy</span>
                </div>
                <div className="info-fields">
                    <span>Male</span>
                </div>
                <div className="info-fields">
                    <span>0932359483</span>
                </div>
                <div className="info-fields">
                    <span>VanANguyen@gmail.com</span>
                </div>
                <div className="info-fields">
                    <span>BinhThanh, HoChiMinh</span>
                </div>
            </div>
        </div>
    )
}

export default Profile