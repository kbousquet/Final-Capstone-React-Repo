import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import LandingPage from './Landing_Page/LandingPage';
import Signup from './Sign_Up/Signup';
import Login from './Login/Login';

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/home" element={<LandingPage/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
                    
            </BrowserRouter>
        </>
    );
}

export default App;
