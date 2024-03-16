import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import { v4 as uuidv4 } from 'uuid';


const DoctorCard = ({ name, speciality, experience, ratings, toggleAppointmentData, appointments, isLoggedIn, profilePic }) => {
    const [showModal, setShowModal] = useState(false);
    const [bookedApp, setbookedApp] = useState(null);

    const handleBooking = () => {
        setShowModal(true);
    };

    const handleCancel = (appointmentId) => {
        const appointment = appointments.find((appointment) => appointment.id == appointmentId);
        toggleAppointmentData(appointment, "remove");
        setShowModal(false);
        setbookedApp(null);
    };

    const handleFormSubmit = (appointmentData) => {
        const newAppointment = {
            id: uuidv4(),
            ...appointmentData,
        };
        toggleAppointmentData(newAppointment, "add");
        setbookedApp(newAppointment);        
    };

    const handleModal = () => {
        setShowModal(!showModal);
    }

    const checkAppointment = () =>  {
        const foundApp = appointments.find((app) => app.doctorName === name);

        if (foundApp && foundApp.doctorSpeciality === speciality) {
            setbookedApp(foundApp);
        }
        
    }

    useEffect(() => {
        checkAppointment();
    }, []);

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
        <button className={`book-appointment-btn ${isLoggedIn && bookedApp ? 'cancel-appointment-btn' : ''}` } onClick={handleModal}>
              {isLoggedIn && bookedApp ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
        </button>
      </div>
        {showModal && (
            <div className="appointment-modal" onClick={handleModal}>
                <div className="appointment-card" onClick={(e) => e.stopPropagation()}>
                    <div>
                        <div className="doctor-card-profile-image-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                        </div>
                        <div className="doctor-card-details">
                            <div className="doctor-card-detail-name">{name}</div>
                            <div className="doctor-card-detail-speciality">{speciality}</div>
                            <div className="doctor-card-detail-experience">{experience} years experience</div>
                            <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                        </div>
                    </div>

                    {isLoggedIn && bookedApp ? (
                    <>
                        <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                        {/* {appointments.map((appointment) => ( */}
                        <div className="bookedInfo" key={bookedApp.id}>
                            <p>Name: {bookedApp.name}</p>
                            <p>Phone Number: {bookedApp.phoneNumber}</p>
                            <button className="cancel-appointment-btn" onClick={() => handleCancel(bookedApp.id)}>Cancel Appointment</button>
                        </div>
                        {/* ))} */}
                    </>
                    ) : (
                    <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default DoctorCard;
