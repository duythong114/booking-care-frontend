import "./Login.scss";
import backgroudImg from "../../../assets/images/side-image.jpg";
import eyeIcon from "../../../assets/icons/eye.svg";
import eyeoffIcon from "../../../assets/icons/eye-off.svg";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginUser, getUserInfo } from "../../../redux/slices/userSlice";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogging = useSelector(state => state.user.isLogging);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    // Prevent user access login page when logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [navigate, isAuthenticated])

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        const userData = { email, password };
        const response = await dispatch(loginUser(userData));

        if (response?.error?.message === "Rejected" && response?.payload) {
            toast.error(response.payload);
        }
        if (response?.payload?.message) {
            setEmail("")
            setPassword("")
            dispatch(getUserInfo())
            navigate("/")
            toast.success(response.payload.message);
        }
    };

    const handleSignUpBtn = () => {
        navigate('/register');
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    if (isLogging) {
        return <LoadingSpinner />
    }

    return (
        <div className="login-container">
            <div className="login-infor">
                <div className="login-form">
                    <h1 className="login-form-name">Login</h1>
                    <span>Welcome back! Please login to your account</span>
                    <div className="login-form-email">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="login-form-password">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                        <img
                            className="form-pass-icon"
                            src={showPassword ? eyeIcon : eyeoffIcon}
                            alt={showPassword ? 'Hide password' : 'Show password'}
                            onClick={() => setShowPassword(prev => !prev)}
                        />
                    </div>
                    <div className="login-form-btn">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => handleSignUpBtn()}
                        >
                            SignUp
                        </button>
                    </div>
                </div>
            </div>
            <div className="login-img">
                <img src={backgroudImg} alt="Background" />
            </div>
        </div>
    );
};

export default Login;
