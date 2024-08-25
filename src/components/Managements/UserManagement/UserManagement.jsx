import "./UserManagement.scss"
import searchIcon from "../../../assets/icons/search.svg"
import addIcon from "../../../assets/icons/Add.svg"
import detailIcon from "../../../assets/icons/detail.svg"
import deleteIcon from "../../../assets/icons/delete.svg"
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux"
import { getAllUser, deleteUser, getDetailUser, registerDoctor } from "../../../redux/slices/userSlice"
import { useEffect, useState } from "react"
import ModalComponent from "../../Modal/Modal"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import { useNavigate } from "react-router-dom"
import { searchUser } from "../../../redux/slices/userSlice"
import { getAllUserByRole } from "../../../redux/slices/userSlice"

const UserManagement = () => {
    const initialState = {
        fullName: "",
        email: "",
        gender: "",
        password: ""
    }

    const roleMap = {
        1: 'Admin',
        2: 'Doctor',
        3: 'Patient'
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(state => state.user.userList)
    const totalPage = useSelector(state => state.user.totalPage)
    const isGettingAllUsers = useSelector(state => state.user.isGettingAllUsers)
    const isDeletingUser = useSelector(state => state.user.isDeletingUser)
    const isRegistingDoctor = useSelector(state => state.user.isRegistingDoctor)
    const isSearchingUser = useSelector(state => state.user.isSearchingUser)
    const isGettingAllUserByRole = useSelector(state => state.user.isGettingAllUserByRole)
    
    
    const [page, setPage] = useState(1)
    // eslint-disable-next-line
    const [size, setSize] = useState(4)
    const [showModal, setShowModal] = useState(false)
    const [userData, setUserData] = useState(null)
    const [doctorData, setDoctorData] = useState(initialState);
    const [showCreateDoctorModal, setShowCreateDoctorModal] = useState(false);
    const [searchData, setSearchData] = useState(null)
    const [sortRole, setSortRole] = useState('All')

    useEffect(() => {
        let pagination = { page, size }
        dispatch(getAllUser(pagination))
        // eslint-disable-next-line
    }, [page])

    // this function is from react-paginate
    const handlePageClick = (event) => {
        setPage(event.selected + 1)
    }

    const handleToggleDeleteModal = () => {
        setShowModal(!showModal)
    }

    const handleDeleteBtn = (user) => {
        handleToggleDeleteModal()
        setUserData(user)
    }

    const handleConfirmDelete = async () => {
        const userId = userData.id
        if (userId) {
            const response = await dispatch(deleteUser(userId))
            if (response?.error?.message === "Rejected" && response?.payload) {
                toast.error(response.payload);
            }
            if (response?.payload?.message) {
                let pagination = { page, size }
                dispatch(getAllUser(pagination))
                toast.success(response.payload.message);
                handleToggleDeleteModal()
            }
        }
    }

    const handleDetailBtn = (user) => {
        const userId = user.id
        if (userId) {
            dispatch(getDetailUser(userId))
            localStorage.setItem("currentPath", "/detail/user")
            navigate("/detail/user");
        }
    }

    const handleToggleCreateModal = () => {
        setShowCreateDoctorModal(!showCreateDoctorModal)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctorData({
            ...doctorData,
            [name]: value
        });
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCreateDoctor = async () => {
        const requiredFields = ['fullName', 'email', 'gender', 'password'];

        for (let field of requiredFields) {
            if (!doctorData[field]) {
                toast.error(`Please enter ${field}`);
                return;
            }
        }

        if (!validateEmail(doctorData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        const response = await dispatch(registerDoctor(doctorData));
        if (response?.error?.message === "Rejected" && response?.payload) {
            toast.error(response.payload);
        }
        if (response?.payload?.message) {
            toast.success(response.payload.message);
            handleToggleCreateModal()
            let pagination = { page, size };
            dispatch(getAllUser(pagination));
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            handleSearchUser()
        }
    }

    const handleSearchUser = () => {
        let pagination = { page, size, searchData };

        if(searchData) {
            dispatch(searchUser( pagination))
        } else {
            let pagination = { page, size }
            dispatch(getAllUser(pagination))
        }
    }

    const handleSortRole = (e) => {
        const selectedRole = e.target.value;
        let newSortRole;
    
        if (selectedRole === "All") {
            newSortRole = '1';
        } else if (selectedRole === "Doctor") {
            newSortRole = '2';
        } else {
            newSortRole = '3';
        }
        
        setSortRole(selectedRole);
    
        let pagination = { page, size, roleId: newSortRole };
    
        if (selectedRole === "All") {
            let pagination = { page, size }
            dispatch(getAllUser(pagination));
        } else {
            dispatch(getAllUserByRole(pagination));
        }
    };

    return (
        <div className="user-mana-container">
            <h1 className="user-name-header">user management</h1>
            <div className="user-header">
                <div className="user-header-search">
                    <input 
                        className="search-input" 
                        type="text" 
                        onChange={(e)=>setSearchData(e.target.value)}
                        onKeyDown={(e)=>handleKeyPress(e)}
                        value={searchData}
                        placeholder="Enter search information" 
                    />
                    <img className="search-icon" src={searchIcon} alt="Search" />
                </div>
                <button
                    onClick={() => handleToggleCreateModal()}
                    className="btn btn-primary">
                    Create Doctor
                    <img src={addIcon} alt="Add" />
                </button>
            </div>
            <div className="user-mana-body">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>
                                Role
                                <select 
                                    onChange={handleSortRole}
                                    className="filter-role"
                                >
                                    <option value={sortRole}>Select</option>
                                    <option >All</option>
                                    <option >Doctor</option>
                                    <option >Patient</option>
                                </select>
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {(isGettingAllUsers || isDeletingUser || isRegistingDoctor || isSearchingUser || isGettingAllUserByRole)
                        ?
                        <tbody>
                            <tr>
                                <td colSpan={5}><LoadingSpinner /></td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            {userList && userList.length > 0
                                ?
                                (userList.map((user) => (
                                    <tr key={user?.id}>
                                        <td>{user?.id}</td>
                                        <td>{user?.fullName}</td>
                                        <td>{user?.email}</td>
                                        <td>{roleMap[user?.roleId] || "unknow"}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDetailBtn(user)}
                                                className="detail-icon">
                                                <img src={detailIcon} alt="detail" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBtn(user)}
                                                className="delete-icon">
                                                <img src={deleteIcon} alt="Delete" />
                                            </button>
                                        </td>
                                    </tr>
                                )))
                                :
                                (<tr>
                                    <td colSpan="5">No users found</td>
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
                body={`Are you sure to delete ${userData?.fullName}?`}
                handlePrimaryBtnClick={handleConfirmDelete}
                primaryBtnText="Delete"
            />

            <ModalComponent
                show={showCreateDoctorModal}
                size="lg"
                handleClose={handleToggleCreateModal}
                title="Create New Doctor"
                body={
                    <div className="create-doctor-form">
                        <label>Fullname:</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={doctorData.fullName}
                            onChange={handleInputChange}
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={doctorData.email}
                            onChange={handleInputChange}
                        />
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={doctorData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={doctorData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                }
                handlePrimaryBtnClick={handleCreateDoctor}
                primaryBtnText="Create"
            />

        </div>
    )
}

export default UserManagement