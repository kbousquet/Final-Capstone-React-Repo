import React, { useEffect, useState } from 'react';
import expandChevron from '../../Images/expand-chevron.svg';
import collapseChevron from '../../Images/collapse-chevron.svg';
import './Notification.css';
import Navbar from '../Navbar/Navbar';

const Notification = ({children, appointmentData}) => {
    const [expanded, setExpanded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const storedUsername = sessionStorage.getItem('email');
      
        if (storedUsername) {
            setIsLoggedIn(true);
        }
    }, []);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

  return (
    <>
        <Navbar />
        {children}
        {appointmentData && appointmentData.length > 0 && isLoggedIn && (
            <div className={(expanded ? 'notification-container expanded' : 'notification-container')}>
                <button className="expand-btn" onClick={toggleExpanded}>
                {expanded ? <img src={collapseChevron} alt="Collapse" width="20px" height="20px" /> : <img src={expandChevron} alt="Expand" width="20px" height="20px" />}
                <h3>Appointment Details</h3>
                </button>
                    <>
                        <p>
                            <strong>Doctor:</strong> {appointmentData[0]?.doctorName}
                        </p>
                        <p>
                            <strong>Speciality:</strong> {appointmentData[0]?.doctorSpeciality}
                        </p>
                        <p>
                            <strong>Date:</strong> {appointmentData[0]?.date}
                        </p>
                        <p>
                            <strong>Time:</strong> {appointmentData[0]?.time}
                        </p>
                    </>
            </div>
        )}
    </>
  );
};

export default Notification;