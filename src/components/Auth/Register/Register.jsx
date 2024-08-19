import "./Register.scss"
import backgroundImg from '../../../assets/images/side-image.jpg';
import eyeIcon from "../../../assets/icons/eye.svg"
import eyeoffIcon from "../../../assets/icons/eye-off.svg"
import { useState } from "react";

const Register = () => {
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)

    return (
        <div className="register-container">
            <div className="register-infor">
                <div className="register-form">
                    <h1 className="register-form-name">Create an account</h1>
                    <div className="form-infor">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter full name"/>
                    </div>
                    <div className="form-infor">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email"/>
                    </div>
                    <div className="form-infor">
                        <label>Gender</label>
                        <input type="text" placeholder="Enter full name"/>
                    </div>
                    <div className="form-infor">
                        <label>DoB</label>
                        <input type="date" placeholder="dd/mm/yyyy"/>
                    </div>
                    <div className="form-infor">
                        <label>Password</label>
                        <input type={showPassword ? 'text' : 'password'} placeholder="Enter full name"/>
                        <img className="form-infor-icon" 
                        onClick={() => {setshowPassword(!showPassword)}}
                        src={showPassword ? `${eyeIcon}` : `${eyeoffIcon}`} alt="Eye-off" />
                    </div>
                    <div className="form-infor">
                        <label>Confirm Password</label>
                        <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Enter full name"/>
                        <img className="form-infor-icon" 
                        onClick={() => {setshowConfirmPassword(!showConfirmPassword)}}
                        src={showConfirmPassword ? `${eyeIcon}` : `${eyeoffIcon}`} alt="Eye-off" />
                    </div>
                    <div className="resister-form-btn">
                        <button type="button" class="btn btn-primary">SignUp</button>
                    </div>
                </div>
            </div>
            <div className="register-img">
                <img src={backgroundImg} alt="BackGround" />
            </div>
        </div>
    )
}

export default Register