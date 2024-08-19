import "./Login.scss"
import backgroudImg from "../../../assets/images/side-image.jpg"

const Login = () => {
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
                        <input type="password" placeholder="Enter password" />
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