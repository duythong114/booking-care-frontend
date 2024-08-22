import "./BookingManagement.scss"
import searchIcon from "../../../assets/icons/search.svg"
import addIcon from "../../../assets/icons/Add.svg"
import detailIcon from "../../../assets/icons/detail.svg"
import deleteIcon from "../../../assets/icons/delete.svg"

const BookingManagement = () => {

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
                            <th>Docter</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>Nguyen Van A</td>
                            <td>Nguyen Van A</td>
                            <td>dd/mm/yyyy</td>
                            <td>Morning</td>
                            <td>Pending</td>
                            <td>
                                <button className="detail-icon">
                                    <img src={detailIcon} alt="Detail" />
                                </button>
                                <button className="delete-icon">
                                    <img src={deleteIcon} alt="Delete" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>002</td>
                            <td>Nguyen Van B</td>
                            <td>Nguyen Van B</td>
                            <td>dd/mm/yyyy</td>
                            <td>Morning</td>
                            <td>processing</td>
                            <td>
                                <button className="detail-icon">
                                    <img src={detailIcon} alt="Detail" />
                                </button>
                                <button className="delete-icon">
                                    <img src={deleteIcon} alt="Delete" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>001</td>
                            <td>Nguyen Van C</td>
                            <td>Nguyen Van C</td>
                            <td>dd/mm/yyyy</td>
                            <td>Afternoon</td>
                            <td>Completed</td>
                            <td>
                                <button className="detail-icon">
                                    <img src={detailIcon} alt="Detail" />
                                </button>
                                <button className="delete-icon">
                                    <img src={deleteIcon} alt="Delete" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>001</td>
                            <td>Nguyen Van D</td>
                            <td>Nguyen Van D</td>
                            <td>dd/mm/yyyy</td>
                            <td>Afternoon</td>
                            <td>Cancel</td>
                            <td>
                                <button className="detail-icon">
                                    <img src={detailIcon} alt="Detail" />
                                </button>
                                <button className="delete-icon">
                                    <img src={deleteIcon} alt="Delete" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BookingManagement