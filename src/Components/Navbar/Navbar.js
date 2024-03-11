import React, {useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import Notification from '../Notification/Notification';
import stayHealthyLogo from '../../Images/logoIcon.svg';

const Navbar = () => {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState({});
    const handleClick = () => setClick(!click);

    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        }
        setEmail('');
        window.location.reload();
    }
    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    }
    useEffect(() => { 
        const storedemail = sessionStorage.getItem("email");
        const storedUsername = sessionStorage.getItem('email');
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));
        
        if (storedemail) {
            setIsLoggedIn(true);
            setUsername(storedemail.split('@')[0]);
            }
        if (storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
        }

        if (storedDoctorData) {
        setDoctorData(storedDoctorData);
        }

        if (storedAppointmentData) {
        setAppointmentData(storedAppointmentData);
        }
    }, []);


    return (
        <div>
            <nav>
                <div className="nav__logo">
                <a href="/">
                    StayHealthy 
                    <img src={stayHealthyLogo} alt="Stay Healthy Logo" width="70" height="53" />
                </a>
                </div>
                <ul className="nav__links active">
                    <li className="link">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="link">
                        <Link to="/services">Services</Link>
                    </li>
                    <li className="link">
                        <Link to="/services/appointments">Appointments</Link>
                    </li>
                    <li className="link">
                        <Link to="/reviews">Reviews</Link>
                    </li>
                    <div className="nav__btns">
                    {isLoggedIn?(
                        <>  
                            <p>Welcome, {username}</p>
                            <li className="link">
                                <button className="nav__btn logout-btn" onClick={handleLogout}>
                                Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="link">
                                <Link to="/signup">
                                        <button className="nav__btn logout-btn">Sign Up</button>
                                </Link>
                            </li>
                            <li className="link">
                                <Link to="/login">
                                    <button className="nav__btn">Login</button>
                                </Link>
                            </li>
                        </>
                    )}
                    </div>
                </ul>
            </nav>
            
            {isLoggedIn && appointmentData && (
                <Notification doctorData={doctorData} appointmentData={appointmentData} />
            )} 
        </div>
    )
}

export default Navbar;