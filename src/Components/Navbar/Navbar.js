import React, {useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import stayHealthyLogo from '../../Images/logoIcon.svg';
import ProfileCard from '../ProfileCard/ProfileCard';
import downChevron from '../../Images/chevron-down.svg';
import upChevron from '../../Images/chevron-up.svg';

const Navbar = ({isLoggedIn, toggleIsLoggedIn}) => {
    const [username, setUsername] = useState("");
    
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

    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        if (showProfile === true && expanded === false) {
            setShowProfile(false);
        } else {
            setExpanded(!expanded);
        }
    };

    const [showProfile, setShowProfile] = useState(false);
    const toggleProfile = () => {
        setExpanded(false);
        setShowProfile(!showProfile);
    };

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
                            <button className="profile-btn" onClick={toggleExpanded}>
                                {expanded ? <img src={upChevron} alt="Close profile" width="30px" height="30px" /> : <img src={downChevron} alt="Open profile" width="30px" height="30px" />}
                                <p>Welcome, {username}</p>
                            </button>
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
            {expanded && 
                <div className={(expanded ? 'user-dropdown dropdown-expanded' : 'user-dropdown')}>
                    <p className="link" onClick={toggleProfile}>Your Profile</p>
                    <p className="link">
                        <Link to="/reports">Your Reports</Link>
                    </p>
                </div>}
            {isLoggedIn && <ProfileCard showProfile={showProfile} />}
        </>
    )
}

export default Navbar;