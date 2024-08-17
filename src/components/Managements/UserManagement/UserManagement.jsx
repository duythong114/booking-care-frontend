import "./UserManagement.scss"
import searchIcon from "../../../assets/icons/search.svg"
import addIcon from "../../../assets/icons/Add.svg"
import editIcon from "../../../assets/icons/edit.svg"
import deleteIcon from "../../../assets/icons/delete.svg"

const UserManagement = () => {

    return(
        <div className="user-mana-container">
            <h1 className="user-name-header">user management</h1>
            <div className="user-header">
                <div className="user-header-search">
                    <input className="search-input" type="text" placeholder="Enter search information"/>
                    <img className="search-icon" src={searchIcon} alt="Search" />
                </div>
                <button className="btn btn-primary">
                    Create User
                    <img src={addIcon} alt="Add" />
                </button>
            </div>
            <div className="user-mana-body">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>001</td>
                        <td>Nguyen Van A</td>
                        <td>VanANguyen@gmail.com</td>
                        <td>Docter</td>
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
                        <td>VanBNguyen@gmail.com</td>
                        <td>Docter</td>
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
                        <td>003</td>
                        <td>Nguyen Van C</td>
                        <td>VanCNguyen@gmail.com</td>
                        <td>Patient</td>
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
                        <td>004</td>
                        <td>Nguyen Van D</td>
                        <td>VanDNguyen@gmail.com</td>
                        <td>Patient</td>
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
        </div>
    )
}

export default UserManagement