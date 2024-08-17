import "./BookingManagement.scss"
import searchIcon from "../../../assets/icons/search.svg"
import addIcon from "../../../assets/icons/Add.svg"
import editIcon from "../../../assets/icons/edit.svg"
import deleteIcon from "../../../assets/icons/delete.svg"

const BookingManagement = () => {

    return(
        <div className="booking-mana-container">
            <h1 className="booking-name-header">booking management</h1>
            <div className="booking-header">
                <div className="booking-header-search">
                    <input className="search-input" type="text" placeholder="Enter search information"/>
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
                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Docter</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>001</td>
                        <td>Nguyen Van A</td>
                        <td>Nguyen Van A</td>
                        <td>dd/mm/yyyy</td>
                        <td>Morning</td>
                        <td>Pending</td>
                        <td>
                            <button className="edit-icon">
                                <img src={editIcon} alt="Edit" />
                            </button>
                            <button className="detele-icon">
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
                            <button className="edit-icon">
                                <img src={editIcon} alt="Edit" />
                            </button>
                            <button className="detele-icon">
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
                            <button className="edit-icon">
                                <img src={editIcon} alt="Edit" />
                            </button>
                            <button className="detele-icon">
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
                            <button className="edit-icon">
                                <img src={editIcon} alt="Edit" />
                            </button>
                            <button className="detele-icon">
                                <img src={deleteIcon} alt="Delete" />
                            </button>
                        </td>
                    </tr>
                </table>
            </div>

            <div className="model-add-container">
                <div className="add-body">
                    <button id="add-close" className="btn btn-danger">X</button>
                    <h2 className="add-name">Create booking</h2>

                    <div class="add-info">
                        <div class="input-group">
                            <label for="date-input">Date:</label>
                            <input type="date" id="date-input" placeholder="dd/mm/yy" />
                        </div>
                        <div class="input-group">
                            <label>Time:</label>
                            <div className="time-options">
                                <label>
                                    <input type="radio" name="time" value="morning" />
                                    Morning
                                </label>
                                <label>
                                    <input type="radio" name="time" value="afternoon" />
                                    Afternoon
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="button" id="add-submit" class="btn btn-success">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default BookingManagement