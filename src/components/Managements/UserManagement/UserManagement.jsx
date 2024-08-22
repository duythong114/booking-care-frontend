import "./UserManagement.scss"
import searchIcon from "../../../assets/icons/search.svg"
import addIcon from "../../../assets/icons/Add.svg"
import detailIcon from "../../../assets/icons/detail.svg"
import deleteIcon from "../../../assets/icons/delete.svg"
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux"
import { getAllUser, deleteUser } from "../../../redux/slices/userSlice"
import { useEffect, useState } from "react"
import ModalComponent from "../../Modal/Modal"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"

const UserManagement = () => {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.user.userList)
    const totalPage = useSelector(state => state.user.totalPage)
    const isGettingAllUsers = useSelector(state => state.user.isGettingAllUsers)
    const isDeletingUser = useSelector(state => state.user.isDeletingUser)
    const [current, setCurrent] = useState(1)
    // eslint-disable-next-line
    const [pageSize, setPageSize] = useState(4)
    const [showModal, setShowModal] = useState(false)
    const [userData, setUserData] = useState(null)

    const roleMap = {
        1: 'admin',
        2: 'doctor',
        3: 'patient'
    };

    useEffect(() => {
        let pagination = { current, pageSize }
        dispatch(getAllUser(pagination))
    }, [dispatch, current, pageSize])

    // this function is from react-paginate
    const handlePageClick = (event) => {
        setCurrent(event.selected + 1)
    }

    const handleCloseModal = () => {
        setShowModal(!showModal)
    }

    const handleDeleteBtn = (user) => {
        setShowModal(!showModal)
        setUserData(user)
    }

    const handleConfirmDelete = async () => {
        const userId = userData.id
        // const userId = 100
        if (userId) {
            const response = await dispatch(deleteUser(userId))
            if (response?.error?.message === "Rejected" && response?.payload) {
                toast.error(response.payload);
            }
            if (response?.payload?.message) {
                let pagination = { current, pageSize }
                dispatch(getAllUser(pagination))
                toast.success(response.payload.message);
                setShowModal(!showModal)
            }
        }
    }

    return (
        <div className="user-mana-container">
            <h1 className="user-name-header">user management</h1>
            <div className="user-header">
                <div className="user-header-search">
                    <input className="search-input" type="text" placeholder="Enter search information" />
                    <img className="search-icon" src={searchIcon} alt="Search" />
                </div>
                <button className="btn btn-primary">
                    Create User
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
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {(isGettingAllUsers || isDeletingUser)
                        ?
                        <tbody>
                            <tr>
                                <td colSpan={5}><LoadingSpinner /></td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            {userList && userList.length > 0 ? (
                                userList.map((user) => (
                                    <tr key={user?.id}>
                                        <td>{user?.id}</td>
                                        <td>{user?.fullName}</td>
                                        <td>{user?.email}</td>
                                        <td>{roleMap[user?.roleId] || "unknow"}</td>
                                        <td>
                                            <button className="detail-icon">
                                                <img src={detailIcon} alt="detail" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBtn(user)}
                                                className="delete-icon">
                                                <img src={deleteIcon} alt="Delete" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No users found</td>
                                </tr>
                            )}
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
                body={`Are you sure to delete ${userData?.fullName}?`}
                handlePrimaryBtnClick={handleConfirmDelete}
                primaryBtnText="Delete"
            />
        </div>
    )
}

export default UserManagement