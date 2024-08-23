import "./DetailUser.scss"
import avatar from "../../../assets/icons/Avatar.svg"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"

const DetailUser = () => {
    const navigate = useNavigate()
    const isGettingDetailUser = useSelector(state => state.user.isGettingDetailUser)
    const detailUser = useSelector(state => state.user.detailUser)

    const handleComback = () => {
        localStorage.setItem("currentPath", "/management/user")
        navigate("/management/user")
    }

    if (isGettingDetailUser) {
        return <LoadingSpinner />
    }

    return (
        <div className="detail-user-container">
            <h1 className="detail-user-name">Detail User</h1>
            <div className="user-name-infor">
                <div className="user-avatar">
                    <img className="user-img-avatar" src={detailUser?.avatarUrl ? detailUser.avatarUrl : avatar} alt="Avatar" />
                </div>
                <div className="user-fields">
                    <span>{detailUser?.fullName}</span>
                </div>
                <div className="user-fields">
                    <span>{detailUser?.dob}</span>
                </div>
                <div className="user-fields">
                    <span>{detailUser?.gender}</span>
                </div>
                <div className="user-fields">
                    <span>{detailUser?.phone}</span>
                </div>
                <div className="user-fields">
                    <span>{detailUser?.email}</span>
                </div>
                <div className="user-fields">
                    <span>{detailUser?.address}</span>
                </div>
            </div>
            <button
                onClick={() => handleComback()}
                className="btn btn-primary"
            >
                Come Back
            </button>
        </div>
    )
}

export default DetailUser