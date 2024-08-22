import "./UserManagement.scss"
import searchIcon from "../../../assets/icons/search.svg"
import addIcon from "../../../assets/icons/Add.svg"
import editIcon from "../../../assets/icons/edit.svg"
import deleteIcon from "../../../assets/icons/delete.svg"
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux"
import { getAllUser } from "../../../redux/slices/userSlice"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"

const UserManagement = () => {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.user.userList)
    const totalPage = useSelector(state => state.user.totalPage)
    const isGettingAllUsers = useSelector(state => state.user.isGettingAllUsers)
    const [current, setCurrent] = useState(1)
    // eslint-disable-next-line
    const [pageSize, setPageSize] = useState(2)
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
                    {isGettingAllUsers
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
                                            <button className="edit-icon">
                                                <img src={editIcon} alt="Edit" />
                                            </button>
                                            <button className="delete-icon">
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
        </div>
    )
}

export default UserManagement