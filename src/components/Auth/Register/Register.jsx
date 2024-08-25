import "./Register.scss"
import backgroundImg from '../../../assets/images/side-image.jpg';
import eyeIcon from "../../../assets/icons/eye.svg"
import eyeoffIcon from "../../../assets/icons/eye-off.svg"
import { toast } from 'react-toastify';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerPatient } from "../../../redux/slices/userSlice"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"

const Register = () => {
    const initialUserData = {
        fullName: "",
        email: "",
        gender: "",
        dob: "",
        password: "",
        confirmPassword: ""
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [userData, setUserData] = useState(initialUserData)
    const isRegistingPatient = useSelector(state => state.user.isRegistingPatient)

    const handleComeBackBtn = () => {
        navigate(-1)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignup = async () => {
        const requiredFields = ['fullName', 'email', 'gender', 'dob', 'password', 'confirmPassword'];

        for (let field of requiredFields) {
            if (!userData[field]) {
                toast.error(`Please enter ${field}`);
                return;
            }
        }

        if (!validateEmail(userData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await dispatch(registerPatient(userData)).unwrap();
            if (response?.message) {
                setUserData(initialUserData)
                navigate("/login");
                toast.success(response.message);
            }
        } catch (error) {
            toast.error(error || "Failed to register");
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSignup()
        }
    }

    if (isRegistingPatient) {
        return <LoadingSpinner />
    }

    return (
        <div className="register-container">
            <div className="register-infor">
                <div className="register-form">
                    <h1 className="register-form-name">Create an account</h1>
                    <div className="form-infor">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter full name"
                            value={userData.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-infor">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-infor">
                        <label>Gender</label>
                        <select
                            name="gender"
                            value={userData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-infor">
                        <label>DoB</label>
                        <input
                            type="date"
                            name="dob"
                            placeholder="dd/mm/yyyy"
                            value={userData.dob}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-infor">
                        <label>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter password"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                        <img className="form-infor-icon"
                            onClick={() => { setShowPassword(!showPassword) }}
                            src={showPassword ? `${eyeIcon}` : `${eyeoffIcon}`} alt="Eye-off" />
                    </div>
                    <div className="form-infor">
                        <label>Confirm Password</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={userData.confirmPassword}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                        <img className="form-infor-icon"
                            onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}
                            src={showConfirmPassword ? `${eyeIcon}` : `${eyeoffIcon}`} alt="Eye-off" />
                    </div>
                    <div className="register-form-btn">
                        <button
                            onClick={() => handleSignup()}
                            className="btn btn-primary">SignUp</button>
                        <button
                            onClick={handleComeBackBtn}
                            className="btn btn-secondary">Come Back</button>
                    </div>
                </div>
            </div>
            <div className="register-img">
                <img src={backgroundImg} alt="BackGround" />
            </div>
        </div>
    )
}

export default Register;
