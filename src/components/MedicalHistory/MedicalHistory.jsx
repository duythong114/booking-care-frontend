import "./MedicalHistory.scss"
import { getMedicalHistory } from "../../redux/slices/bookingSlice"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

const MedicalHistory = () => {
    const totalHistoryPages = useSelector(state => state.booking.totalHistoryPages)
    const historyList = useSelector(state => state.booking.historyList)
    const isGettingMedicalHistory = useSelector(state => state.booking.isGettingMedicalHistory)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    // eslint-disable-next-line
    const [size, setSize] = useState(4)

    useEffect(() => {
        let pagination = { page, size }
        dispatch(getMedicalHistory(pagination))
        // eslint-disable-next-line
    }, [page])

    // this function is from react-paginate
    const handlePageClick = (event) => {
        setPage(event.selected + 1)
    }

    return (
        <div className="medical-history-container">
            <h1 className="medical-history-header">Medical History</h1>

            <div className="medical-history-body">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Docter</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Diagnosis</th>
                            <th>Traeatment</th>
                        </tr>
                    </thead>
                    {isGettingMedicalHistory
                        ?
                        <tbody>
                            <tr>
                                <td colSpan={7}><LoadingSpinner /></td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            {historyList && historyList.length > 0
                                ?
                                (historyList.map((history) => (
                                    <tr key={history?.id}>
                                        <td>{history?.id}</td>
                                        <td>{history?.doctorName}</td>
                                        <td>{history?.appointmentDate}</td>
                                        <td>{history?.appointmentTime}</td>
                                        <td>{history?.appointmentStatus}</td>
                                        <td>{history?.diagnosis}</td>
                                        <td>{history?.treatment}</td>
                                    </tr>
                                )))
                                :
                                (<tr>
                                    <td colSpan="7">No history found</td>
                                </tr>)}
                        </tbody>
                    }
                </table>

                {/* React-paginate */}
                {
                    totalHistoryPages && totalHistoryPages > 0 &&
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        pageCount={totalHistoryPages}
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

export default MedicalHistory