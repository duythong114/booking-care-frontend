import "./DetailUser.scss"
import avatar from "../../../assets/icons/Avatar.svg"
import editIcon from "../../../assets/icons/edit.svg"

const DetailUser = () => {
    return (
        <div className="detail-user-container">
            <h1 className="detail-user-name">personal information</h1>
            <div className="user-name-infor">
                <div className="user-avatar">
                    <img className="user-img-avatar" src={avatar} alt="Avatar" />  
                    <img className="user-img-edit" src={editIcon} alt="Edit" />
                </div>
                <div className="user-fields">
                    <span>Nguyen Van A</span>
                </div>
                <div className="user-fields">
                    <span>dd/mm/yyyy</span>
                </div>
                <div className="user-fields">
                    <span>Male</span>
                </div>
                <div className="user-fields">
                    <span>0932359483</span>
                </div>
                <div className="user-fields">
                    <span>VanANguyen@gmail.com</span>
                </div>
                <div className="user-fields">
                    <span>BinhThanh, HoChiMinh</span>
                </div>
            </div>
        </div>
    )
}

export default DetailUser