import "./Home.scss"
import addIcon from "../../assets/icons/Add.svg"
import Bottles from "../../assets/images/blmedicin.jpg"
import Blender from "../../assets/images/heath.jpg"
import Pills from "../../assets/images/medicin.jpg"
import BlisterPack from "../../assets/images/medicins.jpg"
import Microscope from "../../assets/images/research.jpg"
import { getAvailableBooking, createBooking } from "../../redux/slices/bookingSlice"
import ModalComponent from "../Modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';

const Home = () => {
    const dispatch = useDispatch()
    const isGettingAvailable = useSelector(state => state.booking.isGettingAvailable)
    const availableBookingList = useSelector(state => state.booking.availableBookingList)
    const isCreatingBooking = useSelector(state => state.booking.isCreatingBooking)
    const userInfo = useSelector(state => state.user.userInfo)
    const [morningAppointments, setMorningAppointments] = useState("")
    const [afternoonAppointments, setAfternoonAppointments] = useState("")
    const [showBookingModal, setShowBookingModal] = useState(false)
    const initialState = {
        appointmentDate: "",
        appointmentTime: "",
        patientId: userInfo?.id
    }
    const [selectedAppointment, setSelectedAppointment] = useState(initialState);

    useEffect(() => {
        if (availableBookingList) {
            setMorningAppointments(availableBookingList.filter(appointment => appointment.appointmentTime === 'Morning'));
            setAfternoonAppointments(availableBookingList.filter(appointment => appointment.appointmentTime === 'Afternoon'));
        }
    }, [availableBookingList])

    const handleToggleBookingModal = () => {
        setShowBookingModal(!showBookingModal)
    }

    const handleBookingBtn = () => {
        dispatch(getAvailableBooking())
        handleToggleBookingModal()
    }

    const handleAppointmentChange = (appointmentDate, appointmentTime) => {
        setSelectedAppointment({
            ...selectedAppointment,
            appointmentDate,
            appointmentTime
        })
    };

    const handleBooking = async () => {
        if (selectedAppointment.appointmentDate && selectedAppointment.appointmentTime) {
            try {
                const response = await dispatch(createBooking(selectedAppointment)).unwrap();
                if (response?.message) {
                    handleToggleBookingModal();
                    toast.success("Appointment is created successfully")
                }
            } catch (error) {
                if (error?.message === "Rejected") {
                    toast.error(error.payload || "Booking failed.");
                } else {
                    toast.error("An unexpected error occurred.");
                }
            }
        } else {
            toast.error("Please select date and time.");
        }
    }

    if (isCreatingBooking || isGettingAvailable) {
        return <LoadingSpinner />
    }

    return (
        <div className="home-container">
            <div className="home-body-header">
                <div className="body-header-name">
                    <button
                        onClick={() => handleBookingBtn()}
                        className="btn btn-primary">
                        Booking
                        <img src={addIcon} alt="Add" />
                    </button>
                </div>
            </div>

            <div className="home-body-infor">
                <div className="body-panel">
                    <p className="body-panel-text">
                        MeriCal is a <strong>Premier Private Label</strong> and <strong>Contract Manufacturer</strong> in the United States.
                    </p>
                </div>
                <div className="panel-item">
                    <img src={Bottles} alt="Bottles" />
                    <img src={Blender} alt="Blender" />
                    <img src={Pills} alt="Pills" />
                    <img src={BlisterPack} alt="BlisterPack" />
                    <img src={Microscope} alt="Microscope" />
                </div>
            </div>

            <ModalComponent
                show={showBookingModal}
                size="lg"
                handleClose={handleToggleBookingModal}
                title="Booking An Appointment"
                body={
                    <div className="booking-container">
                        <label>Morning</label>
                        <select onChange={(e) => handleAppointmentChange(e.target.value, 'Morning')}>
                            <option value="">Select Morning Appointment</option>
                            {morningAppointments && morningAppointments.map((appointment, index) => (
                                <option key={index} value={appointment.appointmentDate}>
                                    {appointment.appointmentDate}
                                </option>
                            ))}
                        </select>

                        <label>Afternoon</label>
                        <select onChange={(e) => handleAppointmentChange(e.target.value, 'Afternoon')}>
                            <option value="">Select Afternoon Appointment</option>
                            {afternoonAppointments && afternoonAppointments.map((appointment, index) => (
                                <option key={index} value={appointment.appointmentDate}>
                                    {appointment.appointmentDate}
                                </option>
                            ))}
                        </select>
                    </div>
                }
                handlePrimaryBtnClick={handleBooking}
                primaryBtnText="Booking"
            />
        </div>
    )
}

export default Home