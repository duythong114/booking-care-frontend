import "./BookingManagement.scss"
import searchIcon from "../../../assets/icons/search.svg"
import addIcon from "../../../assets/icons/Add.svg"
import detailIcon from "../../../assets/icons/detail.svg"
import deleteIcon from "../../../assets/icons/delete.svg"
import ascIcon from "../../../assets/icons/asc.svg"
import descIcon from "../../../assets/icons/desc.svg"
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux"
import {
    getAllBookings,
    deleteBooking,
    getDetailBooking,
    getAvailableBooking,
    createBooking,
} from "../../../redux/slices/bookingSlice"
import { useEffect, useState } from "react"
import ModalComponent from "../../Modal/Modal"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import { useNavigate } from "react-router-dom"

const BookingManagement = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const bookingList = useSelector(state => state.booking.bookingList)
    const totalPage = useSelector(state => state.booking.totalPage)
    const isGettingAllBookings = useSelector(state => state.booking.isGettingAllBookings)
    const isDeletingBooking = useSelector(state => state.booking.isDeletingBooking)
    const [page, setPage] = useState(1)
    // eslint-disable-next-line
    const [size, setSize] = useState(4)
    const [showModal, setShowModal] = useState(false)
    const [bookingData, setBookingData] = useState("")
    const isGettingAvailable = useSelector(state => state.booking.isGettingAvailable)
    const isCreatingBooking = useSelector(state => state.booking.isCreatingBooking)
    const availableBookingList = useSelector(state => state.booking.availableBookingList)
    const [morningAppointments, setMorningAppointments] = useState("")
    const [afternoonAppointments, setAfternoonAppointments] = useState("")
    const [showBookingModal, setShowBookingModal] = useState(false)
    const initialState = {
        appointmentDate: "",
        appointmentTime: "",
        patientId: ""
    }
    const [selectedAppointment, setSelectedAppointment] = useState(initialState);
    const [searchData, setSearchData] = useState("")
    const [sortOrder, setSortOrder] = useState("asc");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const userInfo = useSelector(state => state.user.userInfo)
    const roleId = userInfo?.roleId
    const menuRole = {
        1: 'Admin',
        2: 'Doctor',
        3: 'Patient',
    }

    useEffect(() => {
        let bookingPayload = { page, size, sortOrder, date, time, searchData };
        dispatch(getAllBookings(bookingPayload));

        // eslint-disable-next-line
    }, [date, time, sortOrder, page, searchData]);

    // this function is from react-paginate
    const handlePageClick = (event) => {
        setPage(event.selected + 1)
    }

    const handleToggleDeleteModal = () => {
        setShowModal(!showModal)
    }

    const handleDeleteBtn = (booking) => {
        handleToggleDeleteModal()
        setBookingData(booking)
    }

    const handleConfirmDelete = async () => {
        const bookingId = bookingData.id;
        if (bookingId) {
            try {
                const response = await dispatch(deleteBooking(bookingId)).unwrap();
                if (response?.message) {
                    let bookingPayload = { page, size, sortOrder, date, time, searchData };
                    dispatch(getAllBookings(bookingPayload));
                    handleToggleDeleteModal();
                    toast.success(response.message);
                }
            } catch (error) {
                toast.error(error || "Failed to delete the booking");
            }
        }
    };

    const handleDetailBtn = (booking) => {
        const bookingId = booking.id
        if (bookingId) {
            dispatch(getDetailBooking(bookingId))
            localStorage.setItem("currentPath", "/detail/booking")
            navigate("/detail/booking");
        }
    }

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
        if (selectedAppointment.appointmentDate && selectedAppointment.appointmentTime && selectedAppointment.patientId) {
            try {
                const response = await dispatch(createBooking(selectedAppointment)).unwrap();
                if (response?.message) {
                    let bookingPayload = { page, size, sortOrder, date, time, searchData };
                    dispatch(getAllBookings(bookingPayload));
                    handleToggleBookingModal();
                    toast.success(response.message);
                    setSelectedAppointment(initialState)
                }
            } catch (error) {
                if (error) {
                    toast.error(error || "Booking failed.");
                } else {
                    toast.error("An unexpected error occurred.");
                }
            }
        } else {
            toast.error("Please select date, time or patientId.");
        }
    }

    const toggleOrderSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }

    if (isCreatingBooking || isGettingAvailable) {
        return <LoadingSpinner />
    }

    return (
        <div className="booking-mana-container">
            <h1 className="booking-name-header">booking management</h1>
            <div className="booking-header">
                <div className="booking-header-search">
                    <input
                        className="search-input"
                        type="text"
                        value={searchData}
                        onChange={(e) => setSearchData(e.target.value)}
                        placeholder="Enter Patient Name"
                    />
                    <img className="search-icon" src={searchIcon} alt="Search" />
                </div>
                {roleId && menuRole[roleId] === "Admin" &&
                    <button
                        onClick={() => handleBookingBtn()}
                        className="btn btn-primary">
                        Booking
                        <img src={addIcon} alt="Add" />
                    </button>
                }
            </div>
            <div className="booking-mana-body">
                <div className="filter-section">
                    <input
                        className="booking-date"
                        type="date"
                        placeholder="yyyy-mm-dd"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        name="booking-time" className="booking-time">
                        <option value="">Select Time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                    </select>
                </div>
                <div className="mana-body-table">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => toggleOrderSort()}>
                                    ID
                                    {sortOrder === "asc"
                                        ? <img className="asc-icon" src={ascIcon} alt="asc" />
                                        : <img className="desc-icon" src={descIcon} alt="desc" />}
                                </th>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {(isGettingAllBookings || isDeletingBooking)
                            ?
                            <tbody>
                                <tr>
                                    <td colSpan={7}><LoadingSpinner /></td>
                                </tr>
                            </tbody>
                            :
                            <tbody>
                                {bookingList && bookingList.length > 0
                                    ?
                                    (bookingList.map((booking) => (
                                        <tr key={booking?.id}>
                                            <td>{booking?.id}</td>
                                            <td>{booking?.patientName}</td>
                                            <td>{booking?.doctorName}</td>
                                            <td>{booking?.appointmentDate}</td>
                                            <td>{booking?.appointmentTime}</td>
                                            <td>{booking?.appointmentStatus}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDetailBtn(booking)}
                                                    className="detail-icon">
                                                    <img src={detailIcon} alt="detail" />
                                                </button>
                                                {roleId && menuRole[roleId] === "Admin" &&
                                                    <button
                                                        onClick={() => handleDeleteBtn(booking)}
                                                        className="delete-icon">
                                                        <img src={deleteIcon} alt="Delete" />
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    )))
                                    :
                                    (<tr>
                                        <td colSpan="5">No bookings found</td>
                                    </tr>)}
                            </tbody>
                        }
                    </table>
                </div>

                {/* React-paginate */}
                {
                    totalPage && totalPage > 0 &&
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                }
            </div>

            {/* Modal for delete confirmation */}
            <ModalComponent
                show={showModal}
                handleClose={handleToggleDeleteModal}
                title="Confirm Delete"
                body="Are you sure to delete this booking?"
                handlePrimaryBtnClick={handleConfirmDelete}
                primaryBtnText="Delete"
            />

            {/* Modal for booking an appointment */}
            <ModalComponent
                show={showBookingModal}
                size="lg"
                handleClose={handleToggleBookingModal}
                title="Booking An Appointment"
                body={
                    <div className="booking-container">
                        <label>PatientId:</label>
                        <input
                            type="text"
                            placeholder="Enter PatientId"
                            value={selectedAppointment.patientId}
                            onChange={(e) => setSelectedAppointment({ ...selectedAppointment, patientId: e.target.value })} />
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

export default BookingManagement