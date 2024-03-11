import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

const Notification = (doctorData, appointmentData) => {
    const [expanded, setExpanded] = useState(false);

  return (
    <div id="notification-container">
        <div className="appointment-card">
            <h3>Appointment Details</h3>
            {expanded && 
                <>
                    <p>
                        <strong>Doctor:</strong> {doctorData?.name}
                    </p>
                </>
            }
        </div>
    </div>
  );
};

export default Notification;