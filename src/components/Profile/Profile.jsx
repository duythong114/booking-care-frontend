import "./Profile.scss"
import avatar from "../../assets/icons/Avatar.svg"
import editIcon from "../../assets/icons/edit.svg"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo, editUser, uploadAvatar } from "../../redux/slices/userSlice"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import ModalComponent from "../Modal/Modal"
import { useState } from "react"
import { toast } from 'react-toastify';

const Profile = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user.userInfo)
    const initialState = {
        avatar: null,
        fullName: userInfo?.fullName || '',
        dob: userInfo?.dob || '',
        gender: userInfo?.gender || 'male',
        password: '',
        phone: userInfo?.phone || '',
        address: userInfo?.address || ''
    }
    const isGettingUserInfo = useSelector(state => state.user.isGettingUserInfo)
    const isEditingUser = useSelector(state => state.user.isEditingUser)
    const isUploadingAvatar = useSelector(state => state.user.isUploadingAvatar)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editData, setEditData] = useState(initialState)

    const handleToggleEditModal = () => {
        setShowEditModal(!showEditModal)
    }

    const handleCloseEditModal = () => {
        setShowEditModal()
        setEditData(initialState)
    }

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setEditData({
            ...editData,
            [name]: files ? files[0] : value
        })
    };

    const validateInputs = () => {
        const requiredFields = ['fullName', 'dob', 'gender', 'phone', 'address'];
        for (const field of requiredFields) {
            if (!editData[field]) {
                toast.error(`Please fill out the ${field} field.`);
                return false;
            }
        }
        return true;
    }

    const handleEdit = async () => {
        if (!validateInputs()) return;

        try {
            if (editData.avatar) {
                await dispatch(uploadAvatar(editData.avatar)).unwrap();
            }

            const response = await dispatch(editUser(editData)).unwrap();

            if (response?.message) {
                toast.success(response.message);
                dispatch(getUserInfo());
                handleCloseEditModal();
            }
        } catch (error) {
            if (error?.message === "Rejected") {
                toast.error(error.payload || "Profile update failed.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    if (isGettingUserInfo || isEditingUser || isUploadingAvatar) {
        return <LoadingSpinner />
    }

    return (
        <div className="profile-container">
            <h1 className="profile-name">Profile</h1>
            <div className="profile-name-infor">
                <div className="infor-avatar">
                    <img className="infor-img-avatar" src={userInfo?.avatarUrl ? userInfo.avatarUrl : avatar} alt="Avatar" />
                    <img
                        onClick={() => handleToggleEditModal()}
                        className="infor-img-edit"
                        src={editIcon}
                        alt="Edit" />
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

            <ModalComponent
                show={showEditModal}
                size="lg"
                handleClose={handleCloseEditModal}
                title="Edit Profile"
                body={
                    <div className="edit-profile-container">
                        <label>Upload Avatar:</label>
                        <input
                            type="file"
                            placeholder="choose avatar"
                            name="avatar"
                            onChange={handleInputChange}
                        />
                        <label>Fullname:</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="fullName"
                            value={editData.fullName}
                            onChange={handleInputChange}
                        />
                        <label>Dob:</label>
                        <input
                            type="date"
                            placeholder="yyyy-mm-dd"
                            name="dob"
                            value={editData.dob}
                            onChange={handleInputChange}
                        />
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={editData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label>New Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={editData.password}
                            onChange={handleInputChange}
                        />
                        <label>Phone:</label>
                        <input
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={editData.phone}
                            onChange={handleInputChange}
                        />
                        <label>Address:</label>
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={editData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                }
                handlePrimaryBtnClick={handleEdit}
                primaryBtnText="Save"
            />
        </div>
    )
}

export default Profile