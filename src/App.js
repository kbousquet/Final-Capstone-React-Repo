import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage';
import Signup from './Components/Sign_Up/Signup';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import Notification from './Components/Notification/Notification';
import Services from './Components/Services/Services';

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <div id="main">
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/home" element={<LandingPage/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/instant-consultation" element={<InstantConsultation />}/>
                        <Route path="/appointments" element={<BookingConsultation />}/>
                        <Route path="/services" element={<Services />}/>
                    </Routes>
                    <Notification />
                </div>       
            </BrowserRouter>
        </>
    );
}

export default App;
