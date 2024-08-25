import "./DetailBooking.scss"
import editIcon from "../../../assets/icons/edit.svg"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import { updateBooking, getDetailBooking } from "../../../redux/slices/bookingSlice"
import { toast } from 'react-toastify';
import ModalComponent from "../../Modal/Modal"
import { useEffect, useState } from "react"

const DetailBooking = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const detailBooking = useSelector(state => state.booking.detailBooking)
    const isGettingDetailBooking = useSelector(state => state.booking.isGettingDetailBooking)
    const isUpdatingBooking = useSelector(state => state.booking.isUpdatingBooking)

    const [showEditModal, setShowEditModal] = useState(false)
    const [updateData, setUpdateData] = useState({
        bookingId: '',
        appointmentTime: '',
        appointmentDate: '',
        appointmentStatus: '',
        diagnosis: '',
        treatment: ''
    });

    useEffect(() => {
        if (detailBooking) {
            setUpdateData({
                bookingId: detailBooking.id,
                appointmentTime: detailBooking.appointmentTime,
                appointmentDate: detailBooking.appointmentDate,
                appointmentStatus: detailBooking.appointmentStatus,
                diagnosis: detailBooking.diagnosis,
                treatment: detailBooking.treatment,
            });
        }
    }, [detailBooking]);

    const handleComback = () => {
        localStorage.setItem("currentPath", "/management/booking")
        navigate("/management/booking")
    }


    const handleToggleEditModal = () => {
        setShowEditModal(!showEditModal)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({
            ...updateData,
            [name]: value
        })
    };

    const validateInputs = () => {
        const requiredFields = ['appointmentStatus', 'diagnosis', 'treatment'];
        for (const field of requiredFields) {
            if (!updateData[field]?.trim()) {
                toast.error(`Please fill out the ${field} field.`);
                return false;
            }
        }
        return true;
    }

    const handleEdit = async () => {
        if (!validateInputs()) return;

        try {
            const response = await dispatch(updateBooking(updateData)).unwrap();

            if (response?.message) {
                dispatch(getDetailBooking(updateData?.bookingId));
                handleToggleEditModal();
                toast.success(response.message);
            }
        } catch (error) {
            if (error) {
                toast.error(error || "Profile update failed.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    if (isGettingDetailBooking || isUpdatingBooking) {
        return <LoadingSpinner />
    }

    return (
        <div className="detail-container">
            <h1 className="detail-name">detail booking</h1>

            <div className="detail-infor-medical">
                <div className="infor-medical-wrapper">
                    <div className="infor-medical">
                        <span><strong>Record ID:</strong>{detailBooking?.id}</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Patient:</strong>{detailBooking?.patientName}</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Doctor:</strong>{detailBooking?.doctorName}</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Date:</strong>{detailBooking?.appointmentDate}</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Time:</strong>{detailBooking?.appointmentTime}</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Status:</strong>{detailBooking?.appointmentStatus}</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Diagnosis:</strong>{detailBooking?.diagnosis}</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Treatment:</strong>{detailBooking?.treatment}</span>
                    </div>

                    <button
                        onClick={() => handleComback()}
                        className="btn btn-primary"
                    >
                        Come Back
                    </button>
                </div>

                <button
                    onClick={() => handleToggleEditModal()}
                    type="button" className="edit-icon">
                    <img src={editIcon} alt="edit" />
                </button>
            </div>

            <ModalComponent
                show={showEditModal}
                size="lg"
                handleClose={handleToggleEditModal}
                title="Edit Profile"
                body={
                    <div className="edit-booking-container">
                        <label>AppointmentStatus:</label>
                        <select
                            name="appointmentStatus"
                            value={updateData?.appointmentStatus}
                            onChange={handleInputChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancel">Cancel</option>
                        </select>
                        <label>Diagnosis:</label>
                        <input
                            type="text"
                            placeholder="diagnosis"
                            name="diagnosis"
                            value={updateData?.diagnosis}
                            onChange={handleInputChange}
                        />
                        <label>Treatment:</label>
                        <input
                            type="text"
                            placeholder="treatment"
                            name="treatment"
                            value={updateData?.treatment}
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

export default DetailBooking