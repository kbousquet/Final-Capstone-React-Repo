import React, { useEffect, useState } from 'react';
import expandChevron from '../../Images/expand-chevron.svg';
import collapseChevron from '../../Images/collapse-chevron.svg';
import './Notification.css';
import Navbar from '../Navbar/Navbar';

const Notification = ({children}) => {
    const [expanded, setExpanded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);
    
    useEffect(() => {
        const storedUsername = sessionStorage.getItem('email');
        const str = localStorage.getItem("appointmentData");
        const storedAppointmentData = JSON.parse(str);

        if (storedAppointmentData) {
            setAppointmentData(storedAppointmentData);
        }

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
        {appointmentData && isLoggedIn && (
            <div className={(expanded ? 'notification-container expanded' : 'notification-container')}>
                <button className="expand-btn" onClick={toggleExpanded}>
                {expanded ? <img src={collapseChevron} alt="Collapse" width="20px" height="20px" /> : <img src={expandChevron} alt="Expand" width="20px" height="20px" />}
                <h3>Appointment Details</h3>
                </button>
                    <>
                        <p>
                            <strong>Doctor:</strong> {appointmentData?.doctorName}
                        </p>
                        <p>
                            <strong>Speciality:</strong> {appointmentData?.doctorSpeciality}
                        </p>
                        <p>
                            <strong>Date & Time:</strong> {appointmentData?.dateTime}
                        </p>
                    </>
            </div>
        )}
    </>
  );
};

export default Notification;