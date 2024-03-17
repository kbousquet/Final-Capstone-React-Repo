import React from 'react';
import { Link } from "react-router-dom";
import './Services.css';
import instantConsult from '../../Images/instant-consult.PNG';
import bookAppointment from '../../Images/book-appointment.PNG';
import healthTips from '../../Images/health-tips.PNG';

const Services = () => {
    
    return (
        <div id="services-wrapper">
            <h1>Our Services</h1>
            <div id="services-container">
                <Link to="/services/instant-consultation" style={{ textDecoration: 'none' }}>
                    <div className="services-card">
                        <img src={instantConsult} alt="services/instant-consultation"></img> 
                        <p>Instant Consultation</p>
                    </div>
                </Link>
                <Link to="/services/appointments" style={{ textDecoration: 'none' }}>
                    <div className="services-card">
                        <img src={bookAppointment} alt="book-appointment"></img> 
                        <p>Book an Appointment</p>
                    </div>
                </Link>
                <Link to="/health-tips" style={{ textDecoration: 'none' }}>
                    <div className="services-card">
                        <img src={healthTips} alt="health-tips"></img> 
                        <p>Health Tips and Guidance</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Services;