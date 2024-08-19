import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { registerNewUser } from "../../../redux/slices/userSlice"
import sideImage from '../../../assets/images/side-image.jpg';
import "./Register.scss"

const Register = () => {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const userData = {
    //         fullname: "Duy Thong",
    //         email: "duythong2@gmail.com",
    //         phone: "12345678",
    //         gender: "Male",
    //         dob: "1990-01-01",
    //         password: "yourpassword"
    //     }

    //     dispatch(registerNewUser(userData))
    // }, [dispatch])

    return (
        <div className="register-container">
            <div className="left-section">
                <div className="form-container">
                    <h2>CREATE AN ACCOUNT</h2>
                    <form>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="Enter full name" />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter email" />
                        </div>
                        <div className="input-group">
                            <label>Phone</label>
                            <input type="tel" placeholder="Enter phone" />
                        </div>
                        <div className="input-group">
                            <label>Gender</label>
                            <div className="gender-options">
                                <label>
                                    <input type="radio" name="gender" value="male" />
                                    Male
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="female" />
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>DoB</label>
                            <input type="date" placeholder="dd/mm/yy" />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" placeholder="Enter password" />
                        </div>
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Enter password" />
                        </div>
                        <button type="submit" className="signup-button">Sign Up</button>
                    </form>
                </div>
            </div>
            <div className="right-section">
                <img src={sideImage} alt="side-image" />
            </div>
        </div>
    )
}

export default Register