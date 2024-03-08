import React, {useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const[email,setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
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
        // window.location.reload();
    }
    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    }
    useEffect(() => { 
    const storedemail = sessionStorage.getItem("email");

    if (storedemail) {
        setIsLoggedIn(true);
        setUsername(storedemail.split('@')[0]);
        }
    }, []);


    return (
        <nav>
            <div className="nav__logo">
            <a href="/">
            StayHealthy 
            <svg width="70" height="53" viewBox="0 0 70 53" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect width="70" height="53" fill="url(#pattern0)"/>
                <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_3_178" transform="matrix(0.0084127 0 0 0.0111111 0.121429 0)"/>
                    </pattern>
                    <image id="image0_3_178" width="90" height="90" xlinkHref="data:image/png;base64,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"/>
                </defs>
            </svg></a>
            </div>
            <ul className="nav__links active">
                <li className="link">
                    <Link to="/home">Home</Link>
                </li>
                <li className="link">
                    <Link to="/search/doctors">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/instant-consultation">Instant Consultation</Link>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
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