import React, {useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import stayHealthyLogo from '../../Images/logoIcon.svg';

const Navbar = () => {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail]=useState("");
    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        localStorage.removeItem("appointmentData");
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
    
    useEffect(() => { 
        const storedEmail = sessionStorage.getItem("email");
        const storedUsername = sessionStorage.getItem('email');
        if (storedEmail) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
        }

        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedEmail.split('@')[0]);
        }
    }, []);


    return (
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
    )
}

export default Navbar;