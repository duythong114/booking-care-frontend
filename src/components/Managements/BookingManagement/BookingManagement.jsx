import "./BookingManagement.scss"
import searchIcon from "../../../assets/icons/search.svg"
import addIcon from "../../../assets/icons/Add.svg"
import detailIcon from "../../../assets/icons/detail.svg"
import deleteIcon from "../../../assets/icons/delete.svg"
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux"
import { getAllBookings, deleteBooking, getDetailBooking } from "../../../redux/slices/bookingSlice"
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
    const isGettingDetailBooking = useSelector(state => state.booking.isGettingDetailBooking)
    const [current, setCurrent] = useState(1)
    // eslint-disable-next-line
    const [pageSize, setPageSize] = useState(4)
    const [showModal, setShowModal] = useState(false)
    const [bookingData, setBookingData] = useState(null)

    useEffect(() => {
        let pagination = { current, pageSize }
        dispatch(getAllBookings(pagination))
        // eslint-disable-next-line
    }, [current])

    // this function is from react-paginate
    const handlePageClick = (event) => {
        setCurrent(event.selected + 1)
    }

    const handleCloseModal = () => {
        setShowModal(!showModal)
    }

    const handleDeleteBtn = (booking) => {
        setShowModal(!showModal)
        setBookingData(booking)
    }

    const handleConfirmDelete = async () => {
        const bookingId = bookingData.id
        if (bookingId) {
            const response = await dispatch(deleteBooking(bookingId))
            if (response?.error?.message === "Rejected" && response?.payload) {
                toast.error(response.payload);
            }
            if (response?.payload?.message) {
                let pagination = { current, pageSize }
                dispatch(getAllBookings(pagination))
                toast.success(response.payload.message);
                setShowModal(!showModal)
            }
        }
    }

    const handleDetailBtn = (booking) => {
        const bookingId = booking.id
        if (bookingId) {
            dispatch(getDetailBooking(bookingId))
            localStorage.setItem("currentPath", "/detail/booking")
            navigate("/detail/booking");
        }
    }

    if (isGettingDetailBooking) {
        return <LoadingSpinner />
    }

    return (
        <div className="booking-mana-container">
            <h1 className="booking-name-header">booking management</h1>
            <div className="booking-header">
                <div className="booking-header-search">
                    <input className="search-input" type="text" placeholder="Enter search information" />
                    <img className="search-icon" src={searchIcon} alt="Search" />
                </div>
                <button className="btn btn-primary">
                    Booking
                    <img src={addIcon} alt="Add" />
                </button>
            </div>
            <div className="booking-mana-body">
                <input className="booking-date" type="date" placeholder="dd/mm/yyyy" />
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
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
                                <td colSpan={5}><LoadingSpinner /></td>
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
                                            <button
                                                onClick={() => handleDeleteBtn(booking)}
                                                className="delete-icon">
                                                <img src={deleteIcon} alt="Delete" />
                                            </button>
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
                handleClose={handleCloseModal}
                title="Confirm Delete"
                body="Are you sure to delete this booking?"
                handlePrimaryBtnClick={handleConfirmDelete}
                primaryBtnText="Delete"
            />
        </div>
    )
}

export default BookingManagement