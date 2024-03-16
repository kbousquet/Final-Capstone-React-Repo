import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './Components/Landing_Page/LandingPage';
import Signup from './Components/Sign_Up/Signup';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import Services from './Components/Services/Services';
import Notification from './Components/Notification/Notification';

function App() {
    // const [appointmentData, setAppointmentData] = useState(null);
    // const toggleAppointmentData = (data) => {
    //     setAppointmentData(data);
    //     if (data === null) {
    //         localStorage.removeItem("appointmentData");
    //     }
    // }

    // useEffect(() => {
    //     const str = localStorage.getItem("appointmentData");
    //     const storedAppointmentData = JSON.parse(str);

    //     if (storedAppointmentData) {
    //         setAppointmentData(storedAppointmentData);
    //     }
    // }, []);

    const [appointmentData, setAppointmentData] = useState([]);
    const toggleAppointmentData = (data, type) => {
        if (type === "add") {
            setAppointmentData([...appointmentData, data]);
            localStorage.setItem("appointmentData", appointmentData);
        } else if (type === "remove") {
            const updatedAppointments = appointmentData.filter((appointment) => appointment.id !== data.id);
            setAppointmentData([updatedAppointments]);
            localStorage.setItem("appointmentData", appointmentData);
        }
    }

    useEffect(() => {
        // const str = localStorage.getItem("appointmentData");
        // const storedAppointmentData = JSON.parse(str);

     
        const storedAppointmentData = localStorage.getItem("appointmentData");

        // setAppointmentData([{doctorName: "shelly", doctorSpeciality: "dentist", dateTime: "2am"}])
        // localStorage.setItem("appointmentData", storedAppointmentData);

        if (storedAppointmentData) {
            // localStorage.setItem("appointmentData", storedAppointmentData);
            setAppointmentData(storedAppointmentData);
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                <div id="main">
                    <Notification appointmentData={appointmentData}>
                        <Routes>
                            <Route path="/" element={<LandingPage/>}/>
                            <Route path="/home" element={<LandingPage/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/services/instant-consultation" element={<InstantConsultation />}/>
                            <Route path="/services/appointments" element={<BookingConsultation toggleAppointmentData={toggleAppointmentData} appointments={appointmentData} />}/>
                            <Route path="/services" element={<Services />}/>
                        </Routes>   
                    </Notification>  
                </div>   
            </BrowserRouter>
        </>
    );
}

export default App;
