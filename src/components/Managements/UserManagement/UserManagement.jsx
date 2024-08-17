import "./UserManagement.scss"
import searchIcon from "../../../assets/icons/search.png"
import addIcon from "../../../assets/icons/Add.svg"
import editIcon from "../../../assets/icons/edit.png"
import deleteIcon from "../../../assets/icons/delete.png"

const UserManagement = () => {

    return(
        <div className="userMana-container">
            <h1 className="pageName-header">user management</h1>
            <div className="userName-header">
                <div className="searchUser">
                    <input className="searchInput" type="text" placeholder="Enter search information"/>
                    <img className="searchIcon" src={searchIcon} alt="Search" />
                </div>
                <button className="addUser">
                    Create User
                    <img src={addIcon} alt="Add" />
                </button>
            </div>
            <div className="userMana-body">
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
                            <button className="editIcon">
                                <img src={editIcon} alt="Edit" />
                            </button>
                            <button className="deteleIcon">
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
                            <button className="editIcon">
                                <img src={editIcon} alt="Edit" />
                            </button>
                            <button className="deteleIcon">
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
                            <button className="editIcon">
                                <img src={editIcon} alt="Edit" />
                            </button>
                            <button className="deteleIcon">
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
                            <button className="editIcon">
                                <img src={editIcon} alt="Edit" />
                            </button>
                            <button className="deteleIcon">
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