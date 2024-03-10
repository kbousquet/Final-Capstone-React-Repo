import React from 'react';
import { Link } from "react-router-dom";
import './Services.css';
import instantConsult from '../../Images/instant-consult.PNG';
import bookAppointment from '../../Images/book-appointment.PNG';
import healthTips from '../../Images/health-tips.PNG';

const Services = () => {
    
    return (
        <div id="services-wrapper">
            <div className="services-card">
                <Link to="/instant-consultation" style={{ textDecoration: 'none' }}>
                    <img src={instantConsult} alt="instant-consultation"></img> 
                </Link>
                <p>Instant Consultation</p>
            </div>
            <Link to="/appointments" style={{ textDecoration: 'none' }}>
                <div className="services-card">
                        <img src={bookAppointment} alt="book-appointment"></img> 
                    <p>Book an Appointment</p>
                </div>
            </Link>
            <div className="services-card">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src={healthTips} alt="health-tips"></img> 
                </Link>
                <p>Health Tips and Guidance</p>
            </div>
        </div>
    )
}

export default Services;