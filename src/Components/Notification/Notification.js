import React, { useEffect, useState } from 'react';
import expandChevron from '../../Images/expand-chevron.svg';
import collapseChevron from '../../Images/collapse-chevron.svg';
import './Notification.css';
const Notification = () => {
    const [expanded, setExpanded] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);
    
    useEffect(() => {
      const str = localStorage.getItem("appointmentData");
      const storedAppointmentData = JSON.parse(str);
      if (storedAppointmentData) {
        setAppointmentData(storedAppointmentData);
      }
    }, []);

const toggleExpanded = () => {
    setExpanded(!expanded);
};

  return (
    <>
        {appointmentData && (
            <div className={(expanded ? 'notification-container expanded' : 'notification-container')}>
                <button className="expand-btn" onClick={toggleExpanded}>
                {expanded ? <img src={collapseChevron} alt="Collapse" width="20px" height="20px" /> : <img src={expandChevron} alt="Expand" width="20px" height="20px" />}
                <h3>Appointment Details</h3>
                </button>
                {/* {expanded &&  */}
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
                {/* } */}
            </div>
        )}
    </>
  );
};

export default Notification;