import "./Home.scss"
import addIcon from "../../assets/icons/Add.svg"
import { useSelector } from "react-redux"

const Home = () => {
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <div className="home-container">
            <div className="home-body-header">
                <div className="body-header-name">
                    <h1 className="home-body-name">personal information</h1>
                    <button className="btn btn-primary">
                        Booking
                        <img src={addIcon} alt="Add" />
                    </button>
                </div>

                <div className="body-header-table">
                    <table>
                        <tbody>
                            <tr>
                                <td>{userInfo?.fullName}</td>
                                <td>{userInfo?.dob}</td>
                                <td>{userInfo?.gender}</td>
                            </tr>
                            <tr>
                                <td>{userInfo?.email}</td>
                                <td>{userInfo?.phone}</td>
                                <td>{userInfo?.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="home-body-infor">
                <h1 className="body-infor-name">medical record</h1>
                
                <div className="body-infor-medical">
                    <div className="infor-medical">
                        <span><strong>Record ID:</strong>001</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Doctor:</strong>Nguyen Van A</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Date:</strong>dd/mm/yyyy</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Status:</strong>Pending</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Diagnosis:</strong>Cold with cough and mild fever</span>
                    </div>
                    <div className="infor-medical">
                        <span><strong>Treatment:</strong>Paracetamol 500mg, twice daily. Rest and drink plenty of fluids</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home