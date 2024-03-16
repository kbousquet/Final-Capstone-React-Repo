import React, {useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import stayHealthyLogo from '../../Images/logoIcon.svg';
import Signup from '../Sign_Up/Signup';
import Login from '../Login/Login';

const Navbar = ({isLoggedIn, toggleIsLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        toggleIsLoggedIn(false);
        setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        }
        // callback(null);
        window.location.reload();
    }

    const toggleSignup = () => {
        setShowLogin(false);
        setShowSignup(!showSignup);
    }

    const toggleLogin = () => {
        setShowSignup(false);
        setShowLogin(!showLogin);
    }
    
    useEffect(() => { 
        const storedEmail = sessionStorage.getItem("email");
        const storedUsername = sessionStorage.getItem('email');

        if (storedEmail) {
            toggleIsLoggedIn(true);
        }

        if (storedUsername) {
            toggleIsLoggedIn(true);
            setUsername(storedEmail.split('@')[0]);
        }
    }, []);


    return (
        <>
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
                                <button className="nav__btn logout-btn" onClick={toggleSignup}>Sign Up</button>
                            </li>
                            <li className="link">
                                <button className="nav__btn" onClick={toggleLogin}>Login</button>
                            </li>
                        </>
                    )}
                    </div>
                </ul>
            </nav>
            {showSignup && <Signup toggleSignup={toggleSignup} toggleLogin={toggleLogin} />}
            {showLogin && <Login toggleLogin={toggleLogin} toggleSignup={toggleSignup} />}
        </>
    )
}

export default Navbar;