import "./Login.scss"
import backgroudImg from "../../../assets/images/side-image.jpg"
import eyeIcon from "../../../assets/icons/eye.svg"
import eyeoffIcon from "../../../assets/icons/eye-off.svg"
import { useState } from "react";

const Login = () => {
    const [showPassword, setshowPassword] = useState(false)

    return (
        <div className="login-container">
            <div className="login-infor">
                <div className="login-form">
                    <h1 className="login-form-name">Login</h1>
                    <span>Welcome back! Please login to your account</span>
                    <div className="login-form-email">
                        <label>Email:</label>
                        <input type="email" placeholder="Enter email" />
                    </div>
                    <div className="login-form-password">
                        <label>Password:</label>
                        <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" />
                        <img className="form-pass-icon" 
                        onClick={() => {setshowPassword(!showPassword)}}
                        src={showPassword ? `${eyeIcon}` : `${eyeoffIcon}`} alt="Eye-off" />
                    </div>
                    <div className="login-form-btn">
                        <button type="button" class="btn btn-primary">Login</button>
                        <button type="button" class="btn btn-outline-primary">SignUp</button>
                    </div>
                </div>
            </div>
            <div className="login-img">
                <img src={backgroudImg} alt="Background" />
            </div>
        </div>
    )
}

export default Login