import "./MedicalHistory.scss"
import searchIcon from "../../assets/icons/search.svg"

const MedicalHistory = () => {
    return(
        <div className="medical-history-container">
            <h1 className="medical-history-header">Medical Record</h1>
            <div className="history-header">
                <div className="history-header-search">
                    <input className="search-input" type="text" placeholder="Enter search information"/>
                    <img className="search-icon" src={searchIcon} alt="Search" />
                </div>
            </div>

            <div className="medical-history-body">
                <input className="history-date" type="date" placeholder="dd/mm/yyyy" />
                <table>
                    <tr>
                        <th>No.</th>
                        <th>Docter</th>
                        <th>Date</th>
                        <th>Diagnosis</th>
                        <th>Traeatment</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Nguyen Van A</td>
                        <td>dd/mm/yyyy</td>
                        <td>Cold with cough and mild fever</td>
                        <td>Paracetamol 500mg, twice daily. Rest and drink plenty of fluids</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Nguyen Van B</td>
                        <td>dd/mm/yyyy</td>
                        <td>Cold with cough and mild fever</td>
                        <td>Paracetamol 500mg, twice daily. Rest and drink plenty of fluids</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Nguyen Van C</td>
                        <td>dd/mm/yyyy</td>
                        <td>Cold with cough and mild fever</td>
                        <td>Paracetamol 500mg, twice daily. Rest and drink plenty of fluids</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Nguyen Van D</td>
                        <td>dd/mm/yyyy</td>
                        <td>Cold with cough and mild fever</td>
                        <td>Paracetamol 500mg, twice daily. Rest and drink plenty of fluids</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default MedicalHistory