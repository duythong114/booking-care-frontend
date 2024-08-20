import "./DetailBooking.scss"

const DetailBooking = () => {
    return (
        <div className="detail-container">
            <h1 className="detail-name">detail booking</h1>

            <div className="detail-infor-table">
                <table>
                    <tbody>
                        <tr>
                            <td>Nguyen Van A</td>
                            <td>dd/mm/yyyy</td>
                            <td>Male</td>
                        </tr>
                        <tr>
                            <td>VanANguyen@gmail.com</td>
                            <td>0394328473</td>
                            <td>BinhTan, HoChiMinh</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="detail-infor-medical">
                <button type="button" className="btn btn-warning">Edit</button>

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
    )
}

export default DetailBooking