import "./DetailBooking.scss"
import editIcon from "../../../assets/icons/edit.svg"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"

const DetailBooking = () => {
    const navigate = useNavigate()
    const detailBooking = useSelector(state => state.booking.detailBooking)
    const isGettingDetailBooking = useSelector(state => state.booking.isGettingDetailBooking)

    const handleComback = () => {
        localStorage.setItem("currentPath", "/management/booking")
        navigate("/management/booking")
    }

    if (isGettingDetailBooking) {
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

                <button type="button" className="edit-icon">
                    <img src={editIcon} alt="edit" />
                </button>
            </div>
        </div>
    )
}

export default DetailBooking