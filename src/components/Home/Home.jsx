import "./Home.scss"
import addIcon from "../../assets/icons/Add.svg"
import Bottles from "../../assets/images/blmedicin.jpg"
import Blender from "../../assets/images/heath.jpg"
import Pills from "../../assets/images/medicin.jpg"
import BlisterPack from "../../assets/images/medicins.jpg"
import Microscope from "../../assets/images/research.jpg"

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-body-header">
                <div className="body-header-name">
                    <button className="btn btn-primary">
                        Booking
                        <img src={addIcon} alt="Add" />
                    </button>
                </div>
            </div>

            <div className="home-body-infor">
                <div className="body-panel">
                    <p className="body-panel-text">
                        MeriCal is a <strong>Premier Private Label</strong> and <strong>Contract Manufacturer</strong> in the United States.
                    </p>
                </div>
                <div className="panel-item">
                    <img src={Bottles} alt="Bottles" />
                    <img src={Blender} alt="Blender" />
                    <img src={Pills} alt="Pills" />
                    <img src={BlisterPack} alt="BlisterPack" />
                    <img src={Microscope} alt="Microscope" />
                </div>
            </div>
        </div>
    )
}

export default Home