import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import { v4 as uuidv4 } from 'uuid';


const DoctorCard = ({ name, speciality, experience, ratings, toggleAppointmentData, appointments, profilePic }) => {
    const [showModal, setShowModal] = useState(false);
    const [bookedApp, setbookedApp] = useState(null);

    const handleBooking = () => {
        setShowModal(true);
    };

    const handleCancel = (appointmentId) => {
        // const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
        // setAppointments(updatedAppointments);
        // toggleAppointmentData(null);
        const appointment = appointments.find((appointment) => appointment.id == appointmentId);
        setAppointments(updatedAppointments);
        toggleAppointmentData(appointment, "remove");
    };

    const handleFormSubmit = (appointmentData) => {
        // const newAppointment = {
        // id: uuidv4(),
        // ...appointmentData,
        // };
        // const updatedAppointments = [...appointments, newAppointment];
        // setAppointments(updatedAppointments);
        // setShowModal(false);
        
        // localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
        // toggleAppointmentData(appointmentData);
        const newAppointment = {
            id: uuidv4(),
            ...appointmentData,
        };
        toggleAppointmentData(newAppointment, "add");
        setbookedApp(appointmentData);        
    };

    const checkAppointment = () =>  {
        // const str = localStorage.getItem("appointmentData");
        // const storedAppointmentData = JSON.parse(str);

        // if (storedAppointmentData && storedAppointmentData.doctorName === name && storedAppointmentData.doctorSpeciality === speciality) {
        //     const newAppointment = {
        //         id: uuidv4(),
        //         ...storedAppointmentData,
        //         };
        //         const updatedAppointments = [...appointments, newAppointment];
        //         setAppointments(updatedAppointments);
        // }

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
      </div>
      <div className="doctor-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn ${bookedApp ? 'cancel-appointment-btn' : ''}`}>
              {bookedApp ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
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

              {bookedApp ? (
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
          )}
        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCard;
