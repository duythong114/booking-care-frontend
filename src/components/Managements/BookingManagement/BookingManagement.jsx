import "./BookingManagement.scss"
import searchIcon from "../../../assets/icons/search.svg"
import addIcon from "../../../assets/icons/Add.svg"
import detailIcon from "../../../assets/icons/detail.svg"
import deleteIcon from "../../../assets/icons/delete.svg"
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux"
import { getAllBookings, deleteBooking, getDetailBooking, searchPatient, getBookingDate, getBookingTime } from "../../../redux/slices/bookingSlice"
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
    const isSearchingPatient = useSelector(state => state.booking.isSearchingPatient)

    const [page, setPage] = useState(1)
    // eslint-disable-next-line
    const [size, setSize] = useState(4)
    const [showModal, setShowModal] = useState(false)
    const [bookingData, setBookingData] = useState(null)
    const [searchData, setSearchData] = useState(null)
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null)

    useEffect(() => {
        let pagination = { page, size }
        dispatch(getAllBookings(pagination))
        // eslint-disable-next-line
    }, [page])

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
        const bookingId = bookingData.id
        if (bookingId) {
            const response = await dispatch(deleteBooking(bookingId))
            if (response?.error?.message === "Rejected" && response?.payload) {
                toast.error(response.payload);
            }
            if (response?.payload?.message) {
                let pagination = { page, size }
                dispatch(getAllBookings(pagination))
                toast.success(response.payload.message);
                handleToggleDeleteModal()
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

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            handleSearchPatient()
        }
    }

    const handleSearchPatient = () => {
        let pagination = { page, size, searchData };

        if(searchData) {
            dispatch(searchPatient(pagination))
        } else {
            let pagination = { page, size }
            dispatch(getAllBookings(pagination))
        }
    }

    const handleChange = (e) => {
        const selectedDate =e.target.value
        setDate(selectedDate);
        handleGetByDate(selectedDate);
      };

    const handleGetByDate = (selectedDate) => {
        let pagination = { page, size, date: selectedDate };

        if (selectedDate === ''){
            let pagination = { page, size }
            dispatch(getAllBookings(pagination))
        } else {
            dispatch(getBookingDate(pagination))
        }
    };

    const handleGetByTime = (e) => {
        const selectedTime = e.target.value;

        setTime(selectedTime);
    
        let pagination = { page, size, time: selectedTime};
    
        if (selectedTime === "All") {
            let pagination = { page, size }
            dispatch(getAllBookings(pagination));
        } else {
            dispatch(getBookingTime(pagination));
        }   
    };
    
    return (
        <div className="booking-mana-container">
            <h1 className="booking-name-header">booking management</h1>
            <div className="booking-header">
                <div className="booking-header-search">
                    <input 
                        className="search-input" 
                        type="text" 
                        value={searchData}
                        onKeyDown={(e)=>handleKeyPress(e)}
                        onChange={(e)=>setSearchData(e.target.value)}
                        placeholder="Enter search information"
                    />
                    <img className="search-icon" src={searchIcon} alt="Search" />
                </div>
                <button className="btn btn-primary">
                    Booking
                    <img src={addIcon} alt="Add" />
                </button>
            </div>
            <div className="booking-mana-body">
                <input 
                    className="booking-date"
                    type="date" 
                    placeholder="yyyy/mm/dd" 
                    value={date} 
                    onChange={handleChange}
                />
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>
                                Time
                                <select 
                                    onChange={handleGetByTime}
                                    className="filter-role"
                                >
                                    <option value={time}>Select</option>
                                    <option >All</option>
                                    <option >Morning</option>
                                    <option >Afternoon</option>
                                </select>
                            </th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {(isGettingAllBookings || isDeletingBooking || isSearchingPatient)
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
                handleClose={handleToggleDeleteModal}
                title="Confirm Delete"
                body="Are you sure to delete this booking?"
                handlePrimaryBtnClick={handleConfirmDelete}
                primaryBtnText="Delete"
            />
        </div>
    )
}

export default BookingManagement